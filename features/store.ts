import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer } from "redux-persist";
import { loginapiSlice } from "./api/loginapiSlice";
import { getregisterapiSlice } from "./api/getregisterapiSlice";
import { registerapiSlice } from "./api/registerapiSlice";

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
        [loginapiSlice.reducerPath]: loginapiSlice.reducer,
        [getregisterapiSlice.reducerPath]: getregisterapiSlice.reducer,
        [registerapiSlice.reducerPath]: registerapiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(loginapiSlice.middleware).concat(getregisterapiSlice.middleware).concat(registerapiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>

export default store;