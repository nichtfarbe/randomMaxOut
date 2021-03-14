import 'regenerator-runtime/runtime';
import {
  ADD_SESSION_BUTTON_LABEL,
  ADDED_SESSION_CARD_LABEL,
  DELETE_SESSION_BUTTON_LABEL,
  SESSIONS,
  WEEKDAYS
} from './constants.js';
import { weeksMockData } from './data.js';
import { ExercisePage } from './components/ExercisePage/ExercisePage.js';
import { renderDatepicker } from './components/datePicker.js';
import { DeleteSessionCardDialog } from './components/DeleteSessionCardDialog/DeleteSessionCardDialog';
import { AddSessionDialog } from './components/AddSessionDialog/AddSessionDialog';

const myStorage = window.localStorage;

const isLocalStorageEmpty = !localStorage.getItem('weeks');
if (isLocalStorageEmpty) {
  myStorage.setItem('weeks', JSON.stringify(weeksMockData));
}
const weeksData = JSON.parse(localStorage.getItem('weeks'));

function init() {
  function removeWeekFromDOMAndRenderSelectedWeek(selectedDates) {
    // remove current week from DOM
    const weekdayElements = document.querySelectorAll('.weekday');
    weekdayElements.forEach((e) => e.parentNode.removeChild(e));

    const overlayCards = document.querySelectorAll('.card');
    overlayCards.forEach((e) => e.parentNode.removeChild(e));

    // render selected week
    renderWeek(selectedDates);
  }
  //render Datepicker
  renderDatepicker(removeWeekFromDOMAndRenderSelectedWeek);

  function renderWeek(selectedDates) {
    const { selectedDate, dateOfThisMonday } = selectedDates;
    let weekdaysData = weeksData[selectedDate];
    //session card logic
    async function addDeleteSessionCardLogic(deleteButton) {
      const shallDelete = await DeleteSessionCardDialog();
      if (shallDelete) {
        weekdaysData = weeksData[selectedDate];
        // remove card from DOM
        const deletableCard = deleteButton.parentNode.parentNode;
        const weekday = deletableCard.parentNode;
        deletableCard.remove();

        // remove session from database array by finding index of affected weekday
        // in weekday array and deleting obsolete properties
        const weekdayID = weekday.id;
        const updatedWeekdaysData = weekdaysData.filter(
          (weekday) => weekday.day !== weekdayID
        );

        // delete selectedDate if empty
        if (updatedWeekdaysData.length) {
          weeksData[selectedDate] = updatedWeekdaysData;
        } else {
          delete weeksData[selectedDate];
        }

        // update local storage
        myStorage.setItem('weeks', JSON.stringify(weeksData));

        // render the addSessionButton again
        renderAddSessionButton(weekdayID);
      }
    }

    function renderAddSessionButton(weekdayId) {
      const addButton = document.createElement('button');
      addButton.innerText = ADD_SESSION_BUTTON_LABEL;
      addButton.classList.add('add-session');
      const weekdayElement = document.getElementById(weekdayId);
      weekdayElement.appendChild(addButton);
      addButton.addEventListener('click', () =>
        AddSessionDialog(
          weekdayId,
          myStorage,
          weeksData,
          selectedDate,
          renderAddedSessionCard
        )
      );
    }

    // render weekdays
    WEEKDAYS.forEach(renderWeekday);
    function renderWeekday(day) {
      const weekday = `
      <div class="weekday" id="${day}">
        <p class="day-string">${day}</p>
      </div>
    `;
      const calendar = document.querySelector('.calendar');
      calendar.insertAdjacentHTML('beforeend', weekday);

      // render added session cards
      renderAddedSessionCard(day);
    }

    function renderAddedSessionCard(weekdayId) {
      // go through WEEKDAYS constants and check if they exist in the current week data.
      // if they exist, there is a session that day.
      let weekdaysData = weeksData[selectedDate];
      const filteredArray = weekdaysData?.filter(
        ({ day }) => day === weekdayId
      );

      // if session data exists, render the card
      if (filteredArray?.length) {
        const { day, session } = filteredArray[0];
        if (session) {
          const sessionTitle = SESSIONS[session].title;
          const sessionCard = ` 
          <div class="added-card" id="${session}-card">
            <div class="added-card-color"></div>
            <div class="added-card-subcontainer">
              <div class="added-card-headline">${sessionTitle}</div>
              <div class="added-card-subtext">
              ${session !== 'restday' ? ADDED_SESSION_CARD_LABEL : ''}
              </div>
              <div class="delete">${DELETE_SESSION_BUTTON_LABEL}</div>
            </div>
          </div>
        `;
          const weekday = document.getElementById(day);
          weekday.insertAdjacentHTML('beforeend', sessionCard);

          // add session card event listener
          const sessionCardElement = weekday.querySelector('.added-card');
          if (session !== 'restday') {
            sessionCardElement.addEventListener('click', () => {
              ExercisePage({
                weeksData,
                selectedDate,
                dateOfThisMonday,
                day,
                session,
                myStorage
              });
              const calendar = document.querySelector('.wrapper');
              calendar.style = 'display: none';
            });
          } else {
            sessionCardElement.style.cursor = 'default';
          }

          // add delete card event listener
          const deleteButton = weekday.getElementsByClassName('delete')[0];
          deleteButton.addEventListener('click', (event) => {
            event.stopPropagation();
            addDeleteSessionCardLogic(deleteButton);
          });
        }
      } else {
        // if no session data for this day exists, render the add button
        renderAddSessionButton(weekdayId);
      }
    }
  }
}
init();
