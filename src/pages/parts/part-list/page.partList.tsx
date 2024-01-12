import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PartTable from '../../../components/common/Tables/component.PartTab';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../utils/hooks/useReduxDispatch';
import { getAllParts } from '../../../redux/actions/parts.redux.actions';
import Spinner from '../../../components/common/component.spinner';

function PartListPage() {
  const { loading, error, dataArray } = useAppSelector(
    (state) => state.parts,
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllParts());
  }, [dispatch]);

  return (
    <div>
      <div className='container-xl my-4'>
        <div className='row g-2 align-items-center'>
          <div className='col'>
            <div className='page-pretitle'>Inventario</div>
            <h2 className='page-title'>Lista de partes</h2>
          </div>

          <div className='col-auto ms-auto d-print-none'>
            <div className='btn-list'>
              <Link to='create' className='btn btn-primary '>
                <i className='fas fa-plus pe-2' />
                Nueva parte
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className=''>
        {loading && (
          <div className='d-flex justify-content-center align-items-center'>
            <Spinner color='primary' />
          </div>
        )}

        {error && (
          <div className='alert alert-danger' role='alert'>
            {error}
          </div>
        )}

        {dataArray.length === 0 && !loading && !error && (
          <div className='alert alert-info' role='alert'>
            No hay partes registradas
          </div>
        )}

        {dataArray && !loading && !error && (
          <div className=' overflow-auto'>
            <PartTable
              headers={[
                'Numero de parte',
                'Fabricante',
                'Descripción',
                'SKU (Identificador)',
              ]}
              data={dataArray}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default PartListPage;
