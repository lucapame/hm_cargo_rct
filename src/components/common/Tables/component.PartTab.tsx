import { useNavigate } from 'react-router';
import { Part } from '../../../types/part.t';

interface TableProps {
  data: Part[];
  headers: string[];
}

const PartTable: React.FC<TableProps> = ({ data, headers }) => {
  const navigate = useNavigate();

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
            </tr>
          </thead>
          <tbody>
            {data.map((part, index) => (
              <tr
                key={part.id}
                onClick={() => navigate(`/parts/${part.id}`)}
                className='selectable hover'
              >
                <td>
                  <input
                    className='form-check-input m-0 align-middle'
                    type='checkbox'
                    aria-label='Select invoice'
                  />
                </td>
                <td>{part.partNumber}</td>
                <td>{part.description}</td>
                <td>{part.manufacturer}</td>
                <td>
                  {part.sku ? (
                    part.sku
                  ) : (
                    <small className='text-muted'>Sin SKU</small>
                  )}
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

export default PartTable;
