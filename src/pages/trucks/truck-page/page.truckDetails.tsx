import React from 'react';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../utils/hooks/useReduxDispatch';
import { Link, useParams } from 'react-router-dom';
import {
  deleteTruck,
  getTruckById,
} from '../../../redux/actions/trucks.redux.actions';
import { timeAgo } from '../../../utils/helpers';
import Spinner from '../../../components/common/component.spinner';

const TruckDetailsPage = () => {
  const { loading, error, dataItem } = useAppSelector(
    (state) => state.trucks,
  );

  const { id } = useParams();

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (id) dispatch(getTruckById(id));
  }, [dispatch, id]);

  const handleDelete = () => {
    if (id) dispatch(deleteTruck(id));
  };

  return (
    <div>
      {!loading && (
        <div className=' my-4'>
          <div className='row g-2 align-items-center'>
            <div className='col'>
              <div className='d-flex align-items-center'>
                <Link className='' to='/trucks'>
                  <i className='fa-solid fa-arrow-left me-2' />
                </Link>
                <h2 className='page-title'>
                  {dataItem?.displayName}
                </h2>
              </div>
              <small>
                Información de {dataItem?.displayName} en el sistema.
              </small>
            </div>

            <div className='col'>
              <div className='d-flex justify-content-end'>
                <Link
                  to={`/trucks/edit/${id}`}
                  className='btn btn-primary'
                >
                  <i className='fa-solid fa-edit me-2' />
                  Editar
                </Link>

                <button
                  onClick={handleDelete}
                  className='btn btn-danger ms-2'
                >
                  <i className='fa-solid fa-trash me-2' />
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {!loading && dataItem && (
        <div className='card'>
          <div className='card-header'>
            <h3 className='card-title'>Información General</h3>
          </div>
          <div className='card-body'>
            <div className='datagrid'>
              <div className='datagrid-item'>
                <div className='datagrid-title'>VIN del vehiculo</div>
                <div className='datagrid-content'>
                  {dataItem?.vin || '-'}
                </div>
              </div>
              <div className='datagrid-item'>
                <div className='datagrid-title'>Placas</div>
                <div className='datagrid-content'>
                  {dataItem?.licensePlate || '-'}
                </div>
              </div>
              <div className='datagrid-item'>
                <div className='datagrid-title'>Marca</div>
                <div className='datagrid-content'>
                  {dataItem?.make || '-'}
                </div>
              </div>
              <div className='datagrid-item'>
                <div className='datagrid-title'>Modelo</div>
                <div className='datagrid-content'>
                  {dataItem?.model || '-'}
                </div>
              </div>
              <div className='datagrid-item'>
                <div className='datagrid-title'>Año</div>
                <div className='datagrid-content'>
                  {dataItem?.year || '-'}
                </div>
              </div>
              <div className='datagrid-item'>
                <div className='datagrid-title'>
                  Estado del vehiculo
                </div>
                <div className='datagrid-content'>
                  <span
                    className={`${
                      dataItem?.isActive
                        ? 'status-green'
                        : 'status-red'
                    }
                status `}
                  >
                    {dataItem?.isActive ? 'En uso' : 'Inactivo'}
                  </span>
                </div>
              </div>
              <div className='datagrid-item'>
                <div className='datagrid-title'>
                  Fecha de expiración (Placas)
                </div>
                <div className='datagrid-content'>
                  {' '}
                  {dataItem?.licensePlateExpiration || '-'}
                </div>
              </div>

              <div className='datagrid-item'>
                <div className='datagrid-title'>
                  Fecha de expiración (Seguro)
                </div>
                <div className='datagrid-content'>
                  {' '}
                  {dataItem?.licensePlateExpiration || '-'}
                </div>
              </div>
              <div className='datagrid-item'>
                <div className='datagrid-title'>
                  Motor en el vehiculo
                </div>
                <div className='datagrid-content'>
                  <div className='d-flex align-items-center'>
                    <div className='me-2'>
                      {dataItem?.motor || '-'}
                    </div>
                    <div className='badge bg-green'>Motor</div>
                  </div>
                </div>
              </div>
              <div className='datagrid-item'>
                <div className='datagrid-title'>
                  Numero de serie del motor
                </div>
                <div className='datagrid-content'>
                  {dataItem?.motorSerialNumber || '-'}
                </div>
              </div>

              <div className='datagrid-item'>
                <div className='datagrid-title'>Trasmisión</div>
                <div className='datagrid-content'>
                  {dataItem?.transmission || '-'}
                </div>
              </div>

              <div className='datagrid-item'>
                <div className='datagrid-title'>
                  Ultima Actualización
                </div>
                <div className='datagrid-content text-info'>
                  {timeAgo(dataItem?.updatedAt)}
                </div>
              </div>

              <div className='datagrid-item'>
                <div className='datagrid-title'>Notas</div>
                <div className='datagrid-content'>
                  {dataItem?.notes || '-'}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {loading && (
        <div className='h-100 text-center p-5'>
          <Spinner color='primary' />
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default TruckDetailsPage;
