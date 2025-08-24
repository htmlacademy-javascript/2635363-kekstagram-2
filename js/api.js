import { SERVER_DATA_URL, SERVER_URL } from './data/const.js';

export async function getData() {
  try {
    const response = await fetch(SERVER_DATA_URL);
    if (!response.ok) {
      throw new Error(`Ошибка загрузки данных: ${response.status}`);
    }
    return await response.json();

  } catch (error) {
    throw error;
  }
};

export async function sendData(data) {
  try {
    const response = await fetch(SERVER_URL, {
      method: 'POST',
      body: data,
    });
    if (!response.ok) {
      throw new Error(`Ошибка отправки данных: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};
