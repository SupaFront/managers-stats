import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { devToolsEnhancer } from '@redux-devtools/extension';
import thunk from 'redux-thunk';

const initialState = {
  name: '',
  result: '',
  additional: '',
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'add':
      return { ...state, ...payload };

    case 'chooseName':
      return { ...state, ...payload };
    default:
      return { ...state };
  }
};

const composedEnhancer = compose(applyMiddleware(thunk), devToolsEnhancer());

const store = createStore(reducer, composedEnhancer);

export default store;
