export const asyncActionCreator = (obj, api, req) => async dispatch => {
  dispatch(obj.pending());

  try {
    const data = await api(req);
    dispatch(obj.fulfilled(data));
  } catch (err) {
    dispatch(obj.rejected(err));
  }
};
