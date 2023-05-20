import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { InitialStateSend, Link, OptionsSendFile } from '..';

const initialState = { options: {} as OptionsSendFile } as InitialStateSend;

export const sendSlice = createSlice({
    name: 'send',
    initialState,
    reducers: {
        onSetUploadFile: (
            state,
            { payload }: PayloadAction<InitialStateSend>
        ) => {
            state.name = payload.name;
            state.original_name = payload.original_name;
        },
        onSetUrl: (state, { payload }: PayloadAction<string>) => {
            state.url = payload;
        },
        onSetLink: (state, { payload }: PayloadAction<Link>) => {
            state.link = payload;
            state.loading = false;
        },
        onLoading: (state) => {
            state.loading = true;
        },
        onReset: (state) => {
            state.link = {} as Link;
            state.loading = false;
            state.name = '';
            state.options = {};
            state.original_name = '';
            state.url = '';
        },
        onSetPassword: (state, { payload }: PayloadAction<string>) => {
            state.options!.password = payload;
        },
        onSetDownloads: (state, { payload }: PayloadAction<string>) => {
            state.options!.downloads = payload;
        }
    }
});

export const {
    onSetUploadFile,
    onSetUrl,
    onSetLink,
    onReset,
    onSetPassword,
    onSetDownloads
} = sendSlice.actions;
//export const sendReducer = sendSlice.reducer
