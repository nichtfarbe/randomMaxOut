import { Datepicker } from 'vanillajs-datepicker';
import de from 'vanillajs-datepicker/js/i18n/locales/de';
Object.assign(Datepicker.locales, de);

export const renderDatepicker = (removeWeekFromDOMAndRenderSelectedWeek) => {
  const inputElement = document.querySelector('input[name="date-picker"]');
  const datepicker = new Datepicker(inputElement, {
    daysOfWeekDisabled: [0, 2, 3, 4, 5, 6],
    daysOfWeekHighlighted: [1],
    language: 'de',
    weekStart: 1
  });
  inputElement.addEventListener('changeDate', (event) => {
    const selectedDate = datepicker.getDate('yyyymmdd');
    removeWeekFromDOMAndRenderSelectedWeek(selectedDate);
  });
};

//https://mymth.github.io/vanillajs-datepicker/#/
//https://raw.githack.com/mymth/vanillajs-datepicker/v1.1.2/demo/index.html
