import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/api/';

const path = {
  register: 'users/register',
  login: 'users/login',
  logout: 'users/logout',
  current: 'users/current',
  all: 'users/',
};

export const registerUser = async user => {
  try {
    const { data } = await axios.post(path.register, user);
    return data;
  } catch (err) {
    throw err.message;
  }
};

export const loginUser = async user => {
  try {
    const { data } = await axios.post(path.login, user);
    return data;
  } catch (err) {
    throw err.message;
  }
};

export const logoutUser = async () => {
  try {
    await axios.post(path.logout);
    return 'success';
  } catch (err) {
    throw err.message;
  }
};

export const getCurrentUser = async () => {
  try {
    const { data } = await axios.get(path.current);
    return data;
  } catch (err) {
    throw err.message;
  }
};

export const getManagers = async () => {
  try {
    const { data } = await axios.get(path.all);
    return data;
  } catch (err) {
    throw err.message;
  }
};
