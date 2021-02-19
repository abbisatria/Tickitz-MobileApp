import http from '../../helpers/http'

export const nowShowing = () => {
  return async dispatch => {
    try {
      dispatch({
        type: 'SET_MOVIE_MESSAGE',
        payload: ''
      })
      const response = await http().get('movies/movieNowShowing')
      dispatch({
        type: 'NOW_SHOWING',
        payload: response.data.results
      })
    } catch(err) {
      const { message } = err.response.data
      dispatch({
        type: 'SET_MOVIE_MESSAGE',
        payload: message
      })
    }
  }
}

export const upComing = () => {
  return async dispatch => {
    try {
      dispatch({
        type: 'SET_MOVIE_MESSAGE',
        payload: ''
      })
      const response = await http().get('movies/movieMonth')
      dispatch({
        type: 'UP_COMING',
        payload: response.data.results
      })
    } catch(err) {
      const { message } = err.response.data
      dispatch({
        type: 'SET_MOVIE_MESSAGE',
        payload: message
      })
    }
  }
}

export const detailMovie = (id) => {
  return async dispatch => {
    try {
      dispatch({
        type: 'SET_MOVIE_MESSAGE',
        payload: ''
      })
      const response = await http().get(`movies/${id}`)
      dispatch({
        type: 'DETAIL_MOVIE',
        payload: response.data.results
      })
    } catch(err) {
      const { message } = err.response.data
      dispatch({
        type: 'SET_MOVIE_MESSAGE',
        payload: message
      })
    }
  }
}
