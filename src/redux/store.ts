import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { 
  persistStore, 
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { fetchArticlesSlice } from './slices/fetchArticlesSlice';
import { addedArticlesSlice } from './slices/addedArticlesSlice';





const rootReducer = combineReducers({
	fetchArticles: fetchArticlesSlice.reducer,
	addedArticles: addedArticlesSlice.reducer
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['addedArticles']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);



const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
    })
});



export const persistor = persistStore(store);
export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;