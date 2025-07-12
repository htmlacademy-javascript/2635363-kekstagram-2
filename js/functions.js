const someText = 'Пример строки';
const palindromeText = '123А роза упала на лапу Азора321';

function isStringValid(text, maxLength) {
  return text.length <= maxLength;
}

isStringValid(someText, 20);

function isPalindrome(rawText) {
  // приводит содержимое к строке и нижнему регистру
  const normalized = rawText.toString().toLowerCase();
  // удаляет все ненужные символы
  const clean = normalized.replace(/[^a-z0-9а-яё]/g, '');
  if (clean.length === 0) {
    return 'В строке нет букв или цифр';
  }

  return clean === clean.split('').reverse().join('');
}
isPalindrome(palindromeText);

function getNumbers(rawValue) {
  const toNumber = rawValue.toString().replace(/[^0-9]/g, '');
  if (toNumber.length === 0) {
    return NaN;
  }
  return Number(toNumber);
}

getNumbers(palindromeText);

