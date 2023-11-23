import { createSlice } from '@reduxjs/toolkit';

interface UserState {
    userInfo: {
        user: {
            name: any,
        },
    },
    isAuthenticated: Boolean,
    error: String,
    loginstatus: String,
};

const initialState: UserState = {
    userInfo: {
        user: {
            name: null,
        },
    },
    isAuthenticated: false,
    error: '',
    loginstatus: '',
};

export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        loginSuccess: (state: any, {payload}) => {
            state.userInfo = payload;
            state.isAuthenticated = true;
            state.error = '';
            state.loginstatus = 'Success';
        },
        loginError: (state, {payload}) => {
            state.error = payload;
            state.isAuthenticated = false;
            state.loginstatus = 'Failed';
        },
        loginStatus: (state, {payload}) => {
            state.loginstatus = payload;
        },
        logoutSuccess: (state, {payload}) => {
            state.userInfo = {
                user: {
                    name: payload,
                }
            };
            /*state.userInfo.user = {
                name: payload,
            };*/            
            state.isAuthenticated = false;
            state.error = '';
            state.loginstatus = '';
        },
        logoutError: (state, {payload}) => {
            state.error = payload
        },
    },
});

export const { loginSuccess, loginError, loginStatus, logoutSuccess, logoutError } = userSlice.actions;

export default userSlice.reducer;