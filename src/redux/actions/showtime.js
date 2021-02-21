import http from '../../helpers/http'

export const cinemaLocation = (location) => {
  return async dispatch => {
    try {
      dispatch({
        type: 'SET_SHOWTIME_MESSAGE',
        payload: message
      })
      const data = new URLSearchParams()
      data.append('location', location)
      const response = await http().post('cinemas/cinemaLocation', data)
      dispatch({
        type: 'LIST_CINEMA_LOCATION',
        payload: response.data.results
      })
    } catch(err) {
      const { message } = err.response.data
      dispatch({
        type: 'SET_SHOWTIME_MESSAGE',
        payload: message
      })
    }
  }
}

export const showtimeMovie = (date, location, idMovie) => {
  return async dispatch => {
    const data = new URLSearchParams()
    data.append('idMovie', idMovie)
    data.append('date', date)
    data.append('search', location)
    try {
      dispatch({
        type: 'SET_SHOWTIME_MESSAGE',
        payload: ''
      })
      const response = await http().post('showtimes/searchLocation', data)
      dispatch({
        type: 'SHOWTIME',
        payload: response.data.results
      })
    } catch(err) {
      console.log(err)
      const { message } = err.response.data
      dispatch({
        type: 'SET_SHOWTIME_MESSAGE',
        payload: message
      })
    }
  }
}