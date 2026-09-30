const fs = require('fs');
const path = require('path');

const logFile = path.join(process.cwd(), 'logs', 'framework.log');

function write(level, name, message) {
  const stamp = new Date().toISOString().slice(11, 23);
  const line = `${stamp} [${level}] ${name} - ${message}`;
  fs.mkdirSync(path.dirname(logFile), { recursive: true });
  fs.appendFileSync(logFile, `${line}\n`);
  console.log(line);
}

function logger(name) {
  return {
    info(message) {
      write('INFO', name, message);
    },
  };
}

module.exports = { logger };
