import { weekdaysData } from './data.js';

export const renderExercisePage = () => {
  const exerciseWrapper = document.querySelector('.exercise-wrapper');
  console.log(exerciseWrapper);
  // create header and body divs
  const headerElement = `
    <div class="exercise-header">
      <div class="current-weekday">MO, 13. Dezember</div>
      <div class="return-button-wrapper">
        <button class="return-button">Zurück</button>
      </div>
    </div>
    `;
  exerciseWrapper.insertAdjacentHTML('beforeend', headerElement);

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
    // erstelle 7 divs mit den daten
    let repOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const inputFields = `<div class="exercise-content exercise-number">${
      index + 1
    }.</div>
        <div class="exercise-content exercise-dropdown-wrapper">
          <select class="exercise-dropdown">
            <option value="snatch">Reißen</option>
            <option value="powersnatch">Standreißen</option>
            <option value="snatchbalance">Unterhocken</option>
            <option value="">Hocke Senken</option>
            <option value="">Reißen aus dem Hang</option>
          </select>
        </div>
        <div class="exercise-content set-dropdown-wrapper">
          <select class="set-dropdown">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
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
    // fuege 7 divs in den bodycontainer hinzu
    bodyContainer.insertAdjacentHTML('beforeend', inputFields);
  });

  const addExerciseButton = `
    <div class="exercise-content exercise-add-button-wrapper">
        <button class="exercise-add-button">+</button>
    </div>`;
  bodyContainer.insertAdjacentHTML('beforeend', addExerciseButton);

  // create titles within grid
  // create one line of input elements with delete button
  // create add button
  return console.log('hello');
};

// add addbutton logic
// add back button logic
// add dynamic title and color
