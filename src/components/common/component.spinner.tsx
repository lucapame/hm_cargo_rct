import React from 'react';

const Spinner = ({
  color,
  small,
  customColor,
}: {
  color?: string;
  small?: boolean;
  customColor?: string;
}) => {
  return (
    <div
      style={{ color: customColor }}
      className={`spinner-border text-${color} ${
        small && 'spinner-border-sm text-center'
      }`}
      role='status'
    >
      <span className='visually-hidden'>Loading...</span>
    </div>
  );
};

export default Spinner;
