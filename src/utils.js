import format from 'date-fns/format';
import isBefore from 'date-fns/is_before';
import startOfDay from 'date-fns/start_of_day';
import localeRu from 'date-fns/locale/ru';
import dateFnsV2 from '../date-fns-v2';

export const isSelectable = (date, minDate, maxDate) => {
  if (
    (minDate && isBefore(date, minDate)) ||
    (maxDate && isBefore(maxDate, date))
  ) {
    return false;
  }

  return true;
};

export const getToday = (minDate, maxDate) => {
  const today = new Date();

  return {
    date: startOfDay(today),
    selectable: isSelectable(today, minDate, maxDate),
    selected: false,
    today: true,
  };
};

export const formatDate = (date, dateFormat) => {
  if (!date) return undefined;

  // форматировать и подкорректировать результат
  let result = format(startOfDay(date), dateFormat, { locale: localeRu });
  if (result.endsWith('.')) result = result.slice(0, -1); // убираем точку в конце месяца, например 'авг.'
  result = result.charAt(0).toUpperCase() + result.slice(1); // делаем первую букву заглавной, например 'пт, 15'

  // если сокращенный месяц в конце, обрезаем с 4х до 3х букв
  if (dateFormat.endsWith(' MMM')) {
    if (result.endsWith('март')) result = result.slice(0, -1);
    else if (result.endsWith('июнь')) result = result.slice(0, -1);
    else if (result.endsWith('июль')) result = result.slice(0, -1);
  }

  return result;
};

export const omit = (keysToOmit, obj) => {
  const newObj = { ...obj };

  keysToOmit.forEach(key => delete newObj[key]);

  return newObj;
};

export const pick = (keysToPick, obj) => {
  const newObj = {};

  keysToPick.forEach(key => {
    newObj[key] = obj[key];
  });

  return newObj;
};

export const moveElementsByN = (n, arr) => arr.slice(n).concat(arr.slice(0, n));

export const formatSelectedDate = (selectedDate, dateFormat) => {
  if (!selectedDate) {
    return '';
  }

  return Array.isArray(selectedDate)
    ? selectedDate.map(date => formatDate(date, dateFormat)).join(' - ')
    : formatDate(selectedDate, dateFormat);
};

export const parseFormatString = formatString =>
  formatString.replace(/[D, Y]/gi, a => a.toLowerCase());

export const parseOnBlur = (typedValue, formatString, isRangeInput) => {
  const parsedFormatString = parseFormatString(formatString);

  if (isRangeInput) {
    const rangeValues = typedValue.split(' - ');

    return rangeValues
      .map(value => dateFnsV2.parse(value, parsedFormatString, new Date()))
      .sort((a, b) => (a > b ? 1 : -1));
  }

  return dateFnsV2.parse(typedValue, parsedFormatString, new Date());
};

export const onlyNumbers = (value = '') => value.replace(/[^\d]/g, '');
