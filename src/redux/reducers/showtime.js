const initialState = {
  results: null,
  location: null,
  errorMsg: ''
}

const showtimeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOWTIME': {
      return {
        ...state,
        results: action.payload
      }
    }
    case 'LIST_CINEMA_LOCATION': {
      return {
        ...state,
        location: action.payload
      }
    }
    case 'SET_SHOWTIME_MESSAGE': {
      return {
        ...state,
        errorMsg: action.payload
      }
    }
    default: {
      return {
        ...state
      }
    }
  }
}

export default showtimeReducer
