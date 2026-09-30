const { escapeXml } = require('./xml');

function secretTextXml({ id, secret, description }) {
  return `<org.jenkinsci.plugins.plaincredentials.impl.StringCredentialsImpl>
  <scope>GLOBAL</scope>
  <id>${escapeXml(id)}</id>
  <description>${escapeXml(description)}</description>
  <secret>${escapeXml(secret)}</secret>
</org.jenkinsci.plugins.plaincredentials.impl.StringCredentialsImpl>`;
}

module.exports = { secretTextXml };
