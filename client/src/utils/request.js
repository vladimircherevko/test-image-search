export const request = async (url, method = 'GET', body = null, token) => {
  try {
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    if (body) {
      body = JSON.stringify(body);
    }
    const resp = await fetch(url, { body, headers, method });
    if (!resp.ok) {
      const msg = resp.status + ' Failed request to the server';
      const err = await resp.json().then(data => new Error(data.message || msg)).catch(() => new Error(msg));
      err.status = resp.status;
      throw err;
    }
    if (resp.status === 204) {
      return;
    }
    return resp.json();
  } catch (e) {
    throw e;
  }
};
