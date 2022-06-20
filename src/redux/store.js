import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { devToolsEnhancer } from '@redux-devtools/extension';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import { opsReducer } from './reducers/ops-reducer';
import { notesAsyncReducer } from './reducers/notes-reducer';
import { usersAsyncReducer } from './reducers/auth-reducer';

const composedEnhancer = compose(applyMiddleware(thunk), devToolsEnhancer());

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

const rootReducer = combineReducers({
  ops: opsReducer,
  notes: notesAsyncReducer,
  auth: persistReducer(authPersistConfig, usersAsyncReducer),
});
const store = createStore(rootReducer, composedEnhancer);
const persistor = persistStore(store);

export { store, persistor };
