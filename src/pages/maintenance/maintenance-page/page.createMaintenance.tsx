import React, { useEffect, useMemo } from 'react';
import { useParams } from 'react-router';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../utils/hooks/useReduxDispatch';
import placeholderImage from '../../../assets/img/no-image.png';
import Spinner from '../../../components/common/component.spinner';
import { timeAgo } from '../../../utils/helpers';
import MaintenanceForm from '../../../components/forms/component.maintenanceForm';
import { Link, useSearchParams } from 'react-router-dom';
import { getTruckById } from '../../../redux/actions/trucks.redux.actions';
import { getMaintenanceById } from '../../../redux/actions/maintenance.actions';

const CreateMaintenance = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();

  const { error, dataItem } = useAppSelector(
    (state) => state.maintenance,
  );

  // Selecting from the 'trucks' slice of the state
  const {
    loading: trucksLoading,
    error: trucksError,
    dataItem: trucksDataItem,
  } = useAppSelector((state) => state.trucks);

  // Selecting from the 'maintenance' slice of the state
  const {
    loading: maintenanceLoading,
    error: maintenanceError,
    dataItem: maintenanceDataItem,
  } = useAppSelector((state) => state.maintenance);

  const isNewItem = !id;

  const truckId: string = useMemo(() => {
    if (searchParams.get('truckId'))
      return searchParams.get('truckId')!;
    if (!isNewItem && dataItem) return dataItem.truckId;
    return '';
  }, [dataItem, isNewItem, searchParams]);

  useEffect(() => {
    //Get current maintenance
    if (id && dataItem?.id !== id) {
      dispatch(getMaintenanceById(id));
    }

    //Get truck by id
    if (truckId && !trucksError && trucksDataItem?.id !== truckId) {
      dispatch(getTruckById(truckId));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, id, trucksDataItem?.id, truckId]);

  const renderContent = () => {
    if (maintenanceLoading) {
      return (
        <div className='text-center'>
          <Spinner small />
        </div>
      );
    }

    if (maintenanceError) {
      return (
        <div className='alert alert-danger'>{maintenanceError}</div>
      );
    }

    return (
      <div className='card mb-3'>
        {!isNewItem && maintenanceDataItem && (
          <div className='card-header d-flex align-items-center justify-content-between'>
            <h3 className='card-title'>
              {maintenanceDataItem.displayName}
            </h3>
            <p className='text-info'>
              Actualizado: {timeAgo(maintenanceDataItem.updatedAt)}
            </p>
          </div>
        )}
        <div className='card-body'>
          <div className='row'>
            <div className='col-12 col-md-3'>
              <div className='card'>
                <div className='card-header'>
                  <h5 className='card-title'>
                    Detalles del vehículo
                  </h5>
                </div>
                <div className='card-body'>
                  {trucksLoading && (
                    <div className='text-center'>
                      <Spinner small />
                    </div>
                  )}

                  {trucksError && (
                    <div className='alert alert-danger'>
                      {trucksError}
                    </div>
                  )}

                  {trucksDataItem && (
                    <div className='row'>
                      <div className='col-12'>
                        <img
                          src={
                            trucksDataItem?.imageURL ||
                            placeholderImage
                          }
                          alt={trucksDataItem?.displayName}
                          className='img-fluid img-thumbnail'
                        />
                      </div>

                      <div className='col mt-2'>
                        <div className='datagrid'>
                          <div className='datagrid-item'>
                            <div className='datagrid-title'>
                              Nombre
                            </div>
                            <div className='datagrid-content'>
                              {trucksDataItem?.displayName || '-'}
                            </div>
                          </div>
                          <div className='datagrid-item'>
                            <div className='datagrid-title'>
                              VIN del vehiculo
                            </div>
                            <div className='datagrid-content'>
                              {trucksDataItem?.vin || '-'}
                            </div>
                          </div>
                          <div className='datagrid-item'>
                            <div className='datagrid-title'>
                              Placas
                            </div>
                            <div className='datagrid-content'>
                              {trucksDataItem?.licensePlate || '-'}
                            </div>
                          </div>
                          <div className='datagrid-item'>
                            <div className='datagrid-title'>Año</div>
                            <div className='datagrid-content'>
                              {trucksDataItem?.year || '-'}
                            </div>
                          </div>
                          <div className='datagrid-item'>
                            <div className='datagrid-title'>
                              Estado del vehiculo
                            </div>
                            <div className='datagrid-content'>
                              <span
                                className={`${
                                  trucksDataItem?.isActive
                                    ? 'status-green'
                                    : 'status-red'
                                }
                   status `}
                              >
                                {trucksDataItem?.isActive
                                  ? 'En uso'
                                  : 'Inactivo'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className='col'>
              <MaintenanceForm
                {...(!isNewItem &&
                  maintenanceDataItem && {
                    defaultValues: maintenanceDataItem,
                  })}
                isEditing={!isNewItem}
                currentTruckDetails={trucksDataItem || null}
              />
              {error && (
                <div className='alert alert-danger'>{error}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className='my-4'>
        <div className='row g-2 align-items-center'>
          <div className='col'>
            <div className='d-flex align-items-center'>
              <Link
                to={isNewItem ? '/maintenences' : `/maintenences`}
              >
                <i className='fa-solid fa-arrow-left me-2' />
              </Link>
              <h2 className='page-title'>
                {isNewItem
                  ? 'Nuevo veículo a mantenimiento'
                  : 'Editar detalles de manteniminento'}
              </h2>
            </div>
            <small>
              {isNewItem
                ? 'Agrega un nuevo veículo a mantenimiento'
                : 'Edita los detalles de mantenimiento'}
            </small>
          </div>
        </div>
      </div>
      {renderContent()}
    </div>
  );
};

export default CreateMaintenance;
