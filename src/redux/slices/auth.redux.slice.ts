import { createSlice } from '@reduxjs/toolkit';
import { signOut } from 'firebase/auth';
import { UserType } from '../../types/User.t';
import { auth } from '../../resources/firebase/firebase';
import {
  passwordReset,
  userLogin,
  userUpdate,
} from '../actions/auth.redux.actions';

type AuthStateState = {
  loading: boolean;
  userInfo: UserType;
  error: string | null;
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
  reducers: {
    setUser: (state, action) => {
      state.userInfo = action.payload;
      state.isAutenticated = true;
      state.success = true;
      state.isAdmin = action.payload.isAdmin;
    },
    logout: (state) => {
      signOut(auth);
      state.userInfo = {} as UserType;
      state.isAutenticated = false;
      state.success = false;
    },
  },
  extraReducers: {
    // login user
    [userLogin.pending as any]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [userLogin.fulfilled as any]: (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload;
      state.success = true;
      state.isAutenticated = true;
      state.isAdmin = payload.isAdmin;
    },
    [userLogin.rejected as any]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.isAutenticated = false;
      state.success = false;
    },
    // Update user
    [userUpdate.pending as any]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [userUpdate.fulfilled as any]: (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload;
      state.success = true;
    },
    [userUpdate.rejected as any]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.success = payload;
    },
    // Reset password
    [passwordReset.pending as any]: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    [passwordReset.fulfilled as any]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
    },
    [passwordReset.rejected as any]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.success = false;
    },
  },
});
export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
