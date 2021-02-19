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

export const showtime = (date, search, idMovie) => {
  return async dispatch => {
    const params = new URLSearchParams()
    params.append('date', date)
    params.append('search', search)
    params.append('idMovie', idMovie)
    try {
      dispatch({
        type: 'SET_SHOWTIME_MESSAGE',
        payload: message
      })
      const response = await http().post('showtimes/searchLocation', params)
      dispatch({
        type: 'SHOWTIME',
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