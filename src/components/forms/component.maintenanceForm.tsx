import React from 'react';
import {
  useAppDispatch,
  useAppSelector,
} from '../../utils/hooks/useReduxDispatch';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { Maintenance } from '../../types/maintenece';
import UserSelectInput from '../common/Inputs/component.userSelect';
import { SimpleUser } from '../../types';
import { Link } from 'react-router-dom';
import Spinner from '../common/component.spinner';
import { createMaintenance } from '../../redux/actions/maintenance.actions';

const MaintenanceForm = ({
  defaultValues,
  isEditing = false,
}: {
  defaultValues?: Maintenance;
  isEditing?: boolean;
}) => {
  const { loading, error, succsess } = useAppSelector(
    (state) => state.maintenance,
  );

  const [performedUser, setPerformedUser] =
    React.useState<SimpleUser | null>(null);

  const [maintenceCompleted, setMaintenanceCompleted] =
    React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: defaultValues,
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    if (isEditing) {
      //dispatch(updateMaintenace({ ...data, id: defaultValues?.id }));
      //navigate('/maintenences/' + defaultValues?.id);
      return;
    }

    await dispatch(createMaintenance(data));
    if (succsess && !error) {
      navigate('/maintenences');
    }

    console.log(data);
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
                <option value='interm'>
                  Mantenimiento intermedio
                </option>
                <option value='major'>Mantenimiento mayor</option>
                <option value='minor'>Mantenimiento menor</option>
                <option value='repair'> Reparación</option>
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
                <option value='pending'>Pendiente</option>
                <option value='completed'>Completado</option>
                <option value='in-progress'>En progreso</option>
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

          <label className='h3 my-4'>Detalles Adicionales</label>
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
              <label className='form-label'>Notas Adicionales</label>
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
            {maintenceCompleted && (
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
            )}
          </div>
          {error && !loading && (
            <div className='alert alert-danger my-4' role='alert'>
              {error}
            </div>
          )}
          <div className='modal-footer d-flex '>
            {!loading && (
              <Link
                className='btn btn-secondary text-white mx-2'
                to={'/maintenance'}
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
