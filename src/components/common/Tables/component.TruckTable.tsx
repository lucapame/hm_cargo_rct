import { deleteTruck } from '../../../redux/actions/trucks.redux.actions';
import { useAppDispatch } from '../../../utils/hooks/useReduxDispatch';

interface TableProps {
  data: any[];
  headers: string[];
}

const TruckTable: React.FC<TableProps> = ({ data, headers }) => {
  const dispatch = useAppDispatch();
  const handleDelete = (id: string) => {
    dispatch(deleteTruck(id));
  };
  return (
    <div className='card'>
      <div className='card-body border-bottom py-3'>
        <div className='d-flex'>
          <div className='ms-auto text-secondary'>
            Buscar:
            <div className='ms-2 d-inline-block'>
              <input
                type='text'
                className='form-control form-control-sm'
                aria-label='Search invoice'
              />
            </div>
          </div>
        </div>
      </div>
      <div className='table-responsive'>
        <table className='table card-table table-vcenter text-nowrap datatable'>
          <thead>
            <tr>
              <th className='w-1'></th>

              {headers.map((header) => {
                return <th key={header}>{header}</th>;
              })}

              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((truck, index) => (
              <tr key={truck.id}>
                <td>
                  <input
                    className='form-check-input m-0 align-middle'
                    type='checkbox'
                    aria-label='Select invoice'
                  />
                </td>
                <td>{truck.displayName}</td>
                <td>{truck.make}</td>
                <td>{truck.model}</td>
                <td>{truck.year}</td>
                <td>{truck.licensePlate}</td>
                <td>{truck.vin}</td>
                <td className='text-end'>
                  <button
                    className='btn text-danger border-0'
                    onClick={() => handleDelete(truck.id)}
                  >
                    <i className='fas fa-trash-alt me-2' /> Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='card-footer d-flex align-items-center'>
        <p className='m-0 text-secondary'>
          <span>{data.length}</span> entradas
        </p>
        <ul className='pagination m-0 ms-auto'>
          <li className='page-item selectable'>
            <div className='page-link'>1</div>
          </li>

          <li className='page-item'>
            <div className='page-link selectable'>
              <i className='fas fa-chevron-right' />
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TruckTable;
