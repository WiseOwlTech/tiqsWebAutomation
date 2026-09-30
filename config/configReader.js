const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const FILE = path.join(__dirname, 'config.properties');

function load(filePath) {
  const properties = {};
  const text = fs.readFileSync(filePath, 'utf8');
  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) {
      continue;
    }
    const separator = line.indexOf('=');
    if (separator === -1) {
      continue;
    }
    const key = line.slice(0, separator).trim();
    properties[key] = line.slice(separator + 1).trim();
  }
  return properties;
}

const properties = load(FILE);

function required(key) {
  const value = properties[key];
  if (!value) {
    throw new Error(`Missing config.properties key: ${key}`);
  }
  return value;
}

function secret(envKey) {
  const value = process.env[envKey];
  if (!value || !value.trim()) {
    throw new Error(`Missing ${envKey} in .env`);
  }
  return value.trim();
}

function number(key, fallback) {
  const value = properties[key];
  return value ? Number(value) : fallback;
}

function bool(key, fallback) {
  const value = properties[key];
  if (!value) {
    return fallback;
  }
  return value === 'true';
}

module.exports = {
  url: () => required('base.url'),
  mobile: () => secret('TIQS_MOBILE'),
  otp: () => secret('TIQS_OTP'),
  mpin: () => secret('TIQS_PIN'),
  mobileShort: () => required('login.mobile.short'),
  mobileTooLong: () => required('login.mobile.too.long'),
  mobileInvalidPrefix: () => required('login.mobile.invalid.prefix'),
  mobileLetters: () => required('login.mobile.letters'),
  mobileSymbols: () => required('login.mobile.symbols'),
  otpInvalid: () => required('login.otp.invalid'),
  otpShort: () => required('login.otp.short'),
  otpLetters: () => required('login.otp.letters'),
  mpinInvalid: () => required('login.mpin.invalid'),
  mpinShort: () => required('login.mpin.short'),
  mpinLetters: () => required('login.mpin.letters'),
  symbol: () => properties['testdata.symbol.sample'] || 'RELIANCE',
  destructiveAllowed: () => bool('allow.destructive.tests', false),
  number,
  bool,
};
