const initialState = {
  eventUsers: [],
  popUp: {
    visible: false,
    message: 'Added successfully!',
  },
};
export default function eventForm(state = initialState, action) {
  switch (action.type) {
    case 'SIGNUP_OK': {
      return {
        eventUsers: [...state.eventUsers, action.user],
        popUp: {
          message: action.message,
          visible: true,
        },
      };
    }
    case 'SIGNUP_NOTOK': {
      return {
        ...state,
        popUp: {
          message: action.message,
          visible: true,
        },
      };
    }
    case 'FROMDB': {
      return { eventUsers: action.users, popUp: state.popUp };
    }
    case 'CLOSE_POPUP': {
      return {
        ...state,
        popUp: {
          ...state.popUp,
          visible: false,
        },
      };
    }
    default:
      return state;
  }
}
