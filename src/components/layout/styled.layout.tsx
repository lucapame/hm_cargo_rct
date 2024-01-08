import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const Layout = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 100vh;
`;

export const Sidebar = styled.div`
  flex: 0 0 240px;
  border-right: 1px solid #e5e5e5;
  background-color: #f0f1f6;
`;

export const Content = styled.div`
  flex: 1;
`;

export const NavLinkButton = styled(NavLink)`
  background-color: transparent;
  border: none;
  padding: 0.5rem 1rem;
  text-align: left;
  width: 100%;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  color: var(--color-gray);
  border-radius: 0.6rem;
  border-radius: 100px;

  &:hover {
    scale: 1.01;
    color: #000;
  }

  &.active {
    text-decoration: none;
    background-color: var(--color-primary);
  }
`;

export const SecondaryNavLinkButton = styled(NavLink)`
  background-color: transparent;
  border: none;
  padding: 0.5rem 1rem;
  text-align: left;
  width: 90%;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  color: var(--color-gray);
  border-radius: 0.8rem;

  font-size: small;

  &:hover {
    scale: 1.01;
    color: #000;
  }

  &.active {
    text-decoration: none;

    color: var(--color-primary);
  }
`;
