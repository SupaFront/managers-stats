import axios from 'axios';

const path = { notes: 'notes' };

export const UploadNote = async note => {
  try {
    const { data } = await axios.post(path.notes, note);
    return data;
  } catch (error) {
    const err = { ...error.response.data.message, status: error.response.status };
    throw err;
  }
};

export const getNotesList = async dates => {
  try {
    const { data } = await axios.get(path.notes, dates ? { params: { dates } } : null);
    return data;
  } catch (error) {
    const err = { ...error.response.data.message, status: error.response.status };
    throw err;
  }
};

export const removeNote = async ({ _id }) => {
  try {
    await axios.delete(path.notes + '/' + _id);
    return _id;
  } catch (error) {
    const err = { ...error.response.data.message, status: error.response.status };
    throw err;
  }
};

export const editNote = async props => {
  const { _id, owner, createdAt, updatedAt, ...info } = props;
  try {
    const { data } = await axios.put(path.notes + '/' + _id, info);
    return data;
  } catch (error) {
    const err = { ...error.response.data.message, status: error.response.status };
    throw err;
  }
};
