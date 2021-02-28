import http from '../../helpers/http';

export const cinemaLocation = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: 'SET_SHOWTIME_MESSAGE',
        payload: '',
      });
      const response = await http().get('cinemas/location');
      dispatch({
        type: 'LIST_CINEMA_LOCATION',
        payload: response.data.results,
      });
    } catch (err) {
      const {message} = err.response.data;
      dispatch({
        type: 'SET_SHOWTIME_MESSAGE',
        payload: message,
      });
    }
  };
};

export const listCinemaLocation = (location) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: 'SET_SHOWTIME_MESSAGE',
        payload: '',
      });
      const data = new URLSearchParams();
      data.append('location', location);
      const response = await http().post('cinemas/cinemaLocation', data);
      dispatch({
        type: 'LIST_CINEMA',
        payload: response.data.results,
      });
    } catch (err) {
      const {message} = err.response.data;
      dispatch({
        type: 'SET_MESSAGE_SHOWTIME',
        payload: message,
      });
    }
  };
};

export const listShowtime = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: 'SET_SHOWTIME_MESSAGE',
        payload: '',
      });
      const response = await http().get(`showtimes/showtime/${id}`);
      dispatch({
        type: 'LIST_SHOWTIME',
        payload: response.data.results,
      });
    } catch (err) {
      const {message} = err.response.data;
      dispatch({
        type: 'SET_SHOWTIME_MESSAGE',
        payload: message,
      });
    }
  };
};

export const showtimeMovie = (date, location, idMovie) => {
  return async (dispatch) => {
    const data = new URLSearchParams();
    data.append('idMovie', idMovie);
    data.append('date', date);
    data.append('search', location);
    try {
      dispatch({
        type: 'SET_SHOWTIME_MESSAGE',
        payload: '',
      });
      const response = await http().post('showtimes/searchLocation', data);
      dispatch({
        type: 'SHOWTIME',
        payload: response.data.results,
      });
    } catch (err) {
      console.log(err);
      const {message} = err.response.data;
      dispatch({
        type: 'SET_SHOWTIME_MESSAGE',
        payload: message,
      });
    }
  };
};

export const createShowtime = (
  token,
  idMovie,
  showtimeDate,
  idCinema,
  showtime,
) => {
  return async (dispatch) => {
    try {
      const data = new URLSearchParams();
      data.append('idMovie', idMovie);
      data.append('showtimeDate', showtimeDate);
      idCinema.map((item) => data.append('idCinema', item));
      showtime.map((item) => data.append('showtime', item));
      const response = await http(token).post('showtimes', data);
      dispatch({
        type: 'CREATE_SHOWTIME',
        payload: response.data.success,
      });
    } catch (err) {
      const {message} = err.response.data;
      dispatch({
        type: 'SET_MESSAGE_SHOWTIME',
        payload: message,
      });
    }
  };
};
