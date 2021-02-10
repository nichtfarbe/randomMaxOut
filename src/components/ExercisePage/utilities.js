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
