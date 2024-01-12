import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import { ModalContainer, ModalContent } from './modal.styled';
import useOutsideAlerter from '../../../utils/hooks/useOutsideAlerter';

const ModalWrapperComponent = ({
  children,
  onClose,
  display,
  limitsize,
  title,
}: {
  children: any;
  onClose: any;
  display: boolean;
  limitsize?: string;
  title?: string;
}) => {
  const wrapperRef = useRef(null);

  useOutsideAlerter(wrapperRef, onClose);

  return ReactDOM.createPortal(
    <ModalContainer>
      <ModalContent
        ref={wrapperRef}
        data-testid='portal-modal-content'
        $limitsize={limitsize}
        className='card'
      >
        <div className='card-header '>
          <h5 className='card-title'>{title}</h5>
          <button
            className='btn  border-0 '
            onClick={onClose}
            data-testid='close-modal-btn'
            type='button'
          >
            <i className='fa-solid fa-xmark' />
          </button>
        </div>

        <div className='card-body overflow-auto'>{children}</div>
      </ModalContent>
    </ModalContainer>,
    document.querySelector('#global-modal' as any),
  );
};

export default ModalWrapperComponent;
