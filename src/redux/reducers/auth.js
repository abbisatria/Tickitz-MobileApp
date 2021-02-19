const initialState = {
  token: null,
  user: null,
  message: '',
  errorMsg: '',
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN': {
      return {
        ...state,
        token: action.payload,
        user: action.user
      }
    }
    case 'SIGN_UP': {
      return {
        ...state,
        message: action.payload
      }
    }
    case 'FORGOT_PASSWORD': {
      return {
        ...state,
        message: action.payload
      }
    }
    case 'UPDATE_PROFILE': {
      return {
        ...state,
        user: action.payload
      }
    }
    case 'LOGOUT': {
      return {
        ...state,
        token: null,
        user: null,
        message: '',
        errorMsg: ''
      }
    }
    case 'SET_AUTH_MESSAGE': {
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

export default authReducer