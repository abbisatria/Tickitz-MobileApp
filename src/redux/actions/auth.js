import jwt from 'jwt-decode'
import http from '../../helpers/http'

export const login = (email, password) => {
  return async dispatch => {
    const params = new URLSearchParams()
    params.append('email', email)
    params.append('password', password)
    try {
      dispatch({
        type: 'SET_AUTH_MESSAGE',
        payload: ''
      })
      const results = await http().post('auth/login', params)
      const token = results.data.results.token
      const user = jwt(token)
      dispatch({
        type: 'LOGIN',
        payload: token,
        user: user
      })
    } catch (err) {
      const { message } = err.response.data
      dispatch({
        type: 'SET_AUTH_MESSAGE',
        payload: message
      })
    }
  }
}

export const signUp = (username, email, password) => {
  return async dispatch => {
    const params = new URLSearchParams()
    params.append('username', username)
    params.append('email', email)
    params.append('password', password)
    try {
      dispatch({
        type: 'SET_AUTH_MESSAGE',
        payload: ''
      })
      const results = await http().post('auth/register', params)
      dispatch({
        type: 'SIGN_UP',
        payload: results.data.message
      })
    } catch (err) {
      const { message } = err.response.data
      dispatch({
        type: 'SET_AUTH_MESSAGE',
        payload: message
      })
    }
  }
}

export const forgotPassword = (email) => {
  return async dispatch => {
    const params = new URLSearchParams()
    params.append('email', email)
    try {
      dispatch({
        type: 'SET_AUTH_MESSAGE',
        payload: ''
      })
      const results = await http().post('auth/forgotPassword', params)
      dispatch({
        type: 'FORGOT_PASSWORD',
        payload: results.data.message
      })
    } catch (err) {
      const { message } = err.response.data
      dispatch({
        type: 'SET_AUTH_MESSAGE',
        payload: message
      })
    }
  }
}

export const updateProfile = (token, id, firstname, lastname, phoneNumber, email, password, file) => {
  return async dispatch => {
    const data = new FormData()
    if(firstname !== '') {
      data.append('firstname', firstname)
    } 
    if(lastname !== '') {
      data.append('lastname', lastname)
    } 
    if(phoneNumber !== '') {
      data.append('phoneNumber', phoneNumber)
    } 
    if(email !== '') {
      data.append('email', email)
    } 
    if(password !== '') {
      data.append('password', password)
    }
    if(file !== null) {
      data.append('image', file)
    }
    try {
      dispatch({
        type: 'SET_AUTH_MESSAGE',
        payload: ''
      })
      const results = await http(token).patch(`users/updateProfile/${id}`, data)
      dispatch({
        type: 'UPDATE_PROFILE',
        payload: results.data.results
      })
    } catch (err) {
      const { message } = err.response.data
      dispatch({
        type: 'SET_AUTH_MESSAGE',
        payload: message
      })
    }
  }
}

export const logout = () => ({
  type: 'LOGOUT'
})
