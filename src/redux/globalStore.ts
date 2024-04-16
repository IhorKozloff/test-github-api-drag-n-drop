import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import userSlice from './slices/authSlice';
import issuesSlice from './slices/issuesSlice';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';

const userPersistConfig = {
    key: 'user',
    storage,
};

const issuesPersistConfig = {
    key: 'issues',
    storage,
};

const userPersistedReducer = persistReducer(userPersistConfig, userSlice);
const issuesPersistedReducer = persistReducer(issuesPersistConfig, issuesSlice);

export const globalStore = configureStore({
    reducer: {
        userStatus: userPersistedReducer,
        issues: issuesPersistedReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});
export const persistor = persistStore(globalStore);

export type RootState = ReturnType<typeof globalStore.getState>

export type AppDispatch = typeof globalStore.dispatch