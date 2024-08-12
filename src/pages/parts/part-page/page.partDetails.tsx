import React from 'react';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../utils/hooks/useReduxDispatch';
import placeholderImage from '../../../assets/img/no-image.png';
import { Link, useParams } from 'react-router-dom';
import { formatMoney, timeAgo } from '../../../utils/helpers';
import Spinner from '../../../components/common/component.spinner';
import {
  deletePart,
  getPartById,
  updatePart,
} from '../../../redux/actions/parts.redux.actions';
import UploadeFileButton from '../../../components/common/Inputs/imageUpladerButton';

const PartDetailsPage = () => {
  const { loading, error, dataItem } = useAppSelector(
    (state) => state.parts,
  );

  const { id } = useParams();

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (id) dispatch(getPartById(id));
  }, [dispatch, id]);

  const handleDelete = () => {
    if (id) dispatch(deletePart(id));
  };

  return (
    <div>
      {!loading && (
        <div className=' my-4'>
          <div className='row g-2 align-items-center'>
            <div className='col-12 col-md-auto'>
              <div className='d-flex align-items-center'>
                <Link className='' to='/parts'>
                  <i className='fa-solid fa-arrow-left me-2' />
                </Link>
                <h2 className='page-title'>
                  {dataItem?.description}
                </h2>
              </div>
              <small>
                Información de la parte #{dataItem?.partNumber} en el
                sistema.
              </small>
            </div>

            <div className='col '>
              <div className='d-flex justify-content-md-end mt-3 mt-md-0'>
                <Link
                  to={`/parts/edit/${id}`}
                  className='btn btn-primary'
                >
                  <i className='fa-solid fa-edit me-2' />
                  Editar
                </Link>

                <button
                  onClick={handleDelete}
                  className='btn btn-danger ms-2'
                >
                  <i className='fa-solid fa-trash me-2' />
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {!loading && dataItem && (
        <div className='row'>
          <div className='col-md-4 col-lg-3'>
            <div className='card'>
              <div className='card-header'>
                <h3 className='card-title'>Imagen</h3>
              </div>
              <div className='card-body'>
                <img
                  src={dataItem?.imageURL || placeholderImage}
                  alt={dataItem?.description}
                  className='img-fluid'
                />
              </div>
              <div className='card-footer'>
                <UploadeFileButton
                  fileLocation='parts-images'
                  filedefaultName={dataItem?.id + '-0' || 'no-part'}
                  onUploadeDone={(imageURL) =>
                    dispatch(updatePart({ ...dataItem, imageURL }))
                  }
                />
              </div>
            </div>
          </div>
          <div className='col'>
            <div className='card'>
              <div className='card-header'>
                <h3 className='card-title'>Información General</h3>
              </div>
              <div className='card-body'>
                <div className='datagrid'>
                  <div className='datagrid-item'>
                    <div className='datagrid-title'>Nombre</div>
                    <div className='datagrid-content'>
                      {dataItem?.description || '-'}
                    </div>
                  </div>
                  <div className='datagrid-item'>
                    <div className='datagrid-title'>
                      Número de parte
                    </div>
                    <div className='datagrid-content'>
                      #{dataItem?.partNumber || '-'}
                    </div>
                  </div>
                  <div className='datagrid-item'>
                    <div className='datagrid-title'>Marca</div>
                    <div className='datagrid-content'>
                      {dataItem?.manufacturer || '-'}
                    </div>
                  </div>
                  <div className='datagrid-item'>
                    <div className='datagrid-title'>Precio (USD)</div>
                    <div className='datagrid-content'>
                      {formatMoney(dataItem?.price) || '-'}
                    </div>
                  </div>

                  <div className='datagrid-item'>
                    <div className='datagrid-title'>
                      SKU (Unidad de almacenamiento)
                    </div>
                    <div className='datagrid-content'>
                      {dataItem?.sku || '-'}
                    </div>
                  </div>

                  <div className='datagrid-item'>
                    <div className='datagrid-title'>
                      Ultima Actualización
                    </div>
                    <div className='datagrid-content text-info'>
                      {timeAgo(dataItem?.updatedAt)}
                    </div>
                  </div>

                  <div className='datagrid-item'>
                    <div className='datagrid-title'>Notas</div>
                    <div className='datagrid-content'>
                      {dataItem?.notes || '-'}
                    </div>
                  </div>
                </div>
                <div className='datagrid-item mt-2'>
                  <div className='datagrid-title'>
                    Camiones Compatibles
                  </div>
                  <div className='datagrid-content '>
                    {(dataItem?.fitsIn || []).map((item: any) => (
                      <div
                        key={item.value}
                        className='badge bg-secondary text-smaller me-1 mb-1'
                      >
                        {item?.label || '-'}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className='card mt-3'>
              <div className='card-header'>
                <h3 className='card-title'>
                  Transacciones en inventario
                </h3>
              </div>
              <div className='card-body'>
                <div className='datagrid'>
                  <div className='datagrid-item'>
                    <div className='datagrid-title'>Entradas</div>
                    <div className='datagrid-content'>
                      {dataItem?.transactions?.in || '-'}
                    </div>
                  </div>
                  <div className='datagrid-item'>
                    <div className='datagrid-title'>Salidas</div>
                    <div className='datagrid-content'>
                      {dataItem?.transactions?.out || '-'}
                    </div>
                  </div>
                  <div className='datagrid-item'>
                    <div className='datagrid-title'>Stock</div>
                    <div className='datagrid-content'>
                      {dataItem?.transactions?.stock || '-'}
                    </div>
                  </div>
                </div>
              </div>{' '}
            </div>
          </div>
        </div>
      )}

      {loading && (
        <div className='h-100 text-center p-5'>
          <Spinner color='primary' />
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default PartDetailsPage;
