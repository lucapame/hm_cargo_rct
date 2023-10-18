import React, { useEffect } from 'react';
import { useAppSelector } from '../../hooks/useReduxDispatch';
import useAuthState from '../../hooks/useAuthState';
import { useNavigate } from 'react-router';

export const withGuard = (Component: React.ComponentType<any>) => {
  const GuardedComponent = (props: any) => {
    const { isAutenticated } = useAppSelector((state) => state.auth);
    const pending = useAuthState();
    const navigate = useNavigate(); // const pending =
    useEffect(() => {
      if (!pending && !isAutenticated) {
        navigate('/login');
      } else if (!pending && isAutenticated) {
        navigate('/');
      }

      console.log(isAutenticated);
    }, [pending, isAutenticated, navigate]);

    if (pending) {
      return <div>Loading...</div>;
    }

    return <Component {...props} />;
  };

  GuardedComponent.displayName = `withGuard(${
    Component.displayName || Component.name || 'Component'
  })`;

  return GuardedComponent;
};
