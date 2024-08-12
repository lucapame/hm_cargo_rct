import React, { useEffect } from 'react';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../utils/hooks/useReduxDispatch';
import { Link, useParams } from 'react-router-dom';
import Spinner from '../../../components/common/component.spinner';
import { timeAgo } from '../../../utils/helpers';
import { getPartById } from '../../../redux/actions/parts.redux.actions';
import PartForm from '../../../components/forms/component.partForm';

const EditPartPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const { loading, error, dataItem } = useAppSelector(
    (state) => state.parts,
  );
  const isNewItem = !id;

  useEffect(() => {
    if (id && dataItem?.id !== id) {
      dispatch(getPartById(id));
    }
  }, [dispatch, id, dataItem?.id]);

  const renderContent = () => {
    if (loading) {
      return (
        <div className='text-center'>
          <Spinner small />
        </div>
      );
    }

    if (error) {
      return <div className='alert alert-danger'>{error}</div>;
    }

    return (
      <div className='card mb-3'>
        {!isNewItem && dataItem && (
          <div className='card-header d-flex align-items-center justify-content-between'>
            <h3 className='card-title'>{dataItem.partNumber}</h3>
            <p className='text-info'>
              Actualizado:{' '}
              {dataItem.updatedAt
                ? timeAgo(dataItem.updatedAt)
                : 'Nunca'}
            </p>
          </div>
        )}
        <div className='card-body'>
          <PartForm
            {...(!isNewItem &&
              dataItem && { defaultValues: dataItem })}
            isEditing={!isNewItem}
          />
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
              <Link to={isNewItem ? '/parts' : `/parts/${id}`}>
                <i className='fa-solid fa-arrow-left me-2' />
              </Link>
              <h2 className='page-title'>
                {isNewItem ? 'Nueva parte' : 'Editar Parte'}
              </h2>
            </div>
            <small>
              Aquí puedes registrar una nueva parte para el
              inventario. Los campos marcados con{' '}
              <span className='text-danger'>*</span> son obligatorios.
            </small>
          </div>
        </div>
      </div>
      {renderContent()}
    </div>
  );
};

export default EditPartPage;
