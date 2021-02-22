import http from '../../helpers/http'

export const cinemaLocation = () => {
  return async dispatch => {
    try {
      dispatch({
        type: 'SET_SHOWTIME_MESSAGE',
        payload: ''
      })
      const response = await http().get('cinemas/location')
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

export const listShowtime = (id) => {
  return async dispatch => {
    try {
      dispatch({
        type: 'SET_SHOWTIME_MESSAGE',
        payload: ''
      })
      const response = await http().get(`showtimes/showtime/${id}`)
      dispatch({
        type: 'LIST_SHOWTIME',
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