export const getExerciseHeaderDate = (day, dateOfThisMonday) => {
  const curr = dateOfThisMonday;
  const getWeekDay = () => {
    switch (day) {
      case 'MO':
        return 1;
      case 'DI':
        return 2;
      case 'MI':
        return 3;
      case 'DO':
        return 4;
      case 'FR':
        return 5;
      case 'SA':
        return 6;
      default:
        return 0;
    }
  };
  const selectedSessionDate = new Date(
    curr.setDate(curr.getDate() - curr.getDay() + getWeekDay())
  );

  const options = { weekday: 'short', month: 'long', day: 'numeric' };
  const formattedSelectedSessionDate = selectedSessionDate.toLocaleDateString(
    'de-DE',
    options
  );
  return formattedSelectedSessionDate;
};

export const debounce = (func, timeout = 300) => {
  let timer;
  return function executedFunction(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), timeout);
  };
};

export const formatDate = (date) => {
  let month = '' + (date.getMonth() + 1);
  let day = '' + date.getDate();
  const year = date.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('');
};
