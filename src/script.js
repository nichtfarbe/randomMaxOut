function init() {
  const SESSIONS = {
    snatch: {
      title: 'Reißen',
      text: `Klicke hier, um eine Einheit mit Schwerpunkt
              <strong>Reißen</strong> hinzuzufügen.`
    },
    clean: {
      title: 'Umsetzen + Stoßen',
      text: `Klicke hier, um eine Einheit mit dem Schwerpunkt
              <strong>Umsetzen + Stoßen</strong> hinzuzufügen.`
    },
    accessorie: {
      title: 'Accessories',
      text: `Klicke hier, um eine Einheit mit dem Schwerpunkt
              <strong>Accessories</strong> hinzuzufügen.`
    },
    restday: {
      title: 'Restday',
      text: `Klicke hier, um einen <strong>Restday</strong> hinzuzufügen.`
    }
  };

  const ADD_SESSION_BUTTON_LABEL = '+Einheit';

  const weekdays = [
    {
      day: 'MO',
      session: 'snatch'
    },
    {
      day: 'DI',
      session: 'clean'
    },
    {
      day: 'MI',
      session: ''
    },
    {
      day: 'DO',
      session: ''
    },
    {
      day: 'FR',
      session: 'restday'
    },
    {
      day: 'SA',
      session: ''
    },
    {
      day: 'SO',
      session: ''
    }
  ];

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

  const ADDED_SESSION_CARD_LABEL = 'Klick hier, um die Session zu bearbeiten.';
  const DELETE_SESSION_BUTTON_LABEL = 'Löschen';
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
    } else {
      const addButton = `<button class="add-session">${ADD_SESSION_BUTTON_LABEL}</button>`;
      const weekday = document.getElementById(`${day}`);
      weekday.insertAdjacentHTML('beforeend', addButton);
    }
  }

  const addEventListenerToAddButton = (button) => {
    button.addEventListener('click', () => {
      // button should not be displayed in overlay mode, just plain site below the overlay
      button.style.display = 'none';
      // create overlay on button click
      overlay.style.display = 'flex';
      overlay.style.cursor = 'pointer';
    });
  };

  //add event listeners to add session buttons
  const addButtons = document.querySelectorAll('button.add-session');
  addButtons.forEach(addEventListenerToAddButton);

  //functionality for delete button
  const deleteButtons = document.querySelectorAll('button.delete');
  deleteButtons.forEach((deleteButton) =>
    deleteButton.addEventListener('click', () => {
      //find surrounding div of delete button in order to remove it from the DOM
      const deletableCard = deleteButton.parentNode.parentNode;
      const weekday = deletableCard.parentNode;
      deletableCard.remove();

      //find index of affected weekday in weekday array, manipulate the session string to ''
      const weekdayID = weekday.id;
      console.log(weekdayID);

      weekdays.forEach((weekday) => {
        if (weekday.day == weekdayID) {
          weekday.session = '';
          console.log(weekdays);
        }
      });

      //re-create the add session button and make sure it gets an eventlistener assignes
      const addButton = document.createElement('button');
      addButton.innerText = ADD_SESSION_BUTTON_LABEL;
      addButton.classList.add('add-session');
      weekday.appendChild(addButton);
      addEventListenerToAddButton(addButton);
    })
  );

  // escape through overlay, normalize pointer and re-insert the add button
  const overlay = document.getElementById('overlay');
  overlay.addEventListener('click', () => {
    overlay.style.display = 'none';
    overlay.style.cursor = 'default';
    const addButtons = document.querySelectorAll('button.add-session');
    addButtons.forEach((button) => (button.style.display = 'block'));
  });

  //prevent blur on click on actual modal
  const cardContainer = document.querySelector('.card-container');
  cardContainer.addEventListener('click', (event) => {
    event.stopPropagation();
  });

  // render overlay session cards

  const ADD_BUTTON_LABEL = 'Hinzufügen';
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

  //add functionalitie to add button in overlay
  const addButtonsFromOverlay = document.querySelectorAll('button.add');
  console.log(addButtonsFromOverlay);
}
