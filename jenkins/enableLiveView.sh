#!/bin/bash
# Run this on the Jenkins machine (the Docker host), not inside the container.
# It installs a virtual screen in the existing Jenkins container and publishes
# the viewer on port 6080 without recreating Jenkins.
set -euo pipefail

CONTAINER="${JENKINS_CONTAINER:-jenkins}"
HOST_PORT="${LIVE_VIEW_PORT:-6080}"

if ! docker inspect "$CONTAINER" >/dev/null 2>&1; then
  echo "Container '$CONTAINER' was not found. Set JENKINS_CONTAINER if the name differs."
  exit 1
fi

docker exec -u root "$CONTAINER" bash -lc '
  export DEBIAN_FRONTEND=noninteractive
  apt-get update
  apt-get install -y xvfb x11vnc novnc websockify x11-utils
  mkdir -p /tmp/.X11-unix
  chmod 1777 /tmp/.X11-unix
'

docker exec -d -u jenkins "$CONTAINER" bash -lc '
  export DISPLAY=:99
  if ! xdpyinfo -display :99 >/dev/null 2>&1; then
    mkdir -p /tmp/.X11-unix
    Xvfb :99 -screen 0 1440x900x24 -ac +extension GLX +render -noreset
  fi
'

sleep 1

docker exec -d -u jenkins "$CONTAINER" bash -lc '
  export DISPLAY=:99
  if ! bash -c "echo >/dev/tcp/127.0.0.1/5900" >/dev/null 2>&1; then
    x11vnc -display :99 -nopw -forever -shared -rfbport 5900
  fi
'

docker exec -d -u jenkins "$CONTAINER" bash -lc '
  if ! bash -c "echo >/dev/tcp/127.0.0.1/6080" >/dev/null 2>&1; then
    websockify --web=/usr/share/novnc 6080 localhost:5900
  fi
'

IP="$(docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' "$CONTAINER")"
if [ -z "$IP" ]; then
  echo "Could not read the IP address of container $CONTAINER"
  exit 1
fi

docker rm -f jenkins-live-view >/dev/null 2>&1 || true
docker run -d --name jenkins-live-view --restart unless-stopped \
  -p "${HOST_PORT}:6080" \
  alpine:3.20 \
  sh -c "apk add --no-cache socat && exec socat TCP-LISTEN:6080,fork,reuseaddr TCP:${IP}:6080"

echo "Live view is on http://192.168.4.30:${HOST_PORT}/vnc.html"
echo "Open that page before the Jenkins build and click Connect."
echo "If the Jenkins container is recreated, run this script again."
