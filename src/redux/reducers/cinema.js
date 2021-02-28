const initialState = {
  success: null,
  errorMsg: '',
};

const cinemaReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_CINEMA': {
      return {
        ...state,
        success: action.payload,
      };
    }
    case 'SET_MESSAGE_CINEMA': {
      return {
        ...state,
        errorMsg: action.payload,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default cinemaReducer;
