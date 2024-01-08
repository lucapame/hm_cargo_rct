import React from 'react';
import { useForm } from 'react-hook-form';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../utils/hooks/useReduxDispatch';
import { createTruck } from '../../../redux/actions/trucks.redux.actions';
import Spinner from '../../common/component.spinner';

const TruckForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const { loading, error, succsess } = useAppSelector(
    (state) => state.trucks,
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const dispatch = useAppDispatch();

  const onSubmit = async (data: any) => {
    await dispatch(createTruck(data));
    if (succsess) {
      onSuccess && onSuccess();
    }
  };

  return (
    <div>
      <h1 className='h3 fw-bold'>Nuevo camión </h1>

      <form
        className='text-start d-grid w-100 '
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className='h6 my-4 w-100 border-bottom pb-3 border-gray5'>
          General
        </h2>

        <div className='row mb-3'>
          <div className='col-md-6 mb-2'>
            <small className='text-gray1'>Nombre de vehiculo</small>
            <input
              type='text'
              className={`${
                errors.displayName && 'is-invalid'
              } form-control mt-2`}
              id='displayName'
              placeholder='Nombre del camión'
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

          <div className='col-md-3 mb-3'>
            <small className='text-gray1'>Marca</small>
            <input
              type='text'
              className={`${
                errors.displayName && 'is-invalid'
              } form-control mt-2 `}
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

          <div className='col-md-3 mb-3'>
            <small className='text-gray1'>Modelo</small>
            <input
              type='text'
              className={`${
                errors.displayName && 'is-invalid'
              } form-control mt-2 `}
              id='model'
              placeholder='model'
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

          <div className='col-md-3 mb-3'>
            <small className='text-gray1'>Placas</small>
            <input
              type='text'
              className={`${
                errors.displayName && 'is-invalid'
              } form-control mt-2 `}
              id='licensePlate'
              placeholder='Placas'
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

          <div className='col-md-3 mb-3'>
            <small className='text-gray1'>Año</small>
            <input
              type='number'
              min='1900'
              max='2099'
              step='1'
              className={`${
                errors.displayName && 'is-invalid'
              } form-control mt-2 `}
              id='year'
              placeholder='Año'
              {...register('year', {
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

          <div className='col-md-6 mb-2'>
            <small className='text-gray1'>Vin #</small>
            <input
              type='text'
              className={`${
                errors.displayName && 'is-invalid'
              } form-control mt-2 `}
              id='vin'
              placeholder='Vin'
              {...register('vin', {
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

          <h2 className='h6 my-4 w-100 border-bottom py-3 border-gray5'>
            Detalles del camión
          </h2>

          <div className='col-md-6 mb-2'>
            <small className='text-gray1'>Motor</small>
            <input
              type='text'
              className={`${
                errors.displayName && 'is-invalid'
              } form-control mt-2 `}
              id='motor'
              placeholder='Motor'
              {...register('motor', {
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

          <div className='col-md-6 mb-2'>
            <small className='text-gray1'>
              Número de serie del motor
            </small>
            <input
              type='text'
              className={`${
                errors.displayName && 'is-invalid'
              } form-control mt-2 `}
              id='motorSerialNumber'
              placeholder='Número de serie del motor'
              {...register('motorSerialNumber', {
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

          <div className='col-md-6 mb-2'>
            <small className='text-gray1'>Transmision</small>
            <input
              type='text'
              className={`${
                errors.displayName && 'is-invalid'
              } form-control mt-2 `}
              id='transmission'
              placeholder='Transmision'
              {...register('transmission', {
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

        {error && !loading && (
          <small className='text-danger'>{error}</small>
        )}

        <div className='d-flex align-items-center justify-content-end my-4'>
          <div className='mt-1 text-end pe-4 mb-3'>
            <button
              className='btn btn-gray1 text-white px-5'
              type='submit'
              disabled={loading}
            >
              {'Cancelar'}
            </button>
          </div>

          <div className='mt-1 text-end pe-4 mb-3'>
            <button
              className='btn btn-primary text-white px-5'
              type='submit'
              disabled={loading}
            >
              {loading ? <Spinner small /> : 'Guardar'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TruckForm;
