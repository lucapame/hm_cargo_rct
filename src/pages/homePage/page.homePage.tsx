import React from 'react';
import { withGuard } from '../../components/routes/withGuard.component';
import { logout } from '../../redux/slices/auth.redux.slice';
import {
  useAppDispatch,
  useAppSelector,
} from '../../hooks/useReduxDispatch';
import { userUpdate } from '../../redux/actions/auth.redux.actions';
import { useForm } from 'react-hook-form';

const HomePage = () => {
  const { userInfo, loading, isAdmin } = useAppSelector(
    (state) => state.auth,
  );
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: userInfo });
  const onSubmit = async (data: any) => {
    await dispatch(userUpdate(data));
  };

  return (
    <div>
      <button
        className='btn btn-primary'
        type='button'
        onClick={() => {
          dispatch(logout());
        }}
      >
        logout
      </button>

      <form
        className='text-start d-grid w-100 '
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='row mb-3'>
          <div className='col-12 col-md-3 pe-4'>
            <h4 className='m-0'>Información Personal</h4>
            <p className='text-muted'>
              Esta informacion aparecera en tu perfil
            </p>
          </div>
          <div className='col-12 col-md-9 row'>
            <div className='col-md-6'>
              <label className='text-muted' htmlFor='useerName'>
                Nombre
              </label>
              <input
                type='text'
                className={`${
                  errors.displayName && 'is-invalid'
                } form-control  `}
                id='displayName'
                placeholder='Nombre'
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
            <div className='col-md-6 mt-md-0 mt-4'>
              <label className='text-muted' htmlFor='useerName'>
                Correo Electrónico
              </label>
              <input
                type='email'
                disabled
                className={`${
                  errors.email && 'is-invalid'
                } form-control  `}
                id='email'
                placeholder='Correo Electrónico'
                {...register('email', {
                  required: true,
                  validate: (value) => {
                    return !!value?.trim();
                  },
                })}
              />
              {errors.email && (
                <span className='invalid-feedback'>
                  Introduce este campo
                </span>
              )}
            </div>
          </div>
        </div>

        <div className='mt-1 text-end pe-4 mb-3'>
          <button
            className='btn btn-primary text-white px-5'
            type='submit'
          >
            {loading ? 'loading' : 'Guardar'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default withGuard(HomePage);
