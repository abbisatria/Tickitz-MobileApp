const initialState = {
  results: null,
  location: null,
  showtime: null,
  success: null,
  errorMsg: '',
};

const showtimeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOWTIME': {
      return {
        ...state,
        results: action.payload,
      };
    }
    case 'LIST_CINEMA': {
      return {
        ...state,
        results: action.payload,
      };
    }
    case 'CREATE_SHOWTIME': {
      return {
        ...state,
        success: action.payload,
      };
    }
    case 'LIST_CINEMA_LOCATION': {
      return {
        ...state,
        location: action.payload,
      };
    }
    case 'LIST_SHOWTIME': {
      return {
        ...state,
        showtime: action.payload,
      };
    }
    case 'SET_SHOWTIME_MESSAGE': {
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

export default showtimeReducer;
