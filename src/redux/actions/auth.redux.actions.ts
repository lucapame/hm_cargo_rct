import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  browserLocalPersistence,
  sendPasswordResetEmail,
  setPersistence,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';

import { UserType, UserProfile } from '../../types/User.t';
import { auth } from '../../resources/firebase/firebase';
import { mapErrorCodeToMessage } from '../../utils/helpers';

export const userLogin = createAsyncThunk(
  'user/login',
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue },
  ) => {
    return setPersistence(auth, browserLocalPersistence)
      .then(() => {
        return signInWithEmailAndPassword(auth, email, password);
      })
      .then(async (data) => {
        const isAdmin = await data.user
          .getIdTokenResult()
          .then((token: any) => {
            if (token.claims.admin) {
              return true;
            }
            return false;
          })
          .catch((err: any) => {
            rejectWithValue(err);
            return false;
          });

        const user: UserType = {
          uid: data.user.uid,
          displayName: data.user.displayName,
          email: data.user.email,
          emailVerified: data.user.emailVerified,
          isAnonymous: data.user.isAnonymous,
          phoneNumber: data.user.phoneNumber,
          photoURL: data.user.photoURL,
          isAdmin: isAdmin,
        };
        return user;
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        return rejectWithValue(mapErrorCodeToMessage(errorCode));
      });
  },
);

export const userUpdate = createAsyncThunk(
  'user/update',
  async (userData: UserProfile, { rejectWithValue }) => {
    return updateProfile(auth.currentUser as any, userData)
      .then(async () => {
        const currentUser = auth.currentUser as any;

        const user: UserType = {
          uid: currentUser.uid,
          displayName: currentUser.displayName,
          email: currentUser.email,
          emailVerified: currentUser.emailVerified,
          isAnonymous: currentUser.isAnonymous,
          phoneNumber: currentUser.phoneNumber,
          photoURL: currentUser.photoURL,
        };
        return user;
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        console.log(error);
        return rejectWithValue(mapErrorCodeToMessage(errorCode));
      });
  },
);

export const passwordReset = createAsyncThunk(
  'user/passwordReset',
  async (email: string, { rejectWithValue }) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        return true;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        return rejectWithValue(mapErrorCodeToMessage(errorCode));
        // ..
      });
  },
);
