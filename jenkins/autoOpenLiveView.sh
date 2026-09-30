#!/bin/bash
# Run once on the Jenkins Mac host (jenkin-m1). Keeps watching for headed builds
# and opens noVNC in the default browser automatically (no manual URL / Connect).
set -euo pipefail

CONTAINER="${JENKINS_CONTAINER:-jenkins}"
HOST_PORT="${LIVE_VIEW_PORT:-6080}"
FLAG="/var/jenkins_home/live-view-open.request"
URL="http://127.0.0.1:${HOST_PORT}/vnc.html?autoconnect=true&resize=scale"

if ! command -v docker >/dev/null 2>&1; then
  echo "docker not found. Run this on the Jenkins machine."
  exit 1
fi

echo "Watching for headed builds. Will open: ${URL}"
echo "Leave this terminal open (or run via launchd / nohup)."

while true; do
  if docker exec "$CONTAINER" test -f "$FLAG" 2>/dev/null; then
    docker exec "$CONTAINER" rm -f "$FLAG" >/dev/null 2>&1 || true
    if command -v open >/dev/null 2>&1; then
      open "$URL"
    elif command -v xdg-open >/dev/null 2>&1; then
      xdg-open "$URL" >/dev/null 2>&1 || true
    else
      echo "Open manually: $URL"
    fi
    echo "$(date '+%H:%M:%S') opened live view"
  fi
  sleep 2
done
