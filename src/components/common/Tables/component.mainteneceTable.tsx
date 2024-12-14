import React from 'react';
import {
  maintenaceTypeOptions,
  Maintenance,
} from '../../../types/maintenece';
import { useNavigate } from 'react-router';
import {
  getStatusBadgeClass,
  getStatusBadgeText,
} from '../../../utils/helpers';

interface TableProps {
  data: Maintenance[];
  headers: string[];
  tableName?: string;
}

const MaintenancesTableComponent: React.FC<TableProps> = ({
  data,
  headers,
  tableName,
}) => {
  const navigate = useNavigate();

  return (
    <div className='card'>
      <div className='card-body border-bottom py-3'>
        <div className='d-flex'>
          <h5 className='card-title'>{tableName}</h5>
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
            {data.map((maintenece, index) => (
              <tr
                key={maintenece.id}
                onClick={() =>
                  navigate(`/maintenences/details/${maintenece.id}`)
                }
                className='selectable hover'
              >
                <td></td>
                <td>{maintenece.truckDisplayName}</td>
                <td>{maintenece.date}</td>
                <td>
                  {maintenece.maintenanceDueDate}
                  {maintenece.maintenanceDueDate &&
                    new Date(maintenece.maintenanceDueDate) < new Date() && (
                    <span className='badge bg-danger ms-2'>
                     <div className="text-xs">
                     Vencido
                     </div>
                    </span>
                  )}
                </td>
                <td>
                  {maintenaceTypeOptions.find(
                    (option) => option.value === maintenece.type,
                  )?.label || 'Tipo desconocido'}
                </td>
                <td>
                  <span
                    className={getStatusBadgeClass(
                      maintenece.status,
                      'pill',
                    )}
                  >
                    {getStatusBadgeText(maintenece.status)}
                  </span>
                </td>
                <td className='sort-progress' data-progress='30'>
                  <div className='row align-items-center'>
                    <div className='col-12 col-lg-2'>
                      {maintenece.progress || '0'}%
                    </div>

                    <div className='col'>
                      <div
                        className='progress'
                        style={{ width: '5rem' }}
                      >
                        <div
                          className='progress-bar'
                          style={{ width: `${maintenece.progress}%` }}
                          role='progressbar'
                        >
                          <span className='visually-hidden'></span>
                        </div>
                      </div>
                    </div>
                  </div>
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

export default MaintenancesTableComponent;
