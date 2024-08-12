import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import {
  useAppDispatch,
  useAppSelector,
} from '../../utils/hooks/useReduxDispatch';
import TruckSelectComponent from '../common/Inputs/component.truckSelect';
import {
  createPart,
  updatePart,
} from '../../redux/actions/parts.redux.actions';
import Spinner from '../common/component.spinner';
import { Part } from '../../types/part.t';

const PartForm = ({
  defaultValues,
  isEditing = false,
}: {
  defaultValues?: Part;
  isEditing?: boolean;
}) => {
  const { loading, error, succsess } = useAppSelector(
    (state) => state.parts,
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [selectedTrucks, setSelectedTrucks] = useState<any[]>(
    defaultValues?.fitsIn || [],
  );

  const onSubmit = async (data: any) => {
    if (isEditing) {
      dispatch(
        updatePart({
          ...data,
          id: defaultValues?.id,
          fitsIn: selectedTrucks,
        }),
      );
      if (succsess && !error) {
        navigate('/parts');
      }
      return;
    }

    await dispatch(createPart({ ...data, fitsIn: selectedTrucks }));
    if (succsess && !error) {
      navigate('/parts');
    }
  };

  return (
    <div className=''>
      <form
        className='container-lg'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='row'>
          <div className='col-lg-3 mb-3'>
            <label className='form-label'>
              Número de parte <span className='text-danger'>*</span>{' '}
            </label>
            <input
              type='text'
              className={`${
                errors.partNumber && 'is-invalid'
              } form-control `}
              id='partNumber'
              placeholder='Introduce el número de parte'
              {...register('partNumber', {
                required: true,
                validate: (value) => {
                  return !!value?.trim();
                },
              })}
            />
            {errors.partNumber && (
              <span className='invalid-feedback'>
                Introduce este campo
              </span>
            )}
          </div>
          <div className='col-lg-5 mb-3'>
            <label className='form-label'>
              Fabricante <span className='text-danger'>*</span>{' '}
            </label>
            <input
              type='text'
              className={`${
                errors.manufacturer && 'is-invalid'
              } form-control `}
              id='manufacturer'
              placeholder='Introduce el fabricante de la parte'
              {...register('manufacturer', {
                required: true,
                validate: (value) => {
                  return !!value?.trim();
                },
              })}
            />
            {errors.manufacturer && (
              <span className='invalid-feedback'>
                Introduce este campo
              </span>
            )}
          </div>

          <div className='col-lg-4 mb-3'>
            <label className='form-label'>
              SKU (Identificador único)
            </label>
            <input
              type='text'
              className={`${
                errors.sku && 'is-invalid'
              } form-control `}
              id='sku'
              placeholder='Introduce el Identificador único (SKU)'
              {...register('sku', {})}
            />
            {errors.sku && (
              <span className='invalid-feedback'>
                Introduce este campo
              </span>
            )}
          </div>

          <div className='col-lg-3 mb-3'>
            <label className='form-label'>Precio</label>

            <input
              type='number'
              data-mask='000.000.000.000.000,00'
              data-mask-visible='true'
              autoComplete='off'
              className={`${
                errors.price && 'is-invalid'
              } form-control `}
              id='price'
              placeholder='Introduce el precio'
              {...register('price', {
                valueAsNumber: true,
                required: 'Introduce este campo',
                min: {
                  value: 0,
                  message: 'El precio debe ser mayor a 0',
                },
              })}
            />

            {errors.price && (
              <span className='invalid-feedback'>
                {String(errors.price.message) || ''}
              </span>
            )}
          </div>

          <div className='col-lg-12 mb-3'>
            <label className='form-label'>
              Desctipcion <span className='text-danger'>*</span>{' '}
            </label>
            <textarea
              className={`${
                errors.description && 'is-invalid'
              } form-control `}
              rows={3}
              placeholder='Introduce la descripcion del producto'
              id='description'
              {...register('description', {
                required: true,
                validate: (value) => {
                  return !!value?.trim();
                },
              })}
            />
            {errors.description && (
              <span className='invalid-feedback'>
                Introduce este campo
              </span>
            )}
          </div>

          <div className='col-lg-12 mb-3'>
            <label className='form-label'>
              Camiones compatibles{' '}
              <span className='text-danger'>*</span>{' '}
            </label>
            <TruckSelectComponent
              selectedOptions={selectedTrucks}
              setSelectedOptions={setSelectedTrucks}
            />
          </div>

          <div className='col-lg-12 mb-3'>
            <label className='form-label'>
              Notas Extra <span className='text-danger'>*</span>{' '}
            </label>
            <textarea
              className={`${
                errors.notes && 'is-invalid'
              } form-control `}
              rows={3}
              placeholder='Introduce notas adicionales'
              id='description'
              {...register('notes', {
                required: true,
                validate: (value) => {
                  return !!value?.trim();
                },
              })}
            />
            {errors.notes && (
              <span className='invalid-feedback'>
                Introduce este campo
              </span>
            )}
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
              to={'/parts'}
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

export default PartForm;
