function init() {
  const button = document.getElementById('add-mo-session');
  const overlay = document.getElementById('overlay');
  const cardContainer = document.querySelector('.card-container');

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
