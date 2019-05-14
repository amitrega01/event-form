import { stat } from 'fs';

const initialState = {
  eventUsers: [],
};
export default function eventForm(state = initialState, action) {
  switch (action.type) {
    case 'SIGNUP': {
      console.log('HELLo');
      return { eventUsers: [...state.eventUsers, action.user] };
    }
  }
  return state;
}
