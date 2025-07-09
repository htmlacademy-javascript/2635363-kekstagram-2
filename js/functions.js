function isStringValid(string, length) {
  return string.length <= length;
}
isStringValid('test', 4);

function isPalindrome(string) {
  // приводит содержимое к строке и нижнему регистру
  const normalized = string.toString().toLowerCase();
  // удаляет все ненужные символы
  const clean = normalized.replace(/[^a-z0-9а-яё]/g, '');
  if (clean.length === 0) {
    return 'В строке нет букв или цифр';
  }

  return clean === clean.split('').reverse().join('');
}
isPalindrome('Лёша на полке клопа нашёл ');

function getNumbers(string) {
  // приводит содержимое к строке
  const toNumber = string.toString().replace(/[^0-9]/g, '');
  // проверяет наличие цифр
  if (toNumber.length === 0) {
    return 'В строке нет цифр';
  }
  return +toNumber;
}
getNumbers('1321fds');
