function init() {
  const overlay = document.getElementById('overlay');
  const cardContainer = document.querySelector('.card-container');
  const calendar = document.querySelector('.calendar');

  const DAYS = {
    1: 'MO',
    2: 'DI',
    3: 'MI',
    4: 'DO',
    5: 'FR',
    6: 'SA',
    7: 'SO',
  };

  const SESSIONS = {
    1: 'Reißen',
    2: 'Umsetzen + Stoßen',
    3: 'Accessories',
    4: 'Restday',
  };

  const ADD_SESSION_BUTTON_LABEL = '+Einheit';

  const weekdays = [
    {
      day: 1,
      session: 1,
    },
    {
      day: 2,
      session: 2,
    },
    {
      day: 3,
      session: 3,
    },
    {
      day: 4,
      session: 3,
    },
    {
      day: 5,
      session: 3,
    },
    {
      day: 6,
      session: 0,
    },
    {
      day: 7,
      session: 4,
    },
  ];

  // render weekdays
  weekdays.forEach(renderWeekday);
  function renderWeekday({ day }) {
    const weekday = `
    <div class="weekday" id="${DAYS[day]}">
      <p class="day-string">${DAYS[day]}</p>
    </div>`;
    calendar.insertAdjacentHTML('beforeend', weekday);
  }

  // render session cards
  weekdays.forEach(renderSessionCard);
  function renderSessionCard({ day, session }) {
    const dayText = DAYS[day];
    const sessionText = SESSIONS[session];
    const sessionCard = ` 
    <div class="added-card">
      <div class="added-card-color" id="added-snatch-card"></div>
      <div class="added-card-subcontainer">
        <div class="added-card-headline">${sessionText}</div>
        <div class="added-card-subtext">
          Klick hier, um die Session zu bearbeiten.
        </div>
        <button class="delete">Löschen</button>
      </div>
    </div>
    `;
    const weekday = document.getElementById(`${dayText}`);
    if (session !== 0) {
      weekday.insertAdjacentHTML('beforeend', sessionCard);
    }
  }

  // render add session buttons
  weekdays.forEach(renderAddSessionButton);
  function renderAddSessionButton({ day, session }) {
    const dayText = DAYS[day];
    const addButton = `<button class="add-session">${ADD_SESSION_BUTTON_LABEL}</button>`;
    const weekday = document.getElementById(`${dayText}`);
    if (session === 0) {
      weekday.insertAdjacentHTML('beforeend', addButton);
    }
  }

  // add event listeners to add session buttons
  const addButtons = document.querySelectorAll('button.add-session');
  addButtons.forEach((button) =>
    button.addEventListener('click', () => {
      // button should not be displayed in overlay mode, just plain site below the overlay
      button.style.display = 'none';
      // create overlay on button click
      overlay.style.display = 'flex';
      overlay.style.cursor = 'pointer';
    })
  );

  // escape through overlay, normalize pointer and re-insert the add button
  overlay.addEventListener('click', () => {
    overlay.style.display = 'none';
    overlay.style.cursor = 'default';
    addButtons.forEach((button) => (button.style.display = 'block'));
  });

  //prevent blur on click on actual modal
  cardContainer.addEventListener('click', (event) => {
    event.stopPropagation();
  });
}
