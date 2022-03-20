import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { devToolsEnhancer } from '@redux-devtools/extension';
import thunk from 'redux-thunk';
import { opsReducer } from './reducers/opsReducer';
import { notesAsyncReducer } from './reducers/notesReducer';

const composedEnhancer = compose(applyMiddleware(thunk), devToolsEnhancer());

const rootReducer = combineReducers({
  ops: opsReducer,
  notes: notesAsyncReducer,
});
const store = createStore(rootReducer, composedEnhancer);

export default store;
