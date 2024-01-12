import React from 'react';
import { NavLink } from 'react-router-dom';

const links = [
  { name: 'Inicio', path: '/', icon: 'fa-solid fa-house' },
  { name: 'Partes', path: '/parts', icon: 'fa-solid fa-box-open' },
  {
    name: 'Inventario',
    path: '/inventory',
    icon: 'fa-solid fa-boxes',
  },
  { name: 'Camiónes', path: '/trucks', icon: 'fa-solid fa-truck' },
  {
    name: 'Servicios',
    path: '/maintenences',
    icon: 'fa-solid fa-tools',
  },

  { name: 'Usuarios', path: '/users', icon: 'fa-solid fa-users' },
  { name: 'Archivos', path: '/files', icon: 'fa-solid fa-file' },
];

const MainNavigation = () => {
  return (
    <div className='border-top border-bottom sticky-top bg-white'>
      <div className='container-xl'>
        <div className='row row-cols-auto'>
          {links.map((link) => (
            <div className='col  px-1 p-0' key={link.name}>
              <NavLink
                to={link.path}
                className={({ isActive, isPending }) =>
                  isActive || isPending
                    ? 'nav-link border-bottom border-primary border-2 text-primary py-3  mx-3'
                    : 'nav-link text-dark mx-3 py-3 text-center'
                }
              >
                <div className='d-flex align-items-center text-gray400'>
                  <i className={`${link.icon} pe-2`} />
                  <span className='text-gray-400'>{link.name}</span>
                </div>
              </NavLink>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainNavigation;
