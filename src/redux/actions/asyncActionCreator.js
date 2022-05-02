export const asyncActionCreator = (obj, api, req) => async dispatch => {
  dispatch(obj.pending());
  try {
    const data = req ? await api(req) : await api();
    dispatch(obj.fulfilled(data));
  } catch (err) {
    dispatch(obj.rejected(err));
  }
};
