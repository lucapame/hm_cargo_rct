import React from 'react';
import logo from '../../assets/img/cargo.svg';

const PageLoader = () => {
  return (
    <div className='page page-center hv-100'>
      <div className='container container-slim py-4'>
        <div className='text-center'>
          <div className='mb-3'>
            <a
              href='.'
              className='navbar-brand navbar-brand-autodark'
            >
              <img src={logo} height='36' alt='' />
            </a>
          </div>
          <div className='text-secondary mb-3'>
            Cargando aplicación...
          </div>
          <div className='progress progress-sm'>
            <div className='progress-bar progress-bar-indeterminate'></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageLoader;
