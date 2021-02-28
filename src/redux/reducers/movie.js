const initialState = {
  nowShowing: null,
  upComing: null,
  detailMovie: null,
  pageInfoNowShowing: null,
  pageInfoUpComing: null,
  success: null,
  results: null,
  errorMsg: '',
};

const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NOW_SHOWING': {
      return {
        ...state,
        nowShowing: action.payload,
        pageInfoNowShowing: action.pageInfo,
      };
    }
    case 'UP_COMING': {
      return {
        ...state,
        upComing: action.payload,
        pageInfoUpComing: action.pageInfo,
      };
    }
    case 'DETAIL_MOVIE': {
      return {
        ...state,
        detailMovie: action.payload,
      };
    }
    case 'CREATE_MOVIE': {
      return {
        ...state,
        results: action.payload,
        success: action.success,
      };
    }
    case 'SET_MOVIE_MESSAGE': {
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

export default movieReducer;
