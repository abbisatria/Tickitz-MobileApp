import http from '../../helpers/http';

export const nowShowing = (search, page, limit, sort, order) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: 'SET_MOVIE_MESSAGE',
        payload: '',
      });
      const response = await http().get(
        `movies/movieNowShowing?search=${search ? search : ''}&limit=${
          limit ? limit : 5
        }&page=${page ? page : 1}&sort=${sort ? sort : 'id'}&order=${
          order ? order : 'ASC'
        }`,
      );
      dispatch({
        type: 'NOW_SHOWING',
        payload: response.data.results,
        pageInfo: response.data.pageInfo,
      });
    } catch (err) {
      const {message} = err.response.data;
      dispatch({
        type: 'SET_MOVIE_MESSAGE',
        payload: message,
      });
    }
  };
};

export const upComing = (month, search, page, limit, sort, order) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: 'SET_MOVIE_MESSAGE',
        payload: '',
      });
      const response = await http().get(
        `movies/upComing?month=${month ? month : ''}&search=${
          search ? search : ''
        }&limit=${limit ? limit : 5}&page=${page ? page : 1}&sort=${
          sort ? sort : 'id'
        }&order=${order ? order : 'ASC'}`,
      );
      dispatch({
        type: 'UP_COMING',
        payload: response.data.results,
        pageInfo: response.data.pageInfo,
      });
    } catch (err) {
      const {message} = err.response.data;
      dispatch({
        type: 'SET_MOVIE_MESSAGE',
        payload: message,
      });
    }
  };
};

export const detailMovie = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: 'SET_MOVIE_MESSAGE',
        payload: '',
      });
      const response = await http().get(`movies/${id}`);
      dispatch({
        type: 'DETAIL_MOVIE',
        payload: response.data.results,
      });
    } catch (err) {
      const {message} = err.response.data;
      dispatch({
        type: 'SET_MOVIE_MESSAGE',
        payload: message,
      });
    }
  };
};

export const createMovie = (
  token,
  name,
  genre,
  file,
  releaseDate,
  category,
  duration,
  directed,
  casts,
  description,
) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: 'SET_MOVIE_MESSAGE',
        payload: '',
      });
      const data = new FormData();
      data.append('name', name);
      if (file !== null) {
        data.append('image', file);
      }
      data.append('releaseDate', releaseDate);
      data.append('category', category);
      data.append('directed', directed);
      data.append('duration', duration);
      data.append('casts', casts);
      data.append('description', description);
      genre.map((item) => data.append('idGenre', item));
      const response = await http(token).post('movies', data);
      dispatch({
        type: 'CREATE_MOVIE',
        payload: response.data.results,
        success: response.data.success,
      });
    } catch (err) {
      const {message} = err.response.data;
      dispatch({
        type: 'SET_MESSAGE_MOVIE',
        payload: message,
      });
    }
  };
};
