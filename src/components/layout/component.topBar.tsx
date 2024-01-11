import React from 'react';
import logo from '../../assets/img/cargo.svg';
import {
  useAppDispatch,
  useAppSelector,
} from '../../utils/hooks/useReduxDispatch';
import { logout } from '../../redux/slices/auth.redux.slice';

const TopBar = () => {
  const { userInfo } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  return (
    <header className='navbar'>
      <div className='container-xl'>
        <h1 className='navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3'>
          <a href='.'>
            <img
              src={logo}
              width='110'
              height='32'
              alt='Tabler'
              className='navbar-brand-image'
            />
          </a>
        </h1>
        <div className='navbar-nav flex-row order-md-last'>
          <div className='nav-item dropdown'>
            <div
              className='nav-link d-flex lh-1 text-reset p-0'
              aria-label='Open user menu'
            >
              <span className='avatar avatar-sm'></span>
              <div className='d-none d-xl-block ps-2'>
                <div>{userInfo.displayName}</div>
                <div
                  className='mt-1 small text-secondary selectable'
                  onClick={() => dispatch(logout())}
                >
                  <i className='fas fa-sign-out-alt pe-1' />
                  Salir
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
