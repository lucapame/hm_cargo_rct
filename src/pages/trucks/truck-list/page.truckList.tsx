import React, { useEffect } from 'react';
import {
  Icon,
  Input,
  InputGroup,
} from '../../../components/common/styled.customInput';
import SideModalWrapperComponent from '../../../components/common/Modals/sideModalWrapper.component';
import TruckForm from '../../../components/trucks/truck-form/component.truckForm';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../utils/hooks/useReduxDispatch';
import { getAllTrucks } from '../../../redux/actions/trucks.redux.actions';
import Spinner from '../../../components/common/component.spinner';
import DynamicTable from '../../../components/common/Tables/component.DynamicTable';

const TruckListPage = () => {
  const { loading, error, dataArray } = useAppSelector(
    (state) => state.trucks,
  );
  const dispatch = useAppDispatch();

  const [formModalDisplay, setFormModalDisplay] =
    React.useState(false);
  const onCloseModal = () => {
    setFormModalDisplay(false);
  };

  useEffect(() => {
    dispatch(getAllTrucks());
  }, [dispatch]);

  return (
    <div className='container px-lg-4'>
      <div className='header w-100 my-4'>
        <div className='w-md-50 w-lg-25'>
          <InputGroup className='input-group '>
            <Icon className='ps-2 pe-0'>
              <i className='fas fa-search text-primary' />
            </Icon>
            <Input
              type='text'
              className='form-control shadow-none ps-2 pe-1'
              placeholder='Buscar...'
              aria-label='Search input'
              name='formData'
            />
          </InputGroup>
        </div>
        <div className='tableHeader d-flex align-items-center justify-content-between w-100'>
          <h1 className='h4 my-4 px-1'>Camiones</h1>
          <button
            className='btn btn-primary btn-sm text-white'
            onClick={() => setFormModalDisplay(true)}
          >
            <i className='fas fa-plus pe-2' />
            Crear Nuevo
          </button>
        </div>

        <div className='table'>
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

          <DynamicTable
            headers={[
              'Nombre',
              'Marca',
              'Modelo',
              'Año',
              'Transmisión',
              'VIN',
              'Placa',
            ]}
            data={dataArray}
          />
        </div>
      </div>

      {formModalDisplay && (
        <SideModalWrapperComponent
          display={formModalDisplay}
          onClose={onCloseModal}
          limitsize='65%'
        >
          <TruckForm onSuccess={onCloseModal} />
        </SideModalWrapperComponent>
      )}
    </div>
  );
};

export default TruckListPage;
