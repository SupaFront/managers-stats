import axios from 'axios';
import Notiflix from 'notiflix';

axios.defaults.baseURL = 'http://localhost:3000/api/';

const path = {
  register: 'users/register',
  login: 'users/login',
  logout: 'users/logout',
  current: 'users/current',
  all: 'users',
};

export const registerUser = async user => {
  try {
    const { data } = await axios.post(path.register, user);
    return data;
  } catch (error) {
    const err = { ...error.response.data.message, status: error.response.status };
    throw err;
  }
};

export const loginUser = async user => {
  try {
    const { data } = await axios.post(path.login, user);
    return data;
  } catch (error) {
    const err = { ...error.response.data.message, status: error.response.status };
    throw err;
  }
};

export const logoutUser = async () => {
  try {
    await axios.post(path.logout);
    return 'success';
  } catch (error) {
    const err = { ...error.response.data.message, status: error.response.status };
    throw err;
  }
};

export const getCurrentUser = async () => {
  try {
    const { data } = await axios.get(path.current);
    return data;
  } catch (error) {
    const err = { ...error.response.data.message, status: error.response.status };
    throw err;
  }
};

export const getManagers = async () => {
  try {
    const { data } = await axios.get(path.all);
    return data;
  } catch (error) {
    const err = { ...error.response.data.message, status: error.response.status };
    throw err;
  }
};
