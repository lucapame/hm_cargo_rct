import React from 'react';
import {
  useAppDispatch,
  useAppSelector,
} from '../../utils/hooks/useReduxDispatch';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import {
  Maintenance,
  MaintenanceStatus,
  maintenaceTypeOptions,
} from '../../types/maintenece';
import { SimpleUser } from '../../types';
import { Link } from 'react-router-dom';
import Spinner from '../common/component.spinner';
import { createMaintenance, updateMaintenance } from '../../redux/actions/maintenance.actions';

const MaintenanceForm = ({
  defaultValues,
  isEditing = false,
  currentTruckDetails,
}: {
  defaultValues?: Maintenance;
  isEditing?: boolean;
  currentTruckDetails: any;
}) => {
  const { loading, error, succsess } = useAppSelector(
    (state) => state.maintenance,
  );

  const [performedUser] =
    React.useState<SimpleUser | null>(null);

  const [maintenceCompleted, setMaintenanceCompleted] =
    React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { ...defaultValues },
  });

  console.log(currentTruckDetails);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    if (isEditing) {
      dispatch(updateMaintenance({ ...data, id: defaultValues?.id }));
      navigate('/maintenences');
      return;
    }
    console.log('data', data);
    if (currentTruckDetails) {
      await dispatch(
        createMaintenance({
          ...data,
          performedBy: performedUser,
          truckId: currentTruckDetails?.id || '',
          truckDisplayName: currentTruckDetails?.displayName || '',
          truckImageURL: currentTruckDetails?.imageURL || '',
        }),
      );
    }
    if (succsess && !error) {
      navigate('/maintenences');
    }
  };

  return (
    <div>
      <div className=''>
        <form
          className='container-lg card  mb-4 border-0'
          onSubmit={handleSubmit(onSubmit)}
        >
          <label className='h3 mb-4'>Información General</label>

          <div className='row'>
            <div className='col-lg-8'>
              <label className='form-label'>
                Tipo de mantenimiento
              </label>
              <select
                className='form-select'
                {...register('type', { required: true })}
              >
                {maintenaceTypeOptions.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
              {errors.type && (
                <span className='invalid-feedback'>
                  Introduce este campo
                </span>
              )}
            </div>
            <div className='col-lg-4 mt-2 mt-lg-0'>
              <label className='form-label'>Fecha</label>
              <input
                type='date'
                className='form-control'
                defaultValue={new Date().toISOString().split('T')[0]}
                {...register('date', { required: true })}
              />
              {errors.date && (
                <span className='invalid-feedback'>
                  Introduce este campo
                </span>
              )}
            </div>
            <div className='col-lg-4 mt-2'>
              <label className='form-label'>Millas recorridas</label>
              <input
                type='number'
                className='form-control'
                {...register('mileage', { required: true })}
              />
              {errors.mileage && (
                <span className='invalid-feedback'>
                  Introduce este campo
                </span>
              )}
            </div>
            <div className='col-lg-4 mt-2'>
              <label className='form-label'>
                Fecha de vencimiento
              </label>

              <input
                type='date'
                className='form-control'
                {...register('maintenanceDueDate', {
                  required: false,
                })}
              />
              {errors.maintenanceDueDate && (
                <span className='invalid-feedback'>
                  Error en este campo
                </span>
              )}
            </div>
            <div className='col-lg-4 mt-2'>
              <label className='form-label'>Estatus</label>
              <select
                className='form-select'
                {...register('status', { required: true })}
                onChange={(e) => {
                  if (e.target.value === 'completed') {
                    setMaintenanceCompleted(true);
                  } else {
                    setMaintenanceCompleted(false);
                  }
                }}
              >
                <option value={MaintenanceStatus.PENDING}>
                  Pendiente
                </option>
                <option value={MaintenanceStatus.COMPLETED}>
                  Completado
                </option>
                <option value={MaintenanceStatus.IN_PROGRESS}>
                  En progreso
                </option>
                <option value={MaintenanceStatus.CANCELED}>
                  Cancelado
                </option>
              </select>
            </div>

            <div className='col-lg-12 mt-2'>
              <label className='form-label'>Descripción</label>
              <textarea
                className='form-control'
                {...register('description', { required: true })}
              />
              {errors.description && (
                <span className='invalid-feedback'>
                  Introduce este campo
                </span>
              )}
            </div>
          </div>

          <label className='h3 my-4'>{maintenceCompleted}</label>
          {maintenceCompleted && (
            <div className='row'>
              <div className='col-lg-6'>
                <label className='form-label'>
                  Próximo mantenimiento
                </label>
                <input
                  type='date'
                  className='form-control'
                  {...register('nextMaintenanceDate', {
                    required: false,
                  })}
                />
                {errors.nextMaintenanceDate && (
                  <span className='invalid-feedback'>
                    Error en este campo
                  </span>
                )}
              </div>
              <div className='col-lg-6'>
                <label className='form-label'>
                  Millas para el próximo mantenimiento
                </label>
                <input
                  type='number'
                  className='form-control'
                  {...register('nextMaintenanceMileage', {
                    required: false,
                  })}
                />
                {errors.nextMaintenanceMileage && (
                  <span className='invalid-feedback'>
                    Error en este campo
                  </span>
                )}
              </div>

              <div className='col-lg-12 mt-2'>
                <label className='form-label'>
                  Notas Adicionales
                </label>
                <textarea
                  className='form-control'
                  {...register('remarks', { required: false })}
                />
                {errors.notesList && (
                  <span className='invalid-feedback'>
                    Error en este campo
                  </span>
                )}
              </div>

              <div className='col-lg-4 mt-2'>
                <label className='form-label'>Costo (USD)</label>
                <input
                  type='number'
                  className='form-control'
                  {...register('cost', { required: true })}
                />
                {errors.cost && (
                  <span className='invalid-feedback'>
                    Introduce este campo
                  </span>
                )}
              </div>
            </div>
          )}
          {error && !loading && (
            <div className='alert alert-danger my-4' role='alert'>
              {error}
            </div>
          )}
          <div className='modal-footer d-flex '>
            {!loading && (
              <Link
                className='btn btn-secondary text-white mx-2'
                to={'/maintenences'}
              >
                Cancelar
              </Link>
            )}
            <button
              className='btn btn-primary text-white'
              type='submit'
              disabled={loading}
            >
              {loading ? <Spinner small /> : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MaintenanceForm;
