import React, { useEffect } from 'react';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../utils/hooks/useReduxDispatch';
import { getAllTrucks } from '../../../redux/actions/trucks.redux.actions';
import Spinner from '../../../components/common/component.spinner';
import TruckTable from '../../../components/common/Tables/component.TruckTable';
import { Link } from 'react-router-dom';

const TruckListPage = () => {
  const { loading, error, dataArray } = useAppSelector(
    (state) => state.trucks,
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllTrucks());
  }, [dispatch]);

  return (
    <div className='w-100'>
      <div className='container-xl my-4'>
        <div className='row g-2 align-items-center'>
          <div className='col'>
            <div className='page-pretitle'>General</div>
            <h2 className='page-title'>Camiones</h2>
          </div>

          <div className='col-auto ms-auto d-print-none'>
            <div className='btn-list'>
              <Link to='create' className='btn btn-primary '>
                <i className='fas fa-plus pe-2' />
                Nuevo camión
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className=''>
        {loading && (
          <div className='d-flex justify-content-center align-items-center'>
            <Spinner color='primary' />
          </div>
        )}

        {error && (
          <div className='alert alert-danger' role='alert'>
            {error}
          </div>
        )}

        {dataArray.length === 0 && !loading && !error && (
          <div className='alert alert-info' role='alert'>
            No hay camiones registrados
          </div>
        )}

        {dataArray && !loading && !error && (
          <div className=' overflow-auto'>
            <TruckTable
              headers={[
                'Nombre',
                'Marca',
                'Modelo',
                'Año',
                'Placa',
                'VIN',
                'Estado',
                'Actualizado',
              ]}
              data={dataArray}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TruckListPage;
