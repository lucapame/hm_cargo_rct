import React from 'react';
import Avatar from '../component.avatar';
import { SimpleUser } from '../../../types';

const UserSelectInput = ({
  selectedUser,
  setSelectedUser,
}: {
  selectedUser: SimpleUser | null;
  setSelectedUser: any;
}) => {
  return (
    <div>
      <div className='button'>
        {selectedUser ? (
          <div className='d-flex align-items-center'>
            <Avatar />
            <div className='d-none d-xl-block ps-2'>
              <div>{selectedUser.displayName}</div>
              <div
                className='mt-1 small text-secondary selectable'
                onClick={() => setSelectedUser(null)}
              >
                <i className='fas fa-times pe-1' />
                Quitar
              </div>
            </div>
          </div>
        ) : (
          <div className='d-flex align-items-center'>
            <Avatar size='xs' />
            <div className='ps-2'>
              <div
                className=' selectable'
                onClick={() => console.log('Select user')}
              >
                Sin asignar
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserSelectInput;
