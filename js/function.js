// Проверка длины строки
const checkStringLength = (string, maxLength) => string.length <= maxLength;

checkStringLength('проверяемая строка', 20); // true
checkStringLength('проверяемая строка', 18); // true
checkStringLength('проверяемая строка', 10); // false


// Проверка на палиндром
const isPalindrome = (string) => {
  const normalizedString = string.replaceAll(' ', '').toLowerCase();

  let reversedString = '';
  for (let i = normalizedString.length - 1; i >= 0; i--) {
    reversedString += normalizedString[i];
  }

  return normalizedString === reversedString;
};

isPalindrome('топот'); // true
isPalindrome('ДовОд'); // true
isPalindrome('Кекс'); // false
isPalindrome('Лёша на полке клопа нашёл '); // true


// Извлечение цифр из строки
const extractNumber = (value) => {
  const string = String(value);

  let digits = '';
  for (let i = 0; i < string.length; i++) {
    const char = string[i];
    if (char >= '0' && char <= '9') {
      digits += char;
    }
  }

  return parseInt(digits, 10);
};

extractNumber('2023 год'); // 2023
extractNumber('ECMAScript 2022'); // 2022
extractNumber('1 кефир, 0.5 батона'); // 105
extractNumber('агент 007'); // 7
extractNumber('а я томат'); // NaN
extractNumber(2023); // 2023
extractNumber(-1); // 1
extractNumber(1.5); // 15
