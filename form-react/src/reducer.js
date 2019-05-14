const initialState = {
  eventUsers: [],
};
export default function eventForm(state = initialState, action) {
  switch (action.type) {
    case 'SIGNUP': {
      console.log('DISPATCHER');
      let userString = JSON.stringify(action.user);
      console.log(userString);
      let data = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: userString,
      };
      fetch('http://localhost:3001/eventUsers', data)
        .then(res => res.json())
        .then(data => {
          console.log(data);
          if (data.err) alert(data.err);
        });
      return { eventUsers: [...state.eventUsers, action.user] };
    }
    case 'FROMDB': {
      return { eventUsers: action.users };
    }
    default:
      return state;
  }
}
