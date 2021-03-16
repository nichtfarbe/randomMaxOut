import 'regenerator-runtime/runtime';
import {
  ADD_SESSION_BUTTON_LABEL,
  ADDED_SESSION_CARD_LABEL,
  DELETE_SESSION_BUTTON_LABEL,
  ADD_BUTTON_LABEL,
  SESSIONS,
  WEEKDAYS
} from './constants.js';
import { weeksMockData } from './data.js';
import { ExercisePage } from './components/ExercisePage/ExercisePage.js';
import { renderDatepicker } from './components/datePicker.js';
import { DeleteSessionCardDialog } from './components/DeleteSessionCardDialog/DeleteSessionCardDialog';

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
    async function addDeleteSessionCardLogic(deleteButton, session) {
      const shallDelete = await DeleteSessionCardDialog(session);
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
      addButton.addEventListener('click', () => renderOverlay(weekdayId));
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
            addDeleteSessionCardLogic(deleteButton, session);
          });
        }
      } else {
        // if no session data for this day exists, render the add button
        renderAddSessionButton(weekdayId);
      }
    }

    function renderOverlay(weekdayId) {
      const overlayElements = `
      <div id="overlay">
      <div class="card-container"></div>
      </div>
      `;
      document.body.insertAdjacentHTML('afterbegin', overlayElements);

      // add delete functionality when clicking on overlay
      const overlay = document.getElementById('overlay');
      function removeOverlay() {
        overlay.remove();
      }
      overlay.addEventListener('click', removeOverlay);

      // prevent blur on click on actual modal
      const cardContainer = document.querySelector('.card-container');
      cardContainer.addEventListener('click', (event) =>
        event.stopPropagation()
      );

      // render overlay session cards
      Object.keys(SESSIONS).forEach(renderOverlaySessionCards);
      function renderOverlaySessionCards(sessionCardKey) {
        const overlayCard = `
        <div class="card">
        <div class="card-color" id="${sessionCardKey}-card"></div>
        <div class="card-sub-container">
        <div class="card-headline">${SESSIONS[sessionCardKey].title}</div>
        <div class="card-subtext">${SESSIONS[sessionCardKey].text}</div>
        <button class="add">${ADD_BUTTON_LABEL}</button>
        </div>
        </div>
        `;
        cardContainer.insertAdjacentHTML('beforeend', overlayCard);
      }

      //add functionality to add-button in overlay
      const overlayAddButtons = Array.from(
        document.querySelectorAll('button.add')
      );
      overlayAddButtons.forEach((overlayAddButton) =>
        overlayAddButton.addEventListener('click', () => {
          removeOverlay();

          //find id of the selected card
          const selectedCard = overlayAddButton.parentNode.parentNode;
          const selectedCardID = selectedCard.firstElementChild.id;
          const addSessionButton = document.querySelector(
            `#${weekdayId} > button.add-session`
          );
          addSessionButton.remove();

          //create session names for the weekdays array
          let selectedSessionName = selectedCardID.split('-')[0];

          //manipluate session property weekdays array
          const selectedWeekday = {
            day: weekdayId,
            session: selectedSessionName
          };
          let weekdaysData = weeksData?.[selectedDate];
          if (!weekdaysData) {
            weeksData[selectedDate] = [selectedWeekday];
          } else {
            weekdaysData.push(selectedWeekday);
            weeksData[selectedDate] = weekdaysData;
          }

          renderAddedSessionCard(weekdayId);

          // save session card to local storage
          myStorage.setItem('weeks', JSON.stringify(weeksData));
        })
      );
    }
  }
}
init();
