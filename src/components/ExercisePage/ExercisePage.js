import {
  SESSIONS,
  SET_OPTIONS,
  REP_OPTIONS,
  DELETE_DIALOG_STRINGS
} from '../../constants.js';
import { getExerciseHeaderDate, debounce, toggleField } from './utilities.js';
import { DeleteDialog } from '../../components/DeleteDialog/DeleteDialog';

export const ExercisePage = ({
  weeksData,
  selectedDate,
  dateOfThisMonday,
  day,
  session,
  myStorage
}) => {
  const body = document.querySelector('body');
  const exerciseWrapperElement = '<div class="exercise-wrapper"></div>';
  body.insertAdjacentHTML('beforeend', exerciseWrapperElement);
  const exerciseWrapper = document.querySelector('.exercise-wrapper');

  // create header div
  const headerElement = `
    <div class="exercise-header" id=${session}-card>
      <div class="exercise-header-weekday">${getExerciseHeaderDate(
        day,
        dateOfThisMonday
      )}</div>
      <div class="exercise-header-title">
      ${SESSIONS[session].title}
      </div>
      <div class="exercise-header-return-button-wrapper">
        <button class="exercise-header-return-button">Zurück</button>
      </div>
    </div>
    `;
  exerciseWrapper.insertAdjacentHTML('beforeend', headerElement);

  // create return button event listener
  const returnButton = document.querySelector('.exercise-header-return-button');
  returnButton.addEventListener('click', () => {
    body.removeChild(exerciseWrapper);
    const calendar = document.querySelector('.wrapper');
    calendar.style = '';
  });

  // create body div
  const bodyContainerElement = '<div class="exercise-body-container"></div>';
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
  function renderElements(weekdayData) {
    weekdayData?.exercises?.forEach((exercise, exerciseIndex) => {
      const exerciseOptions = SESSIONS[session].exercises;
      const inputFields = `
      <div class="exercise-content exercise-number">${exerciseIndex + 1}.</div>
        <div class="exercise-content exercise-dropdown-wrapper">
          <select class="exercise-dropdown" id="exercise-dropdown-${exerciseIndex}">
            <option value="" disabled selected></option>
            ${Object.keys(exerciseOptions).map((option) => {
              // find saved exercise in database and make it the selected option
              const selected = exercise.name === option ? 'selected' : '';
              return `<option value=${option} ${selected}>${exerciseOptions[option]}</option>`;
            })}
          </select>
          <input class="exercise-input" id="exercise-dropdown-${exerciseIndex}-custom-input" style="display:none;" disabled="disabled"">
        </div>
        <div class="exercise-content set-dropdown-wrapper">
          <select class="set-dropdown" id="set-dropdown-${exerciseIndex}">
            <option value="" disabled selected></option>
            ${SET_OPTIONS.map((option) => {
              // find saved set in database and make it the selected option
              const selected = exercise.sets === option ? 'selected' : '';
              return `<option ${selected}>${option}</option>`;
            })}
          </select>
        </div>
        <div class="exercise-content rep-dropdown-wrapper">
          <select class="rep-dropdown" id="rep-dropdown-${exerciseIndex}">
            <option value="" disabled selected></option>
            ${REP_OPTIONS.map((option) => {
              // find saved rep in database and make it the selected option
              const selected = exercise.reps === option ? 'selected' : '';
              return `<option ${selected}>${option}</option>`;
            })}
          </select>
        </div>
        <div class="exercise-content weight-input-wrapper">
          <input type="text" class="weight-input" id="weight-input-${exerciseIndex}" value="${
        exercise.weight
      }"/>
        </div>
        <div class="exercise-content note-input-wrapper">
          <textarea class="note-input" id="note-input-${exerciseIndex}">${
        exercise.notes
      }</textarea>
        </div>
        <div class="exercise-content exercise-delete-button-wrapper" id="exercise-delete-button-wrapper-${exerciseIndex}">
        <button class="exercise-delete-button">-</button>
      </div>`;
      bodyContainer.insertAdjacentHTML('beforeend', inputFields);

      // input fields event listeners
      //exercise dropdown
      const exerciseDropdownInputElement = document.querySelector(
        `#exercise-dropdown-${exerciseIndex}-custom-input`
      );
      const exerciseDropdownElement = document.querySelector(
        `#exercise-dropdown-${exerciseIndex}`
      );

      addExerciseDropdownInputEventListener(
        exerciseDropdownInputElement,
        exerciseDropdownElement,
        exerciseIndex
      );

      addExerciseDropdownEventListener(
        exerciseDropdownElement,
        exerciseOptions,
        exerciseIndex,
        exerciseDropdownInputElement
      );

      checkDisplayWhichExerciseDropdownElement();
      function checkDisplayWhichExerciseDropdownElement() {
        if (exercise.name === 'customExercise') {
          toggleField(exerciseDropdownElement, exerciseDropdownInputElement);
          exerciseDropdownInputElement.value = exercise.customExerciseName;
        }
      }
      //set dropdown
      const setDropdownElement = document.querySelector(
        `#set-dropdown-${exerciseIndex}`
      );
      addSetDropdownEventListener(setDropdownElement, exerciseIndex);

      //rep dropdown
      const repDropdownElement = document.querySelector(
        `#rep-dropdown-${exerciseIndex}`
      );
      addRepDropdownEventListener(repDropdownElement, exerciseIndex);

      //weight input field
      const weightInputFieldElement = document.querySelector(
        `#weight-input-${exerciseIndex}`
      );
      addWeightInputFieldEventListener(weightInputFieldElement, exerciseIndex);

      // exercise notes input field
      const notesInputFieldElement = document.querySelector(
        `#note-input-${exerciseIndex}`
      );
      addNotesInputFieldEventListener(notesInputFieldElement, exerciseIndex);

      // insert delete button
      const deleteExerciseButton = document.querySelector(
        `#exercise-delete-button-wrapper-${exerciseIndex}`
      );
      deleteExerciseButtonEventListener(deleteExerciseButton, exerciseIndex);
    });
  }
  const weekdaysData = weeksData[selectedDate];
  const weekdayData = weekdaysData.filter((weekday) => weekday.day === day)[0];
  renderElements(weekdayData);

  const addExerciseButtonElement = `
    <div class="exercise-content exercise-add-button-wrapper">
        <button class="exercise-add-button">+</button>
    </div>`;
  bodyContainer.insertAdjacentHTML('beforeend', addExerciseButtonElement);

  // add addbutton logic
  const addExerciseButton = document.querySelector(
    '.exercise-add-button-wrapper'
  );
  addExerciseButtonEventListener(addExerciseButton);

  function addExerciseButtonEventListener(addExerciseButton) {
    addExerciseButton.addEventListener('click', () => {
      //database change
      const weekdayData = weekdaysData.filter(
        (weekDayData) => weekDayData.day === day
      )[0];
      const emptyEntry = {
        name: '',
        sets: '',
        reps: '',
        weight: '',
        notes: ''
      };
      if (!weekdayData.exercises) {
        weekdayData.exercises = [];
      }
      weekdayData.exercises.push(emptyEntry);

      const index = weekdaysData.findIndex((weekDay) => weekDay.day === day);
      const updatedWeekdaysData = [
        ...weekdaysData.slice(0, index),
        weekdayData,
        ...weekdaysData.slice(index + 1)
      ];

      weeksData[selectedDate] = updatedWeekdaysData;
      myStorage.setItem('weeks', JSON.stringify(weeksData));

      //ui change
      bodyContainer.innerHTML = '';
      bodyContainer.insertAdjacentHTML('beforeend', bodyTitles);
      renderElements(weekdayData);
      bodyContainer.insertAdjacentHTML('beforeend', addExerciseButtonElement);
      const addExerciseButton = document.querySelector(
        '.exercise-add-button-wrapper'
      );
      addExerciseButtonEventListener(addExerciseButton);
    });
  }

  function deleteExerciseButtonEventListener(
    deleteExerciseButton,
    exerciseIndex
  ) {
    deleteExerciseButton.addEventListener('click', async () => {
      const shallDelete = await DeleteDialog(DELETE_DIALOG_STRINGS.EXERCISE);
      if (shallDelete) {
        //database change
        const weekdayData = weekdaysData.filter(
          (weekdayData) => weekdayData.day === day
        )[0];

        const updatedWeekdayExercisesData = weekdayData.exercises.filter(
          (weekdayExercise, index) => index !== exerciseIndex
        );
        weekdayData.exercises = updatedWeekdayExercisesData;
        if (!weekdayData.exercises.length) {
          delete weekdayData.exercises;
        }

        const index = weekdaysData.findIndex((weekDay) => weekDay.day === day);
        const updatedWeekdaysData = [
          ...weekdaysData.slice(0, index),
          weekdayData,
          ...weekdaysData.slice(index + 1)
        ];

        weeksData[selectedDate] = updatedWeekdaysData;
        myStorage.setItem('weeks', JSON.stringify(weeksData));

        //ui change
        bodyContainer.innerHTML = '';
        bodyContainer.insertAdjacentHTML('beforeend', bodyTitles);
        renderElements(weekdayData);
        bodyContainer.insertAdjacentHTML('beforeend', addExerciseButtonElement);
        const addExerciseButton = document.querySelector(
          '.exercise-add-button-wrapper'
        );
        addExerciseButtonEventListener(addExerciseButton);
      }
    });
  }

  function addExerciseDropdownInputEventListener(
    exerciseDropdownInputElement,
    exerciseDropdownElement,
    exerciseIndex
  ) {
    exerciseDropdownInputElement.addEventListener('input', saveValueToDatabase);
    exerciseDropdownInputElement.addEventListener(
      'blur',
      hideInputFieldIfEmpty
    );
    function saveValueToDatabase(event) {
      const customExerciseNameValue = event.target.value;
      safeExerciseInputToDatabase(
        'customExerciseName',
        customExerciseNameValue,
        exerciseIndex
      );
    }
    function hideInputFieldIfEmpty(event) {
      if (event.target.value == '') {
        toggleField(exerciseDropdownInputElement, exerciseDropdownElement);
        exerciseDropdownElement.focus();
        exerciseDropdownElement.selectedIndex = '0';
        safeExerciseInputToDatabase('name', '', exerciseIndex);
      }
    }
  }

  function addExerciseDropdownEventListener(
    exerciseDropdownElement,
    exerciseOptions,
    exerciseIndex,
    exerciseDropdownInputElement
  ) {
    exerciseDropdownElement.addEventListener('change', (event) => {
      const exerciseInput = event.target.value;
      safeExerciseInputToDatabase('name', exerciseInput, exerciseIndex);

      // handle case that user selects own input option
      if (event.target.value == 'customExercise') {
        toggleField(exerciseDropdownElement, exerciseDropdownInputElement);
        exerciseDropdownInputElement.focus();
      }
    });
  }

  function addSetDropdownEventListener(setDropdownElement, exerciseIndex) {
    setDropdownElement.addEventListener('change', (event) => {
      const selectedSetValue = Number(event.target.value);
      safeExerciseInputToDatabase('sets', selectedSetValue, exerciseIndex);
    });
  }

  function addRepDropdownEventListener(repDropdownElement, exerciseIndex) {
    repDropdownElement.addEventListener('change', (event) => {
      const selectedRepValue = Number(event.target.value);
      safeExerciseInputToDatabase('reps', selectedRepValue, exerciseIndex);
    });
  }

  function addWeightInputFieldEventListener(
    weightInputFieldElement,
    exerciseIndex
  ) {
    weightInputFieldElement.addEventListener(
      'input',
      debounce(weightInputFieldEventListener)
    );
    function weightInputFieldEventListener(event) {
      const weightInputValue = event.target.value;
      safeExerciseInputToDatabase('weight', weightInputValue, exerciseIndex);
    }
  }

  function addNotesInputFieldEventListener(
    notesInputFieldElement,
    exerciseIndex
  ) {
    notesInputFieldElement.addEventListener(
      'input',
      debounce(notesInputFieldEventListener)
    );
    function notesInputFieldEventListener(event) {
      const notesInputValue = event.target.value;
      safeExerciseInputToDatabase('notes', notesInputValue, exerciseIndex);
    }
  }

  function safeExerciseInputToDatabase(key, value, exerciseIndex) {
    const weekdayData = weekdaysData.filter(
      (weekdayData) => weekdayData.day === day
    )[0];
    const updatedWeekdayExercisesData = weekdayData.exercises.map(
      (weekdayExercise, index) => {
        if (index === exerciseIndex) {
          const updatedExercise = { ...weekdayExercise, [key]: value };
          if (updatedExercise.name !== 'customExercise') {
            delete updatedExercise.customExerciseName;
          }
          return updatedExercise;
        }
        return weekdayExercise;
      }
    );
    weekdayData.exercises = updatedWeekdayExercisesData;
    const index = weekdaysData.findIndex((weekDay) => weekDay.day === day);
    const updatedWeekdaysData = [
      ...weekdaysData.slice(0, index),
      weekdayData,
      ...weekdaysData.slice(index + 1)
    ];

    weeksData[selectedDate] = updatedWeekdaysData;
    myStorage.setItem('weeks', JSON.stringify(weeksData));
  }
};
