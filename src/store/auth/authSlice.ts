import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AuthResponse, InitialStateAuth, Messages, User } from '../interfaces';

const initialState = {
    status: 'checking'
} as InitialStateAuth;

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        onLogin: (state, { payload }: PayloadAction<AuthResponse>) => {
            state.user = payload.user;
            state.messages = payload.messages;
            state.status = 'authenticated';
        },
        onLogout: (state, { payload }: PayloadAction<Messages | undefined>) => {
            state.messages = payload ?? ({} as Messages);
            state.status = 'not-authenticated';
            state.user = {} as User;
        },
        onChecking: (state) => {
            state.status = 'checking';
        },
        onClearMessages: (state) => {
            state.messages = {} as Messages;
        },
        onSelectedPhoto: (state, { payload }: PayloadAction<string>) => {
            state.selected_profile = payload;
        },
        onSetPhoto: (state, { payload }: PayloadAction<string>) => {
            state.user.photo_profile = payload;
            state.loading = false;
        },
        onNotChecking: (state) => {
            state.status = 'not-authenticated';
        },
        onLoading: (state) => {
            state.loading = true;
        }
    }
});

export const {
    onLogin,
    onLogout,
    onChecking,
    onNotChecking,
    onSelectedPhoto,
    onSetPhoto,
    onLoading
} = authSlice.actions;
//export const authReducer = authSlice.reducer
