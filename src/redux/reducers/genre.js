const initialState = {
  results: null,
  success: null,
  errorMsg: '',
};

const genreReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LIST_ALL_GENRE': {
      return {
        ...state,
        results: action.payload,
      };
    }
    case 'CREATE_GENRE': {
      return {
        ...state,
        success: action.payload,
      };
    }
    case 'SET_MESSAGE_GENRE': {
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

export default genreReducer;
