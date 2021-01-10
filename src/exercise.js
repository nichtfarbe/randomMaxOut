import { SESSIONS, SET_OPTIONS, REP_OPTIONS } from './constants.js';

export const renderExercisePage = ({
  weekdaysData,
  day,
  session,
  myStorage
}) => {
  const body = document.querySelector('body');
  const exerciseWrapperElement = `<div class="exercise-wrapper"></div>`;
  body.insertAdjacentHTML('beforeend', exerciseWrapperElement);
  const exerciseWrapper = document.querySelector('.exercise-wrapper');

  // create header div
  const headerElement = `
    <div class="exercise-header" id=${session}-card>
      <div class="current-weekday">${day}, 13. Dezember</div>
      <div class="return-button-wrapper">
        <button class="return-button">Zurück</button>
      </div>
    </div>
    `;
  exerciseWrapper.insertAdjacentHTML('beforeend', headerElement);

  // create return button event listener
  const returnButton = document.querySelector('.return-button');
  returnButton.addEventListener('click', () => {
    body.removeChild(exerciseWrapper);
  });

  // create body div
  const bodyContainerElement = `<div class="exercise-body-container"></div>`;
  exerciseWrapper.insertAdjacentHTML('beforeend', bodyContainerElement);

  // create title divs
  const bodyContainer = document.querySelector('.exercise-body-container');
  const bodyTitles = `<div></div>
      <div class="exercise-title">Übung</div>
      <div class="exercise-title">Sätze</div>
      <div class="exercise-title">Reps</div>
      <div class="exercise-title">Gewicht</div>
      <div class="exercise-title">Anmerkungen</div>
      <div></div>`;
  bodyContainer.insertAdjacentHTML('beforeend', bodyTitles);

  // render saved exercises from database
  const weekdayData = weekdaysData.filter((weekday) => weekday.day === day)[0];
  weekdayData?.exercises?.forEach((exercise, index) => {
    const exerciseOptions = SESSIONS[session].exercises;
    const inputFields = `
    <div class="exercise-content exercise-number">${index + 1}.</div>
      <div class="exercise-content exercise-dropdown-wrapper">
        <select class="exercise-dropdown">
          <option value="" disabled selected></option>
          ${Object.keys(exerciseOptions).map((option) => {
            // find saved exercise in database and make it the selected option
            const selected = exercise.name === option ? 'selected' : '';
            return `<option ${selected}>${exerciseOptions[option]}</option>`;
          })}
        </select>
      </div>
      <div class="exercise-content set-dropdown-wrapper">
        <select class="set-dropdown">
          <option value="" disabled selected></option>
          ${SET_OPTIONS.map((option) => {
            // find saved set in database and make it the selected option
            const selected = exercise.sets === option ? 'selected' : '';
            return `<option ${selected}>${option}</option>`;
          })}
        </select>
      </div>
      <div class="exercise-content reps-dropdown-wrapper">
        <select class="reps-dropdown">
          <option value="" disabled selected></option>
          ${REP_OPTIONS.map((option) => {
            // find saved rep in database and make it the selected option
            const selected = exercise.reps === option ? 'selected' : '';
            return `<option ${selected}>${option}</option>`;
          })}
        </select>
      </div>
      <div class="exercise-content weight-input-wrapper">
        <input type="text" class="weight-input" value="${exercise.weight}"/>
      </div>
      <div class="exercise-content note-input-wrapper">
        <textarea class="note-input">${exercise.notes}</textarea>
      </div>
      <div class="exercise-content exercise-delete-button-wrapper">
      <button class="exercise-delete-button">-</button>
    </div>`;
    bodyContainer.insertAdjacentHTML('beforeend', inputFields);
  });

  const addExerciseButtonElement = `
    <div class="exercise-content exercise-add-button-wrapper">
        <button class="exercise-add-button">+</button>
    </div>`;
  bodyContainer.insertAdjacentHTML('beforeend', addExerciseButtonElement);

  // add addbutton logic
  const addExerciseButton = document.querySelector(
    '.exercise-add-button-wrapper'
  );

  addExerciseButton.addEventListener('click', () => {
    const oldData = myStorage.getItem('weekdays');
    console.log(oldData);
    // const updatedData = '';
    // myStorage.setItem('weekdays',JSON.stringify(updatedData));
  });
};
