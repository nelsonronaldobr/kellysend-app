import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InitialStateUI, Messages } from '..';

const initialState = {
    loading: true,
    profiles: [] as string[]
} as InitialStateUI;

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        onSetProfiles: (state, { payload }: PayloadAction<string[]>) => {
            state.profiles = payload;
            state.loading = false;
        },
        onLoading: (state) => {
            state.loading = true;
        },
        onSelectedPhoto: (state, { payload }: PayloadAction<string>) => {
            state.photo_profile = payload;
        },
        onSetMessages: (state, { payload }: PayloadAction<Messages>) => {
            state.messages = payload;
        },
        onClearMessages: (state) => {
            state.messages = {} as Messages;
        }
    }
});

export const { onSetProfiles, onLoading } = uiSlice.actions;
//export const uiReducer = uiSlice.reducer
