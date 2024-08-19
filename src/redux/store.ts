import { configureStore } from '@reduxjs/toolkit';
import authReduxSlice from './slices/auth.redux.slice';
import trucksReduxSlice from './slices/truck.redix.slice';
import partsReduxSlice from './slices/parts.redux.slice';
import maintenance from './slices/maintenances.redux.slice';

export const store = configureStore({
  reducer: {
    auth: authReduxSlice,
    trucks: trucksReduxSlice,
    parts: partsReduxSlice,
    maintenance: maintenance,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
