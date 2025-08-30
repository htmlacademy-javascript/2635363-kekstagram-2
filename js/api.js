import { SERVER_DATA_URL, SERVER_URL } from './data/const.js';
export async function getData() {
  const response = await fetch(SERVER_DATA_URL);
  if (!response.ok) {
    throw new Error(`Ошибка загрузки данных: ${response.status}`);
  }
  return await response.json();
}

export async function sendData(data) {
  const response = await fetch(SERVER_URL, {
    method: 'POST',
    body: data,
  });
  if (!response.ok) {
    throw new Error(`Ошибка отправки данных: ${response.status}`);
  }
  return await response.json();
}
