import React, { useEffect } from 'react';
import PnedingMaintenancesComponent from '../../../components/maintenances/component.pendingMaintenances';
import { Link } from 'react-router-dom';
import MaintenancesTableComponent from '../../../components/common/Tables/component.mainteneceTable';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../utils/hooks/useReduxDispatch';
import { getAllMaintenances } from '../../../redux/actions/maintenance.actions';

const MaintenanceList = () => {
  const { loading, error, dataArray } = useAppSelector(
    (state) => state.maintenance,
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllMaintenances());
  }, [dispatch]);
  return (
    <div className='container-xl my-4'>
      <div className='row g-2 align-items-center'>
        <div className='col'>
          <div className='page-pretitle'>Maintenances </div>
          <h2 className='page-title'>Lista de Mantenimientos</h2>
        </div>

        <div className='col-auto ms-auto d-print-none'>
          <div className='btn-list'>
            <Link to='create' className='btn btn-primary '>
              <i className='fas fa-plus pe-2' />
              Crear mantenimiento
            </Link>
          </div>
        </div>
      </div>

      <div className='pending-maintenances mt-5'>
        <PnedingMaintenancesComponent />
      </div>

      <div className='mt-2'>
        {dataArray && !loading && !error && (
          <div className=' overflow-auto'>
            <MaintenancesTableComponent
              headers={[
                'Vehículo',
                'Fecha',
                'Descripción',
                'Tipo',
                'Estado',
              ]}
              data={dataArray}
              tableName='Todos los mantenimientos'
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MaintenanceList;
