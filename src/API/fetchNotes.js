import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/api/';

const path = { notes: '/notes' };

export const UploadNote = async note => {
  try {
    const { data } = await axios.post(path.notes, note);
    return data;
  } catch (err) {
    throw err.message;
  }
};

export const getNotesList = async () => {
  try {
    const { data } = await axios.get(path.notes);
    return data;
  } catch (err) {
    throw err.message;
  }
};

export const removeNote = async ({ _id }) => {
  try {
    const { data } = await axios.delete(path.notes + '/' + _id);
    return _id;
  } catch (err) {
    throw err.message;
  }
};

export const editNote = async props => {
  const { id } = props;
  try {
    const { data } = await axios.put(path.notes + '/' + id, props);
    return data;
  } catch (err) {
    throw err.message;
  }
};
