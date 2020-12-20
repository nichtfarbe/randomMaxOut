import { weekdaysData } from './data.js';
import { SESSIONS } from './constants.js';

export const renderExercisePage = (session, day) => {
  const exerciseWrapper = document.querySelector('.exercise-wrapper');
  console.log(exerciseWrapper);
  // create header and body divs
  const headerElement = `
    <div class="exercise-header" id=${session}-card>
      <div class="current-weekday">${day}, 13. Dezember</div>
      <div class="return-button-wrapper">
        <button class="return-button">Zurück</button>
      </div>
    </div>
    `;
  exerciseWrapper.insertAdjacentHTML('beforeend', headerElement);

  //add backButtonLogic
  const backButton = document.querySelector('.return-button');
  backButton.addEventListener('click', () => {
    exerciseWrapper.innerHTML = '';
  });

  const bodyContainerElement = `<div class="exercise-body-container"></div>`;
  exerciseWrapper.insertAdjacentHTML('beforeend', bodyContainerElement);

  const bodyContainer = document.querySelector('.exercise-body-container');
  const bodyTitles = `<div></div>
      <div class="exercise-title">Übung</div>
      <div class="exercise-title">Sätze</div>
      <div class="exercise-title">Reps</div>
      <div class="exercise-title">Gewicht</div>
      <div class="exercise-title">Anmerkungen</div>
      <div></div>`;
  bodyContainer.insertAdjacentHTML('beforeend', bodyTitles);

  const exercises = weekdaysData[0].exercises;
  exercises.forEach((exercise, index) => {
    //create 7 divs with data
    const exerciseOptions = SESSIONS[session].exercises;
    const setOptions = [1, 2, 3, 4, 5, 6];
    const repOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const inputFields = `<div class="exercise-content exercise-number">${
      index + 1
    }.</div>
        <div class="exercise-content exercise-dropdown-wrapper">
          <select class="exercise-dropdown">
          ${Object.keys(exerciseOptions).map((option) => {
            //find saved exercise in database and make it the selected option
            const selected = exercise.name === option ? 'selected' : '';
            return `<option ${selected}>${exerciseOptions[option]}</option>`;
          })}
          </select>
        </div>
        <div class="exercise-content set-dropdown-wrapper">
          <select class="set-dropdown">
          ${setOptions.map((option) => {
            //find saved set in database and make it the selected option
            const selected = exercise.sets === option ? 'selected' : '';
            return `<option ${selected}>${option}</option>`;
          })}
          </select>
        </div>
        <div class="exercise-content reps-dropdown-wrapper">
          <select class="reps-dropdown">
          ${repOptions.map((option) => {
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
    // add 7 divs to bodycontainer
    bodyContainer.insertAdjacentHTML('beforeend', inputFields);
  });

  const addExerciseButton = `
    <div class="exercise-content exercise-add-button-wrapper">
        <button class="exercise-add-button">+</button>
    </div>`;
  bodyContainer.insertAdjacentHTML('beforeend', addExerciseButton);

  // create titles within grid (line 21?)
  // create one line of input elements with delete button
  // create add button
};

// add addbutton logic
// add dynamic title and color
