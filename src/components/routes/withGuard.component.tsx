import React, { useEffect } from 'react';
import { useAppSelector } from '../../utils/hooks/useReduxDispatch';
import useAuthState from '../../utils/hooks/useAuthState';
import { useNavigate } from 'react-router'; // Import Outlet from react-router

export const withGuard = (Component: React.ComponentType<any>) => {
  const GuardedComponent = (props: any) => {
    const { isAutenticated } = useAppSelector((state) => state.auth);
    const pending = useAuthState();
    const navigate = useNavigate();

    useEffect(() => {
      if (!pending && !isAutenticated) {
        navigate('/login');
      }
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
