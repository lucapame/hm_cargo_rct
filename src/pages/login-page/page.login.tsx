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
import Spinner from '../../components/common/component.spinner';

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
    <div className='page page-center hv-100'>
      <div className='container container-tight py-4'>
        <div className='text-center mb-4'>
          <a href='.' className='navbar-brand navbar-brand-autodark'>
            <img
              src={logo}
              width='110'
              height='32'
              alt='Tabler'
              className='navbar-brand-image'
            />
          </a>
        </div>
        <div className='card card-md'>
          <div className='card-body'>
            <h2 className='h2 text-center mb-4'>Iniciar sesión</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='mb-3'>
                <label className='form-label'>
                  Correo Electrónico
                </label>

                <div>
                  <input
                    type='email'
                    disabled={loading}
                    className={`${
                      errors.email && 'is-invalid'
                    } form-control`}
                    id='email'
                    placeholder='Correo Electrónico'
                    {...register('email', { required: true })}
                  />
                  {errors.email && (
                    <span className='invalid-feedback'>
                      Introduce este campo
                    </span>
                  )}
                </div>
              </div>
              <div className='mb-2'>
                <label className='form-label'>
                  Contraseña
                  <span className='form-label-description'>
                    <a href='./forgot-password.html'>
                      Olvidaste tu contraseña?
                    </a>
                  </span>
                </label>
                <div>
                  <div className=' mb-3'>
                    <div className='d-flex'>
                      <input
                        disabled={loading}
                        type='password'
                        className={`${
                          errors.password && 'is-invalid'
                        } form-control`}
                        id='password'
                        placeholder='Contraseña'
                        {...register('password', { required: true })}
                      />
                      <span
                        className={`${
                          errors.password &&
                          'btn btn-outline-danger border-danger  '
                        } input-group-text selectable btn btn-light border ms-2 rounded`}
                        onClick={() => {
                          let input = document.getElementById(
                            'password',
                          ) as HTMLInputElement;
                          if (input.type === 'password') {
                            input.type = 'text';
                          } else {
                            input.type = 'password';
                          }
                        }}
                      >
                        <i className='fa-regular fa-eye' />
                      </span>
                    </div>
                    {errors.password && (
                      <div className='invalid-feedback'>
                        Introduce este campo
                      </div>
                    )}
                  </div>

                  <div className='d-flex'></div>
                </div>
              </div>
              <span className='invalid-feedback'>
                Introduce este campo
              </span>

              <div className='mb-2'>
                <label className='form-check'>
                  <input
                    type='checkbox'
                    className='form-check-input'
                  />
                  <span className='form-check-label'>
                    Recordarme en este dispositivo
                  </span>
                </label>
              </div>
              <div className='form-footer'>
                <button
                  className='btn btn-primary w-100 text-white'
                  type='submit'
                >
                  {loading ? <Spinner small /> : 'Entrar'}
                </button>
              </div>
            </form>
            {error && (
              <div className='alert alert-danger mt-4' role='alert'>
                {error}
              </div>
            )}
          </div>
        </div>
        <div className='text-center text-secondary mt-3'>
          No tienes una cuenta? Contacta al administrador para crear
          una.
        </div>
      </div>
    </div>
  );
};

export default withGuard(LoginPage);
