/* eslint-disable import/prefer-default-export */
import { Datepicker } from 'vanillajs-datepicker';
import de from 'vanillajs-datepicker/js/i18n/locales/de';
import { formatDate } from './ExercisePage/utilities';

Object.assign(Datepicker.locales, de);

const getMondayToSundayString = (curr) => {
  const c = new Date(curr);
  const thisMonday = new Date(c.setDate(c.getDate() - c.getDay() + 1));
  const thisSunday = new Date(c.setDate(c.getDate() - c.getDay() + 7));
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  };
  const formattedThisMonday = thisMonday.toLocaleDateString('de-DE', options);
  const formattedThisSunday = thisSunday.toLocaleDateString('de-DE', options);
  return `${formattedThisMonday} - ${formattedThisSunday}`;
};

export const renderDatepicker = (removeWeekFromDOMAndRenderSelectedWeek) => {
  const inputElement = document.querySelector('input[name="date-picker"]');
  const datepicker = new Datepicker(inputElement, {
    daysOfWeekDisabled: [0, 2, 3, 4, 5, 6],
    daysOfWeekHighlighted: [1],
    language: 'de',
    weekStart: 1,
    autohide: true,
    format: {
      toValue(date) {
        return date;
      },
      toDisplay(date) {
        return getMondayToSundayString(date);
      }
    }
  });

  const curr = new Date();
  inputElement.value = getMondayToSundayString(curr);

  function renderWeekWithSelectedDate() {
    // const curr = new Date();
    const initialMonday = new Date(
      curr.setDate(curr.getDate() - curr.getDay() + 1)
    );
    const initialSelectedDate = formatDate(initialMonday);
    const selectedDates = {
      selectedDate: datepicker.getDate('yyyymmdd') || initialSelectedDate,
      dateOfThisMonday: datepicker.getDate() || initialMonday
    };
    inputElement.style.width = inputElement.value.length - 4 + 'ch';
    removeWeekFromDOMAndRenderSelectedWeek(selectedDates);
  }

  renderWeekWithSelectedDate();
  inputElement.addEventListener('changeDate', renderWeekWithSelectedDate);
};

// https://mymth.github.io/vanillajs-datepicker/#/
// https://raw.githack.com/mymth/vanillajs-datepicker/v1.1.2/demo/index.html
// https://stackoverflow.com/questions/5210376/how-to-get-first-and-last-day-of-the-current-week-in-javascript
