function init() {
  const SESSIONS = {
    1: 'Reißen',
    2: 'Umsetzen + Stoßen',
    3: 'Accessories',
    4: 'Restday',
  };

  const ADD_SESSION_BUTTON_LABEL = '+Einheit';

  const weekdays = [
    {
      day: 'MO',
      session: 1,
    },
    {
      day: 'DI',
      session: 2,
    },
    {
      day: 'MI',
      session: 3,
    },
    {
      day: 'DO',
      session: 0,
    },
    {
      day: 'FR',
      session: 3,
    },
    {
      day: 'SA',
      session: 0,
    },
    {
      day: 'SO',
      session: 4,
    },
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

  // render session cards
  weekdays.forEach(renderSessionCard);
  function renderSessionCard({ day, session }) {
    if (session) {
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
      const weekday = document.getElementById(`${day}`);
      weekday.insertAdjacentHTML('beforeend', sessionCard);
    }
  }

  // render add session buttons
  weekdays.forEach(renderAddSessionButton);
  function renderAddSessionButton({ day, session }) {
    if (!session) {
      const addButton = `<button class="add-session">${ADD_SESSION_BUTTON_LABEL}</button>`;
      const weekday = document.getElementById(`${day}`);
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
  const overlay = document.getElementById('overlay');
  overlay.addEventListener('click', () => {
    overlay.style.display = 'none';
    overlay.style.cursor = 'default';
    addButtons.forEach((button) => (button.style.display = 'block'));
  });

  //prevent blur on click on actual modal
  const cardContainer = document.querySelector('.card-container');
  cardContainer.addEventListener('click', (event) => {
    event.stopPropagation();
  });
}
