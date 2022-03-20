export const asyncActionCreator = (obj, api, req) => async dispatch => {
  dispatch(obj.pending());

  try {
    const data = await api(req);
    console.log(data);
    dispatch(obj.fulfilled(data));
  } catch (err) {
    dispatch(obj.rejected(err));
    console.log(err);
  }
};
