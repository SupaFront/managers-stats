import axios from 'axios';

axios.defaults.baseURL = 'https://623128a805f5f4d40d749921.mockapi.io/api/managers/';

const path = { MANAGERS: '/managers' };

export const UploadNote = async note => {
  try {
    const { data } = await axios.post(path.MANAGERS, note);
    return data;
  } catch (err) {
    throw err.message;
  }
};

export const getNotesList = async () => {
  try {
    const { data } = await axios.get(path.MANAGERS);
    return data;
  } catch (err) {
    throw err.message;
  }
};

export const removeNote = async ({ id }) => {
  try {
    const { data } = await axios.delete(path.MANAGERS + '/' + id);
    return id;
  } catch (err) {
    throw err.message;
  }
};

export const editNote = async props => {
  const { id } = props;
  try {
    const { data } = await axios.put(path.MANAGERS + '/' + id, props);
    return data;
  } catch (err) {
    throw err.message;
  }
};
