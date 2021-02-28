import http from '../../helpers/http';

export const listAllGenre = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: 'SET_MESSAGE_GENRE',
        payload: '',
      });
      const response = await http().get('genre/listAllGenre');
      dispatch({
        type: 'LIST_ALL_GENRE',
        payload: response.data.results,
      });
    } catch (err) {
      const {message} = err.response.data;
      dispatch({
        type: 'SET_MESSAGE_GENRE',
        payload: message,
      });
    }
  };
};

export const createGenre = (token, name) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: 'SET_MESSAGE_GENRE',
        payload: '',
      });
      const data = new URLSearchParams();
      data.append('name', name);
      const response = await http(token).post('genre', data);
      dispatch({
        type: 'CREATE_GENRE',
        payload: response.data.success,
      });
    } catch (err) {
      const {message} = err.response.data;
      dispatch({
        type: 'SET_MESSAGE_GENRE',
        payload: message,
      });
    }
  };
};
