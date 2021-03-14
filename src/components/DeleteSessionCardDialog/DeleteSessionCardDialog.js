export const DeleteSessionCardDialog = () =>
  new Promise((resolve) => {
    const overlayElements = `<div class="overlay-delete-container">
  <div class="overlay-delete-dialog-box">
    <div class="overlay-delete-title">Achtung!</div>
    <div class="overlay-delete-subtitle">Du bist im Begriff, eine Trainingseinheit zu löschen. Damit gehen auch alle Übungen dieses Trainingstages verloren. Bist du sicher?</div>
    <div class="overlay-delete-buttons">      
      <button class="overlay-delete-button-cancel">Abbrechen</button>
      <button class="overlay-delete-button-confirm">Bestätigen</button>
    </div>
  </div>
  </div>`;
    document.body.insertAdjacentHTML('afterbegin', overlayElements);

    // add delete functionality when clicking on overlay
    const overlay = document.querySelector('.overlay-delete-container');
    function removeOverlay() {
      overlay.remove();
      resolve(false);
    }
    overlay.addEventListener('click', removeOverlay);

    // prevent blur on click on actual modal
    const dialogBox = document.querySelector('.overlay-delete-dialog-box');
    dialogBox.addEventListener('click', (event) => event.stopPropagation());

    // handle buttons
    const cancelButton = document.querySelector(
      '.overlay-delete-button-cancel'
    );
    cancelButton.addEventListener('click', removeOverlay);
    const confirmButton = document.querySelector(
      '.overlay-delete-button-confirm'
    );

    confirmButton.addEventListener('click', () => {
      overlay.remove();
      resolve(true);
    });
  });
