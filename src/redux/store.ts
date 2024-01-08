import { configureStore } from '@reduxjs/toolkit';
import authReduxSlice from './slices/auth.redux.slice';
import trucksReduxSlice from './slices/truck.redix.slice';

export const store = configureStore({
  reducer: {
    auth: authReduxSlice,
    trucks: trucksReduxSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
