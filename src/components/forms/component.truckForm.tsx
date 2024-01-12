import React from 'react';
import { useForm } from 'react-hook-form';
import {
  useAppDispatch,
  useAppSelector,
} from '../../utils/hooks/useReduxDispatch';
import {
  createTruck,
  updateTruck,
} from '../../redux/actions/trucks.redux.actions';
import Spinner from '../common/component.spinner';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { Truck } from '../../types';

const TruckForm = ({
  defaultValues,
  isEditing = false,
}: {
  defaultValues?: Truck;
  isEditing?: boolean;
}) => {
  const { loading, error, succsess } = useAppSelector(
    (state) => state.trucks,
  );

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    if (isEditing) {
      dispatch(updateTruck({ ...data, id: defaultValues?.id }));
      navigate('/trucks/' + defaultValues?.id);
      return;
    }

    await dispatch(createTruck(data));
    if (succsess && !error) {
      navigate('/trucks');
    }
  };

  return (
    <div className=''>
      <form
        className='container-lg card  mb-4 border-0'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className=''>
          <div className='mb-3'>
            <label className='form-label'>VIN del vehiculo</label>
            <input
              type='text'
              className={`${errors.vin && 'is-invalid'} form-control`}
              id='vin'
              placeholder='Introduce el VIN del vehiculo'
              {...register('vin', {
                required: true,
                validate: (value) => {
                  return !!value?.trim();
                },
              })}
            />
            {errors.vin && (
              <span className='invalid-feedback'>
                Introduce este campo
              </span>
            )}
          </div>

          <div className='row'>
            <div className='col-lg-8'>
              <label className='form-label'>
                Nombre del vehiculo
              </label>
              <input
                type='text'
                className={`${
                  errors.displayName && 'is-invalid'
                } form-control `}
                id='displayName'
                placeholder='Introduce el nombre del vehiculo'
                {...register('displayName', {
                  required: true,
                  validate: (value) => {
                    return !!value?.trim();
                  },
                })}
              />
              {errors.displayName && (
                <span className='invalid-feedback'>
                  Introduce este campo
                </span>
              )}
            </div>
            <div className='col-lg-4'>
              <div className='mb-3'>
                <label className='form-label'>Placas</label>
                <input
                  type='text'
                  className={`${
                    errors.displayName && 'is-invalid'
                  } form-control  `}
                  id='licensePlate'
                  placeholder='Introduce las placas'
                  {...register('licensePlate', {
                    required: true,
                    validate: (value) => {
                      return !!value?.trim();
                    },
                  })}
                />
                {errors.displayName && (
                  <span className='invalid-feedback'>
                    Introduce este campo
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className='modal-body'>
          <div className='row'>
            <div className='col-lg-4'>
              <div className='mb-3'>
                <label className='form-label'>Marca</label>
                <input
                  type='text'
                  className={`${
                    errors.displayName && 'is-invalid'
                  } form-control  `}
                  id='make'
                  placeholder='Marca'
                  {...register('make', {
                    required: true,
                    validate: (value) => {
                      return !!value?.trim();
                    },
                  })}
                />
                {errors.displayName && (
                  <span className='invalid-feedback'>
                    Introduce este campo
                  </span>
                )}
              </div>
            </div>
            <div className='col-lg-4'>
              <div className='mb-3'>
                <label className='form-label'>Modelo</label>
                <input
                  type='text'
                  className={`${
                    errors.displayName && 'is-invalid'
                  } form-control  `}
                  id='model'
                  placeholder='Introduce el modelo'
                  {...register('model', {
                    required: true,
                    validate: (value) => {
                      return !!value?.trim();
                    },
                  })}
                />
                {errors.displayName && (
                  <span className='invalid-feedback'>
                    Introduce este campo
                  </span>
                )}
              </div>
            </div>
            <div className='col-lg-4'>
              <div className='mb-3'>
                <label className='form-label'>Año</label>
                <input
                  type='number'
                  min='1900'
                  max='2099'
                  step='1'
                  className={`${
                    errors.displayName && 'is-invalid'
                  } form-control  `}
                  id='year'
                  placeholder='Año'
                  {...register('year', {
                    required: true,
                    validate: (value) => {
                      return !!value;
                    },
                  })}
                />
                {errors.displayName && (
                  <span className='invalid-feedback'>
                    Introduce este campo
                  </span>
                )}
              </div>
            </div>

            <div className='col-lg-3'>
              <label className='form-label'>
                Estado del vehiculo{' '}
              </label>
              <div>
                <div className='form-check form-switch'>
                  <input
                    className='form-check-input '
                    type='checkbox'
                    {...register('isActive', {})}
                  />
                  <label className='form-check-label ps-2 fw-bold'>
                    {watch('isActive') ? 'En uso' : 'Inactivo'}
                  </label>
                </div>
              </div>
            </div>
            <label className='h3 my-4'>Informacion Adicional</label>
            <div className='row '>
              <div className='col-lg-5 mb-3'>
                <label className='form-label'>Motor</label>
                <input
                  type='text'
                  className={`${
                    errors.motor && 'is-invalid'
                  } form-control  `}
                  id='motor'
                  placeholder='Introduce el tipo de motor'
                  {...register('motor', {
                    required: true,
                    validate: (value) => {
                      return !!value?.trim();
                    },
                  })}
                />
                {errors.motor && (
                  <span className='invalid-feedback'>
                    Introduce este campo
                  </span>
                )}
              </div>
              <div className='col-lg-7 mb-3'>
                <label className='form-label'>
                  Numero de serie del motor
                </label>
                <input
                  type='text'
                  className={`${
                    errors.motorSerialNumber && 'is-invalid'
                  } form-control  `}
                  id='motorSerialNumber'
                  placeholder='Introduce el numero de serie del motor'
                  {...register('motorSerialNumber', {
                    required: true,
                    validate: (value) => {
                      return !!value?.trim();
                    },
                  })}
                />
                {errors.motorSerialNumber && (
                  <span className='invalid-feedback'>
                    Introduce este campo
                  </span>
                )}
              </div>
              <div className='col-lg-5 mb-3'>
                <label className='form-label'>Trasmisión</label>
                <input
                  type='text'
                  className={`${
                    errors.transmission && 'is-invalid'
                  } form-control  `}
                  id='transmission'
                  placeholder='Introduce el tipo de trasmisión'
                  {...register('transmission', {
                    required: true,
                    validate: (value) => {
                      return !!value?.trim();
                    },
                  })}
                />
                {errors.transmission && (
                  <span className='invalid-feedback'>
                    Introduce este campo
                  </span>
                )}
              </div>
            </div>

            <div className='col-lg-12'>
              <div>
                <label className='form-label'>
                  Notas adicionales
                </label>
                <textarea
                  className={`${
                    errors.notes && 'is-invalid'
                  } form-control `}
                  rows={3}
                  placeholder='Introduce notas adicionales'
                  id='notes'
                  {...register('notes', {})}
                />
                {errors.transmission && (
                  <span className='invalid-feedback'>
                    Error en este campo
                  </span>
                )}
              </div>
            </div>
          </div>
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
              to={'/trucks'}
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
  );
};

export default TruckForm;
