import { createSlice } from '@reduxjs/toolkit';
import { signOut } from 'firebase/auth';
import { UserType } from '../../types/User.t';

import {
  passwordReset,
  userLogin,
  userUpdate,
} from '../actions/auth.redux.actions';
import { auth } from '../../resources/firebase/firebase';

type AuthStateState = {
  loading: boolean;
  userInfo: UserType;
  error: string | any;
  isAutenticated: boolean;
  success: boolean;
  isAdmin: boolean;
};
const initialState: AuthStateState = {
  loading: false,
  userInfo: {} as UserType,
  error: null,
  isAutenticated: false,
  success: false,
  isAdmin: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: (create) => ({
    setUser: create.reducer<UserType>((state, action) => {
      state.userInfo = action.payload;
      state.isAutenticated = true;
      state.success = true;
      state.isAdmin = action.payload.isAdmin || false;
    }),

    logout: create.reducer((state) => {
      signOut(auth);
      state.userInfo = {} as UserType;
      state.isAutenticated = false;
      state.success = false;
    }),
  }),
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
      state.isAutenticated = true;
      state.success = true;
      state.isAdmin = action.payload.isAdmin ?? false;
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(userUpdate.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(userUpdate.fulfilled, (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
      state.isAutenticated = true;
      state.success = true;
      state.isAdmin = action.payload.isAdmin ?? false;
    });
    builder.addCase(userUpdate.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? null;
    });

    builder.addCase(passwordReset.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? null;
    });
  },
});
export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
