import React from 'react';
import { withGuard } from '../../components/routes/withGuard.component';
import logo from '../../assets/img/cargo.svg';

import {
  Content,
  Layout,
  Sidebar,
} from '../../components/layout/styled.layout';
import { Outlet } from 'react-router-dom';
import NavLinkExtendable from '../../components/common/component.NavLink';
import { logout } from '../../redux/slices/auth.redux.slice';
import { useAppDispatch } from '../../utils/hooks/useReduxDispatch';

const HomePage = () => {
  const dispatch = useAppDispatch();

  return (
    <Layout>
      <Sidebar className='d-flex flex-column align-items-center p-4'>
        <img
          src={logo}
          alt='logo'
          className='img-fluid mb-5'
          width={70}
        />

        <NavLinkExtendable
          label='Inicio'
          to='/'
          icon='fa-solid fa-home'
        ></NavLinkExtendable>

        <NavLinkExtendable
          label='Partes'
          to='/parts'
          icon='fa-solid fa-box'
          secondaryLinks={[
            {
              to: '/inventory',
              label: 'Inventario',
              icon: 'fa-solid fa-clipboard-list',
            },
          ]}
        ></NavLinkExtendable>

        <NavLinkExtendable
          label='Camiones'
          to='/trucks'
          icon='fa-solid fa-truck'
          secondaryLinks={[
            {
              to: '/truck-list',
              label: 'Choferes',
              icon: 'fa-solid fa-truck-front',
            },
            {
              to: '/maintenences',
              label: 'Mantenimientos',
              icon: 'fa-solid fa-tools',
            },
          ]}
        ></NavLinkExtendable>

        <NavLinkExtendable
          label='Usuarios'
          to='/users'
          icon='fa-solid fa-user'
        ></NavLinkExtendable>

        <NavLinkExtendable
          label='Archivos'
          to='/files'
          icon='fa-solid fa-file'
          secondaryLinks={[
            {
              to: '/file-list',
              label: 'Lista de archivos',
              icon: 'fa-solid fa-file-alt',
            },
          ]}
        ></NavLinkExtendable>

        <button
          onClick={() => dispatch(logout())}
          className='btn btn-gray5 btn-sm mt-auto w-100 align-self-end'
        >
          <i className='fa-solid fa-sign-out me-2'></i>
          Cerrar sesión
        </button>
      </Sidebar>
      <Content className='bg-blue'>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default withGuard(HomePage);
