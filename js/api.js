import { SERVER_DATA_URL, SERVER_URL } from './data/const.js';
//

async function testServerData() {
  try {
    const pictures = await getData();
    console.log('Данные с сервера:', pictures);

    // Если есть комментарии, посмотрим имена
    pictures.forEach((pic, index) => {
      console.log(`Фото ${index}:`);
      if (pic.comments) {
        pic.comments.forEach((comment, cIndex) => {
          console.log(`  Комментарий ${cIndex}:`, comment.name);
        });
      } else {
        console.log('  Комментариев нет');
      }
    });
  } catch (err) {
    console.error('Ошибка при получении данных:', err);
  }
}

testServerData();

//
export async function getData() {
  const response = await fetch(SERVER_DATA_URL);
  if (!response.ok) {
    throw new Error(`Ошибка загрузки данных: ${response.status}`);
  }
  return await response.json();
};

export async function sendData(data) {
  const response = await fetch(SERVER_URL, {
    method: 'POST',
    body: data,
  });
  if (!response.ok) {
    throw new Error(`Ошибка отправки данных: ${response.status}`);
  }
  return await response.json();
};
