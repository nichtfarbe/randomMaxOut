export const WEEKDAYS = ['MO', 'DI', 'MI', 'DO', 'FR', 'SA', 'SO'];
export const ADD_SESSION_BUTTON_LABEL = '+Einheit';
export const ADDED_SESSION_CARD_LABEL =
  'Klick hier, um die Session zu bearbeiten.';
export const DELETE_SESSION_BUTTON_LABEL = 'Löschen';
export const ADD_BUTTON_LABEL = 'Hinzufügen';

export const DELETE_DIALOG_STRINGS = {
  EXERCISE: 'Du bist im Begriff, eine Übung zu löschen.',
  SESSION_RESTDAY: 'Du bist im Begriff, eine Trainingseinheit zu löschen.',
  SESSION:
    'Du bist im Begriff, eine Trainingseinheit zu löschen. Damit gehen auch alle Übungen dieses Trainingstages verloren.'
};

export const SESSIONS = {
  snatch: {
    title: 'Reißen',
    text: `Klicke hier, um eine Einheit mit Schwerpunkt
            <strong>Reißen</strong> hinzuzufügen.`,
    exercises: {
      snatch: 'Reißen',
      powerSnatch: 'Standreißen',
      snatchDrop: 'Unterhocken',
      snatchBalance: 'Hocke Senken',
      hangSnatch: 'Reißen aus dem Hang'
    }
  },
  clean: {
    title: 'Umsetzen + Stoßen',
    text: `Klicke hier, um eine Einheit mit dem Schwerpunkt
            <strong>Umsetzen + Stoßen</strong> hinzuzufügen.`,
    exercises: {
      clean: 'Umsetzen',
      powerClean: 'Standumsetzen',
      cleanAndJerk: 'Stoßen',
      splitJerk: 'Ausstoßen',
      hangClean: 'Umsetzen aus dem Hang'
    }
  },
  accessorie: {
    title: 'Accessories',
    text: `Klicke hier, um eine Einheit mit dem Schwerpunkt
            <strong>Accessories</strong> hinzuzufügen.`,
    exercises: {
      backSquat: 'Kniebeuge hinten',
      frontSquat: 'Kniebeuge vorne',
      pushPress: 'Schwungdrücken',
      pullUp: 'Klimmzüge'
    }
  },
  restday: {
    title: 'Restday',
    text: `Klicke hier, um einen <strong>Restday</strong> hinzuzufügen.`
  }
};

export const SET_OPTIONS = [1, 2, 3, 4, 5, 6];
export const REP_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
