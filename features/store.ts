import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer } from "redux-persist";

const persistConfig = {
    key: 'root',
    version: 1,
    storage: AsyncStorage,
};

const rootuserReducer = combineReducers({
    user: userReducer,
});

const user = persistReducer(persistConfig, rootuserReducer);

export const store = configureStore({
    reducer: {
        user: user,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
});

export type RootState = ReturnType<typeof store.getState>

export default store;