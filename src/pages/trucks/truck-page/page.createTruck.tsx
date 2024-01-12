import React from 'react';
import { Link } from 'react-router-dom';
import TruckForm from '../../../components/forms/component.truckForm';

const CreateTruckPage = () => {
  return (
    <div>
      {' '}
      <div className=' my-4'>
        <div className='row g-2 align-items-center'>
          <div className='col'>
            <div className='d-flex align-items-center'>
              <Link className='' to='/trucks'>
                <i className='fa-solid fa-arrow-left me-2' />
              </Link>
              <h2 className='page-title'>Nuevo Camión</h2>
            </div>
            <small>
              Aquí puedes crear un nuevo camión para tu flota.
            </small>
          </div>
        </div>
      </div>
      <TruckForm />
    </div>
  );
};

export default CreateTruckPage;
