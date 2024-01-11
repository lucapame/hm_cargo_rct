import React, { useCallback, useEffect } from 'react';
import { useLocation, useMatch, useNavigate } from 'react-router';
import {
  DropdownContainer,
  NavLinkButton,
  SecondaryNavLinkButton,
} from '../layout/styled.layout';
import { Link } from 'react-router-dom';
import { set } from 'react-hook-form';

interface SecondaryLink {
  to: string;
  label: string;
  icon?: string;
}

interface ButtonLinkProps {
  to: string;
  label: string;
  secondaryLinks?: SecondaryLink[];
  icon?: string;
}

function NavLinkExtendable({
  to,
  label,
  secondaryLinks = [],
  icon = '',
}: ButtonLinkProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = location.pathname === to;
  const secondaryIsActive = secondaryLinks.some(
    (link) => link.to === location.pathname,
  );

  const [isExpanded, setIsExpanded] = React.useState(false);

  const handleclick = useCallback(() => {
    setIsExpanded(true);
    secondaryLinks.length === 0 && navigate(to);
  }, [navigate, secondaryLinks.length, to]);

  return (
    <div
      className={` ${
        isActive || secondaryIsActive ? '' : ''
      } border-0 card w-100 m-2 bg-none pb-2`}
    >
      <div
        className='d-flex align-items-center'
        style={{ cursor: 'pointer' }}
      >
        <span className='nav-link-icon d-md-none d-lg-inline-block'>
          <i className={icon + ' me-2'}></i>
        </span>
        <span className='nav-link-title'>{label}</span>
        {secondaryLinks.length > 0 && (
          <i className='fa-solid fa-chevron-down ps-2 fa-xs' />
        )}
      </div>

      {isExpanded && secondaryLinks.length > 0 && (
        <DropdownContainer className='d-flex flex-column  align-items-start w-100'>
          {secondaryLinks.map((link, index) => (
            <SecondaryNavLinkButton
              onClick={() => setIsExpanded(false)}
              key={index}
              to={link.to}
              className={({ isActive, isPending }) =>
                isActive ? 'active' : ''
              }
            >
              <i className={link.icon + ' me-2'}></i>
              <span className=''> {link.label}</span>
            </SecondaryNavLinkButton>
          ))}
        </DropdownContainer>
      )}
    </div>
  );
}

export default NavLinkExtendable;
