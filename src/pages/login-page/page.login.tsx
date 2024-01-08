import React, { useEffect } from 'react';

import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  useAppSelector,
  useAppDispatch,
} from '../../utils/hooks/useReduxDispatch';
import { userLogin } from '../../redux/actions/auth.redux.actions';
import logo from '../../assets/img/cargo.svg';
import { withGuard } from '../../components/routes/withGuard.component';

const LoginPage = () => {
  const { loading, error, isAutenticated } = useAppSelector(
    (state) => state.auth,
  );
  const {
    register,
    handleSubmit,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    watch,
    formState: { errors },
  } = useForm();

  const dispatch = useAppDispatch();
  let navigate = useNavigate();
  const { search } = useLocation();
  const redirect = new URLSearchParams(search).get('redirect');

  useEffect(() => {
    if (isAutenticated) {
      navigate('/');
    }
  }, [isAutenticated, navigate]);

  const onSubmit = async (data: any) => {
    await dispatch(userLogin(data));
    navigate(redirect || '/');
  };
  return (
    <div className=' p-2 p-md-2 d-flex justify-content-center h-screen'>
      <div className='col-12 col-md-6 col-lg-4 d-flex  justify-content-center flex-column '>
        <div className='text-center'>
          <img
            src={logo}
            alt='logo'
            className='img-fluid'
            width={200}
          />
          <p className='pt-3'>
            Ingresa tus credenciales para acceder a tu cuenta.
          </p>
        </div>
        <form
          className='text-start card p-5 border-0 w-100'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='mb-3'>
            <input
              type='email'
              disabled={loading}
              className={`${
                errors.email && 'is-invalid'
              } form-control form-control-lg`}
              id='email'
              placeholder='Correo Electrónico'
              {...register('email', { required: true })}
            />
            {errors.password && (
              <span className='invalid-feedback'>
                Introduce este campo
              </span>
            )}
          </div>

          <div className='mb-2'>
            <input
              disabled={loading}
              type='password'
              className={`${
                errors.password && 'is-invalid'
              } form-control form-control-lg`}
              id='password'
              placeholder='Contraseña'
              {...register('password', { required: true })}
            />
            {errors.password && (
              <span className='invalid-feedback'>
                Introduce este campo
              </span>
            )}
          </div>
          <div className='d-grid gap-3 mt-4'>
            <button
              className='btn btn-primary btn-lg text-white'
              type='submit'
            >
              {loading ? 'loading' : 'Entrar'}
            </button>
          </div>
        </form>
        {error ? (
          <div className='alert alert-danger' role='alert'>
            <small>{error}</small>
          </div>
        ) : null}
        <small className='callout text-gray1 text-center'>
          Si no tienes una cuenta de cargo, por favor, ponte en
          contacto con tu administrador.
        </small>
      </div>
    </div>
  );
};

export default withGuard(LoginPage);
