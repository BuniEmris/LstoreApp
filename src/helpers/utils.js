import {min} from 'moment';

export const getDate = (d, from, format) => {
  const date = d ? d : new Date();
  var days = [' ВС ', ' ПН ', ' ВТ ', ' СР ', ' ЧТ ', ' ПТ ', ' СБ '];
  var day = days[date.getDate()];
  const year = date.getFullYear();
  const month = date.getMonth() + 1 - (from ? 1 : 0);
  switch (format) {
    case 'day':
      day = date.getDay();
      return day;
    case 'month':
      return day;
    case 'year':
      return day;

    default:
      break;
  }
  return `${year}${month > 9 ? month : '0' + month}${
    day > 9 ? day : '0' + day
  }`;
};

export const getToday = day => {
  let days = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
  return days[day];
};
export const getMonthName = (date = new Date(), key) => {
  let month = [
    'Янв',
    'Фев',
    'Мар',
    'Апр',
    'Май',
    'Июн',
    'Июл',
    'Авг',
    'Сен',
    'Окт',
    'Ноя',
    'Дек',
  ];
  switch (key) {
    case 'month year':
      return `${month[date.getMonth()]} ${date.getFullYear()}`;

    case 'year':
      return date.getFullYear();
  }
};

export const createListDate = (d, isPrevDate = false) => {
  const date = isPrevDate ? new Date(d.getFullYear(), d.getMonth() + 1, 0) : d;

  const listDate = [];
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  for (let index = 0; index < day; index++) {
    listDate.push(new Date(year, month, day - index));
  }

  return listDate.reverse();
};
//Calendar
export const getYears = year => {
  let years = [];
  for (let i = 16; i >= 0, i--; ) {
    years.push(year - i);
  }
  return years;
};

export const getDateMonth = (d, type) => {
  switch (type) {
    case 'prev': {
      const date = new Date(d.getFullYear(), d.getMonth(), 0);
      const arr = [];

      for (
        let index = date.getDate() - ((date.getDay() + 1) % 7);
        index < date.getDate();
        index++
      ) {
        arr.push(index + 1);
      }
      return {
        date,
        list: arr,
      };
    }
    case 'current': {
      const date = new Date(d.getFullYear(), d.getMonth() + 1, 0);
      const arr = [];
      for (let index = 0; index < date.getDate(); index++) {
        arr.push(index + 1);
      }

      return {
        date,
        list: arr,
      };
    }
    case 'next': {
      const date = new Date(d.getFullYear(), d.getMonth() + 1, 1);
      const arr = [];
      for (let index = 0; index < (7 - date.getDay()) % 7; index++) {
        arr.push(index + 1);
      }
      return {
        date,
        list: arr,
      };
    }
  }
};

export const getPrevMonth = (date = new Date()) => {
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  return new Date(year, month, 1);
};
export const compareDate = (date1, date2, key = 'equal') => {
  const day1 = date1.getDate();
  const month1 = date1.getMonth();
  const year1 = date1.getFullYear();
  const day2 = date2.getDate();
  const month2 = date2.getMonth();
  const year2 = date2.getFullYear();
  switch (key) {
    case 'equal':
      return day1 === day2 && month1 === month2 && year1 === year2;
    case 'greater':
      if (year1 > year2 || (year1 == year2 && month1 > month2)) {
        return true;
      } else return false;
    default:
      return day1 === day2 && month1 === month2 && year1 === year2;
  }
};
////Calendar END
export const colorGenerator = () =>
  `rgb(${Math.floor(Math.random() * 255)},${Math.floor(
    Math.random() * 255,
  )},${Math.floor(Math.random() * 255)})`;

export const getGraphLabel = (type, data, date = new Date()) => {
  const year = String(date.getFullYear()).slice(2, 4);
  const monthList = [
    'December',
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
  ];
  switch (type) {
    case 'Month': {
      let dateMonth = data.filter(item => item.id.split('.')[2] == year);

      return {
        labels: dateMonth.map(item => monthList[Number(item.id.split('.')[1])]),
        values: dateMonth.map(item => item.value),
      };
    }
    case 'Week': {
      let dateWeek = data.filter(item => item.id.split('.')[2] == year);

      return {
        labels: dateWeek.map((item, index) => index + 1),
        values: dateWeek.map(item => item.value),
      };
    }
    case 'Day': {
      return {
        labels: data.map(
          (item, index) =>
            Number(item.id.split('.')[0]) +
            '-' +
            monthList[Number(item.id.split('.')[1])],
        ),
        values: data.map(item => item.value),
      };
    }
    default:
      break;
  }
};

export const getLength = (type, data, date = new Date()) => {
  const year = String(date.getFullYear()).slice(2, 4);
  let filter = data.filter(item => item.id.split('.')[2] == year);
  switch (type) {
    case 'Week':
    case 'Month':
      return filter.length;
    case 'Day':
      return data.length;
    default:
      return 1;
  }
};

export const fixFormat = (date = new Date(), sendData) => {
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  if (sendData) {
    return `${year}${month + 1 > 9 ? '' : '0'}${month + 1}${
      day > 9 ? '' : '0'
    }${day}`;
  }
  return `${year}-${month + 1 > 9 ? '' : '0'}${month + 1}-${
    day > 9 ? '' : '0'
  }${day}`;
};

export const setDateByKey = (date, value, key) => {
  const d = parseDate(date);
  switch (key) {
    case 'day':
      return new Date(d.year, d.month, value);
    case 'month':
      return new Date(d.year, value, d.day);
    case 'year':
      return new Date(value, d.month, d.day);

    default:
      return new Date();
  }
};

export const parseDate = date => ({
  day: date.getDate(),
  month: date.getMonth(),
  year: date.getFullYear(),
});
export const compareDateByKeys = (date1, date2, key) => {
  const d1 = parseDate(date1);
  const d2 = parseDate(date2);
  switch (key) {
    case 'day':
      return d1.day === d2.day;
    case 'month':
      return d1.month === d2.month;
    case 'year':
      return d1.year === d2.year;
    case 'year month':
      return d1.year === d2.year && d1.month === d2.month;
    case 'year day':
      return d1.year === d2.year && d1.day === d2.day;
    case 'month day':
      return d1.month === d2.month && d1.day === d2.day;
    default:
      return d1.year === d2.year && d1.month === d2.month && d1.day === d2.day;
  }
};
