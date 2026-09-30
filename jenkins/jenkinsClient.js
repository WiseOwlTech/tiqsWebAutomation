const CREDENTIAL_STORE = 'credentials/store/system/domain/_';

class JenkinsClient {
  constructor({ url, user, token }) {
    this.baseUrl = url.replace(/\/+$/, '');
    this.auth = `Basic ${Buffer.from(`${user}:${token}`).toString('base64')}`;
    this.crumb = null;
  }

  async request(path, { method = 'GET', body, contentType } = {}) {
    const headers = { Authorization: this.auth };
    if (contentType) {
      headers['Content-Type'] = contentType;
    }
    if (method !== 'GET') {
      Object.assign(headers, await this.crumbHeader());
    }
    return fetch(`${this.baseUrl}/${path}`, { method, headers, body });
  }

  async crumbHeader() {
    if (this.crumb === null) {
      const response = await fetch(`${this.baseUrl}/crumbIssuer/api/json`, {
        headers: { Authorization: this.auth },
      });
      this.crumb = response.ok ? await response.json() : {};
    }
    return this.crumb.crumbRequestField ? { [this.crumb.crumbRequestField]: this.crumb.crumb } : {};
  }

  async exists(path) {
    const response = await this.request(`${path}/api/json`);
    if (response.status === 404) {
      return false;
    }
    await this.ensureOk(response, `GET ${path}`);
    return true;
  }

  async postXml(path, xml, action) {
    const response = await this.request(path, {
      method: 'POST',
      body: xml,
      contentType: 'application/xml; charset=utf-8',
    });
    await this.ensureOk(response, action);
  }

  async upsertJob(name, xml) {
    const jobPath = `job/${encodeURIComponent(name)}`;
    if (await this.exists(jobPath)) {
      await this.postXml(`${jobPath}/config.xml`, xml, `update job ${name}`);
      return 'updated';
    }
    await this.postXml(`createItem?name=${encodeURIComponent(name)}`, xml, `create job ${name}`);
    return 'created';
  }

  async upsertCredential(id, xml) {
    const credentialPath = `${CREDENTIAL_STORE}/credential/${encodeURIComponent(id)}`;
    if (await this.exists(credentialPath)) {
      await this.postXml(`${credentialPath}/config.xml`, xml, `update credential ${id}`);
      return 'updated';
    }
    await this.postXml(`${CREDENTIAL_STORE}/createCredentials`, xml, `create credential ${id}`);
    return 'created';
  }

  async ensureOk(response, action) {
    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Jenkins could not ${action}: HTTP ${response.status} ${text.slice(0, 300)}`);
    }
  }
}

module.exports = { JenkinsClient };
