import React, { useCallback, useEffect } from 'react';
import { useLocation, useMatch, useNavigate } from 'react-router';
import {
  NavLinkButton,
  SecondaryNavLinkButton,
} from '../layout/styled.layout';
import { Link } from 'react-router-dom';

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

  const [isExpanded, setIsExpanded] = React.useState(isActive);

  const handleclick = useCallback(() => {
    setIsExpanded(true);
    navigate(to);
  }, [navigate, to]);
  return (
    <div
      className={` ${
        isActive || secondaryIsActive ? '' : ''
      } border-0 card w-100 m-2 bg-none`}
    >
      <button
        onClick={handleclick}
        className={` ${
          isActive || secondaryIsActive
            ? 'btn-primary-light text-primary '
            : ''
        } btn border-0 text-start w-100`}
      >
        <i className={icon + ' me-2'}></i>
        <span className=''>{label}</span>
      </button>
      {isExpanded && secondaryLinks.length > 0 && (
        <div className='d-flex flex-column align-items-start ms-4 w-100 border-start border-gray5'>
          {secondaryLinks.map((link, index) => (
            <SecondaryNavLinkButton
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
        </div>
      )}
    </div>
  );
}

export default NavLinkExtendable;
