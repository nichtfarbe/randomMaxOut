import { ADD_BUTTON_LABEL, SESSIONS } from '../../constants.js';

export const AddSessionDialog = (
  weekdayId,
  myStorage,
  weeksData,
  selectedDate,
  renderAddedSessionCard
) => {
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
  cardContainer.addEventListener('click', (event) => event.stopPropagation());

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
  const overlayAddButtons = Array.from(document.querySelectorAll('button.add'));
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
};
