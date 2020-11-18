function init() {
  const button = document.getElementById('add-mo-session');
  const overlay = document.getElementById('overlay');
  const cardContainer = document.querySelector('.card-container');
  const weekday = document.querySelector('.weekday');
  const monday = document.getElementById('monday');
  const tuesday = document.getElementById('tuesday');
  const wednesday = document.getElementById('wednesday');
  const thursday = document.getElementById('thursday');
  const friday = document.getElementById('friday');
  const saturday = document.getElementById('saturday');
  const sunday = document.getElementById('sunday');
  const week = [
    {
      monday: 2
    },
    {
      tuesday: 1
    },
    {
      wednesday: 4
    },
    {
      thursday: 2
    },
    {
      friday: 3
    },
    {
      saturday: 1
    },
    {
      sunday: 4
    }
  ];
  week.forEach(renderWeekday);

  function renderWeekday() {
    const addedCard = ` 
    <div class="added-card">
      <div class="added-card-color" id="added-snatch-card"></div>
      <div class="added-card-subcontainer">
        <div class="added-card-headline">Reißen</div>
        <div class="added-card-subtext">
          Klick hier, um die Session zu bearbeiten.
        </div>
        <button class="delete">Löschen</button>
      </div>
    </div>
    `;
    weekday.insertAdjacentHTML('beforeend', addedCard);
  }
  button.addEventListener('click', () => {
    // button should not be displayed in overlay mode, just plain site below the overlay
    button.style.display = 'none';

    // create overlay on button click
    overlay.style.display = 'flex';
    overlay.style.cursor = 'pointer';
  });

  // escape through overlay, normalize pointer and re-insert the add button
  overlay.addEventListener('click', () => {
    overlay.style.display = 'none';
    overlay.style.cursor = 'default';
    button.style.display = 'block';
  });

  //prevent blur on click on actual modal
  cardContainer.addEventListener('click', (event) => {
    event.stopPropagation();
  });
}
