import React from 'react';

const Avatar = ({
  size = 'sm',
}: {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}) => {
  return (
    <div>
      {' '}
      <span className={`avatar avatar-${size}`}></span>
    </div>
  );
};

export default Avatar;
