const INTIAL_STATE = {
  isSignedIn: null,
  userId: null,
};

export default (state = '', action) => {
  switch (action.type) {
    case 'GET_ANIME':
      return action.payload;
    default:
      return state;
  }
};
