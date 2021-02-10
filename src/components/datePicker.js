import { Datepicker } from 'vanillajs-datepicker';
import de from 'vanillajs-datepicker/js/i18n/locales/de';
Object.assign(Datepicker.locales, de);

export const renderDatepicker = (removeWeekFromDOMAndRenderSelectedWeek) => {
  const inputElement = document.querySelector('input[name="date-picker"]');

  // set this week's monday date as input value
  const curr = new Date();
  const dateOfThisMonday = new Date(
    curr.setDate(curr.getDate() - curr.getDay() + 1)
  );
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  };
  const formattedDateOfThisMonday = dateOfThisMonday.toLocaleDateString(
    'de-DE',
    options
  );
  inputElement.value = formattedDateOfThisMonday;

  const datepicker = new Datepicker(inputElement, {
    daysOfWeekDisabled: [0, 2, 3, 4, 5, 6],
    daysOfWeekHighlighted: [1],
    language: 'de',
    weekStart: 1
  });
  renderWeekWithSelectedDate();
  inputElement.addEventListener('changeDate', renderWeekWithSelectedDate);

  function renderWeekWithSelectedDate() {
    const selectedDates = {
      selectedDate: datepicker.getDate('yyyymmdd'),
      dateOfThisMonday: datepicker.getDate()
    };
    removeWeekFromDOMAndRenderSelectedWeek(selectedDates);
  }
};

//https://mymth.github.io/vanillajs-datepicker/#/
//https://raw.githack.com/mymth/vanillajs-datepicker/v1.1.2/demo/index.html
//https://stackoverflow.com/questions/5210376/how-to-get-first-and-last-day-of-the-current-week-in-javascript
