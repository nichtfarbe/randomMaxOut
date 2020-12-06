import {
  ADD_SESSION_BUTTON_LABEL,
  ADDED_SESSION_CARD_LABEL,
  DELETE_SESSION_BUTTON_LABEL,
  ADD_BUTTON_LABEL,
  SESSIONS
} from './constants.js';
import { weekdaysData } from './data.js';

const myStorage = window.localStorage;

const isLocalStorageEmpty = !localStorage.getItem('weekdays').length;
if (isLocalStorageEmpty) {
  myStorage.setItem('weekdays', JSON.stringify(weekdaysData));
}
const weekdays = JSON.parse(localStorage.getItem('weekdays'));

function init() {
  function addDeleteSessionCardLogic(deleteButton) {
    //find surrounding div of delete button in order to remove it from the DOM
    const deletableCard = deleteButton.parentNode.parentNode;
    const weekday = deletableCard.parentNode;
    deletableCard.remove();

    //find index of affected weekday in weekday array, manipulate the session string to ''
    const weekdayID = weekday.id;
    weekdays.map((weekday) => {
      if (weekday.day === weekdayID) {
        weekday.session = '';
      }
    });

    // delete session card from local storage
    myStorage.setItem('weekdays', JSON.stringify(weekdays));

    //re-create the add session button and make sure it gets an eventlistener assignes
    const addButton = document.createElement('button');
    addButton.innerText = ADD_SESSION_BUTTON_LABEL;
    addButton.classList.add('add-session');
    weekday.appendChild(addButton);
    addAddSessionCardLogic(addButton);
  }

  let clickedWeekdayID = null;
  const addAddSessionCardLogic = (button) => {
    button.addEventListener('click', (event) => {
      // create overlay on button click
      overlay.style.display = 'flex';
      overlay.style.cursor = 'pointer';
      //retrieve the weekday
      clickedWeekdayID = event.target.parentNode.id;
    });
  };

  // render weekdays
  weekdays.forEach(renderWeekday);
  function renderWeekday({ day }) {
    const weekday = `
      <div class="weekday" id="${day}">
        <p class="day-string">${day}</p>
      </div>
    `;
    const calendar = document.querySelector('.calendar');
    calendar.insertAdjacentHTML('beforeend', weekday);
  }

  // render added session cards
  weekdays.forEach(renderAddedSessionCard);
  function renderAddedSessionCard({ day, session }) {
    if (session) {
      const sessionTitle = SESSIONS[session].title;
      const sessionCard = ` 
        <div class="added-card">
          <div class="added-card-color" id="${session}-card"></div>
          <div class="added-card-subcontainer">
            <div class="added-card-headline">${sessionTitle}</div>
            <div class="added-card-subtext">
            ${ADDED_SESSION_CARD_LABEL}
            </div>
            <button class="delete">${DELETE_SESSION_BUTTON_LABEL}</button>
          </div>
        </div>
      `;
      const weekday = document.getElementById(day);
      weekday.insertAdjacentHTML('beforeend', sessionCard);
      const deleteButton = weekday.getElementsByClassName('delete')[0];
      deleteButton.addEventListener('click', () =>
        addDeleteSessionCardLogic(deleteButton)
      );
    } else {
      const addSessionButton = `<button class="add-session">${ADD_SESSION_BUTTON_LABEL}</button>`;
      const weekday = document.getElementById(`${day}`);
      weekday.insertAdjacentHTML('beforeend', addSessionButton);
      const addSessionButtonElement = weekday.getElementsByClassName(
        'add-session'
      )[0];
      addAddSessionCardLogic(addSessionButtonElement);
    }
  }

  // escape through overlay, normalize pointer and re-insert the add button
  const overlay = document.getElementById('overlay');
  function blurOverlay() {
    overlay.style.display = 'none';
    overlay.style.cursor = 'default';
  }
  overlay.addEventListener('click', blurOverlay);

  //prevent blur on click on actual modal
  const cardContainer = document.querySelector('.card-container');
  cardContainer.addEventListener('click', (event) => {
    event.stopPropagation();
  });

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
  const addButtonsFromOverlay = Array.from(
    document.querySelectorAll('button.add')
  );
  addButtonsFromOverlay.forEach((addButtonFromOverlay) =>
    addButtonFromOverlay.addEventListener('click', () => {
      blurOverlay();

      //find id of the selected card
      const selectedCard = addButtonFromOverlay.parentNode.parentNode;
      const selectedCardID = selectedCard.firstElementChild.id;
      const addSessionButton = document.querySelector(
        `#${clickedWeekdayID} > button.add-session`
      );
      addSessionButton.remove();

      //create session names for the weekdays array
      let selectedSessionName = selectedCardID.split('-')[0];

      //manipluate session property weekdays array
      weekdays.forEach((weekday) => {
        if (weekday.day === clickedWeekdayID) {
          weekday.session = selectedSessionName;
          renderAddedSessionCard(weekday);
        }
      });
    })
  );
}
init();
