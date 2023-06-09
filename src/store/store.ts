import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth';
import { uiSlice } from './ui';
import { sendSlice } from '.';

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        ui: uiSlice.reducer,
        send: sendSlice.reducer
    },
    devTools: import.meta.env.NODE_ENV === 'development'
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
