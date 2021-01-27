import { Datepicker } from 'vanillajs-datepicker';
export const renderDatepicker = () => {
  const elem = document.querySelector('input[name="date-picker"]');
  const datepicker = new Datepicker(elem, {
    // ...options
  });
  console.log('Hallo');
  console.log(datepicker);
};

//https://mymth.github.io/vanillajs-datepicker/#/
//https://raw.githack.com/mymth/vanillajs-datepicker/v1.1.2/demo/index.html
