import React from 'react';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../utils/hooks/useReduxDispatch';
import { Link, useParams } from 'react-router-dom';
import { getTruckById } from '../../../redux/actions/trucks.redux.actions';
import TruckForm from '../../../components/forms/component.truckForm';

import Spinner from '../../../components/common/component.spinner';
import { timeAgo } from '../../../utils/helpers';

const EditTruckPage = () => {
  const { loading, error, dataItem } = useAppSelector(
    (state) => state.trucks,
  );

  const { id } = useParams();

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (id && dataItem?.id !== id) dispatch(getTruckById(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, id]);

  return (
    <div>
      <div className=' my-4'>
        <div className='row g-2 align-items-center'>
          <div className='col'>
            <div className='d-flex align-items-center'>
              <Link className='' to='/trucks'>
                <i className='fa-solid fa-arrow-left me-2' />
              </Link>
              <h2 className='page-title'>Editar camion</h2>
            </div>
            <small>
              Edita la información que se encuentra en el sistema.
            </small>
          </div>
        </div>
      </div>

      {!loading && dataItem && (
        <div className='card mb-3'>
          <div className='card-header d-flex align-items-center justify-content-between'>
            <h3 className='card-title'>{dataItem?.displayName}</h3>
            {dataItem && (
              <p className='text-info'>
                Actializado: {timeAgo(dataItem.updatedAt)}
              </p>
            )}
          </div>
          <div className='card-body'>
            <TruckForm defaultValues={dataItem} isEditing />
          </div>
        </div>
      )}

      {loading && (
        <div className='text-center'>
          <Spinner small />
        </div>
      )}
      {error && <div className='alert alert-danger'>{error}</div>}
    </div>
  );
};

export default EditTruckPage;
