import http from '../../helpers/http';

export const createCinema = (token, name, location, file, price, address) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_MESSAGE_CINEMA',
      payload: '',
    });
    try {
      const data = new FormData();
      data.append('name', name);
      data.append('location', location);
      data.append('image', file);
      data.append('price', price);
      data.append('address', address);
      const response = await http(token).post('cinemas', data);
      dispatch({
        type: 'CREATE_CINEMA',
        payload: response.data.success,
      });
    } catch (err) {
      const {message} = err.response.data;
      dispatch({
        type: 'SET_MESSAGE_CINEMA',
        payload: message,
      });
    }
  };
};
