import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import {
  ModalContainer,
  SideModalContainer,
  SideModalContent,
} from './modal.styled';
import useOutsideAlerter from '../../../utils/hooks/useOutsideAlerter';

const SideModalWrapperComponent = ({
  children,
  onClose,
  display,
  limitsize,
}: {
  children: any;
  onClose: any;
  display: boolean;
  limitsize?: string;
}) => {
  const wrapperRef = useRef(null);

  useOutsideAlerter(wrapperRef, onClose);

  return ReactDOM.createPortal(
    <SideModalContainer>
      <SideModalContent
        ref={wrapperRef}
        data-testid='portal-modal-content'
        $limitsize={limitsize}
      >
        <div className='text-end'>
          <button
            className='btn text-gray3 border-0 btn-sm text-sm'
            onClick={onClose}
            data-testid='close-modal-btn'
            type='button'
          >
            <i className='fa-solid fa-circle-xmark' />
          </button>
        </div>
        <div className='container-fluid mt-2'>{children}</div>
      </SideModalContent>
    </SideModalContainer>,
    document.querySelector('#global-modal' as any),
  );
};

export default SideModalWrapperComponent;
