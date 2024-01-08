import React from 'react';
import ModalWrapperComponent from './modalWrapper.component';

const ErrorModalComponent = ({
  openModal,
  handleCloseModal,
  errorMessage,
  leadText,
  confirmText,
}: {
  openModal: boolean;
  handleCloseModal: any;
  errorMessage: string;
  leadText: string;
  confirmText: string;
}) => {
  return (
    <>
      {openModal && (
        <ModalWrapperComponent
          display={openModal}
          onClose={handleCloseModal}
          limitsize='20%'
        >
          <div className='text-center'>
            <i className='fa-solid fa-triangle-exclamation fa-2xl text-warning mb-4' />

            <h1 className='fs-4 fw-bold mb-1 mt-2'>{errorMessage}</h1>
            <p className='opacity-50 mt-3'>{leadText}</p>

            <div className='d-flex gap-2 mt-4 w-100'>
              <button
                className='btn btn-primary text-white w-100'
                type='button'
                onClick={handleCloseModal}
                autoFocus
              >
                {confirmText}
              </button>
            </div>
          </div>
        </ModalWrapperComponent>
      )}
    </>
  );
};

export default ErrorModalComponent;
