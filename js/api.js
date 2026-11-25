const BASE_URL = 'https://29.javascript.htmlacademy.pro/kekstagram';

const request = async (path, options) => {
  const response = await fetch(`${BASE_URL}${path}`, options);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return response;
};

const getData = async () => {
  const response = await request('/data');
  return response.json();
};

const sendData = (body) => request('', { method: 'POST', body });

export { getData, sendData };
