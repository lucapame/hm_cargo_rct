'use client';
import react, { useEffect, useState } from 'react';
import { useAppDispatch } from './useReduxDispatch';
import { logout, setUser } from '../../redux/slices/auth.redux.slice';
import { auth } from '../../resources/firebase/firebase';

const useAuthState = () => {
  const [pending, setPending] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const isAdmin = await auth.currentUser
          ?.getIdTokenResult()
          .then((token) => {
            if (token.claims.admin) {
              return true;
            }
            return false;
          })
          .catch((err) => {
            return false;
          });

        // user is logged in, send the user's details to redux, store the current user in the state
        dispatch(
          setUser({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
            photoURL: userAuth.photoURL,
            isAdmin: isAdmin,
          }),
        );
      } else {
        dispatch(logout());
      }
      setPending(false);
    });
  }, []);

  return pending;
};

export default useAuthState;
