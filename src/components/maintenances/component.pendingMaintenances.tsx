import React, { useEffect, useRef } from 'react';
import {
  useAppDispatch,
  useAppSelector,
} from '../../utils/hooks/useReduxDispatch';
import { getAllMaintenancesByQuery } from '../../redux/actions/maintenance.actions';
import { OrderByQuery, WhereQuery } from '../../types';
import Spinner from '../common/component.spinner';
import { Link } from 'react-router-dom';
import {
  maintenaceTypeOptions,
  Maintenance,
  MaintenanceStatus,
} from '../../types/maintenece';
import placeholderImage from '../../assets/img/no-image.png';
import {
  getStatusBadgeClass,
  getStatusBadgeText,
} from '../../utils/helpers';

const PnedingMaintenancesComponent = ({
  truckId,
  onlyPending,
  ahowAsTable,
}: {
  truckId?: string;
  onlyPending?: boolean;
  ahowAsTable?: boolean;
}) => {
  const { loading, searchLoading, seraachError, searchResults } =
    useAppSelector((state) => state.maintenance);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (truckId) {
      dispatch(
        getAllMaintenancesByQuery([
          new WhereQuery('truckId', '==', truckId),
          new OrderByQuery('date', 'desc'),
          ...([
            onlyPending
              ? new WhereQuery(
                  'status',
                  '==',
                  MaintenanceStatus.PENDING,
                )
              : null,
          ].filter((q) => q) as WhereQuery[]),
        ]),
      );
    } else {
      dispatch(
        getAllMaintenancesByQuery([
          new OrderByQuery('date', 'desc'),
          ...([
            onlyPending
              ? new WhereQuery(
                  'status',
                  '==',
                  MaintenanceStatus.PENDING,
                )
              : null,
          ].filter((q) => q) as WhereQuery[]),
        ]),
      );
    }
  }, [dispatch, onlyPending, truckId]);

  const PaginatedCarouselPodsLayout = ({
    maintenanceList,
  }: {
    maintenanceList: Maintenance[];
  }) => {
    const carouselRef = useRef<HTMLDivElement>(null);

    const scrollLeft = () => {
      if (carouselRef.current) {
        carouselRef.current.scrollBy({
          left: -310,
          behavior: 'smooth',
        });
      }
    };

    const scrollRight = () => {
      if (carouselRef.current) {
        carouselRef.current.scrollBy({
          left: 302,
          behavior: 'smooth',
        });
      }
    };

    return (
      <div className='carousel w-100 position-relative'>
        <div
          className='d-flex gap-1 showScrollBars overflow-hidden'
          style={{}}
          ref={carouselRef}
        >
          {maintenanceList.map((item: Maintenance) => (
            <div
              className='card'
              key={item.id}
              style={{ minWidth: '250px' }}
            >
              <div className='card-body p-2 text-center'>
                <img
                  src={item?.truckImageURL || placeholderImage}
                  alt={item?.truckDisplayName}
                  className='avatar avatar-xl mb-3 rounded'
                  style={{
                    objectFit: 'cover',
                  }}
                />

                <h3 className='m-0 mb-1'>
                  <Link to={`/maintenance/${item.id}`}>
                    {item.truckDisplayName}
                  </Link>
                </h3>
                <p className='text-secondary fw-bold'>
                  {maintenaceTypeOptions.find(
                    (option) => option.value === item.type,
                  )?.label || 'Tipo desconocido'}
                </p>

                <div className='mt-1'>
                  <span className={getStatusBadgeClass(item.status)}>
                    {getStatusBadgeText(item.status)}
                  </span>
                </div>

                <div className='text-secondary'>
                  Ingresado el {item.date}
                </div>
                {item.maintenanceDueDate &&
                  new Date(item.maintenanceDueDate) < new Date() && (
                    <span className='badge bg-danger ms-2'>
                      <div className='text-xs'>Vencido</div>
                    </span>
                  )}
              </div>
              <div className='d-flex'>
                <Link
                  to={`/maintenences/details/${item.id}`}
                  className='card-btn'
                >
                  <i className='fas fa-tasks me-2' />
                  Detalles
                </Link>
                <div
                  className='selectable card-btn'
                  onClick={() => {
                    console.log('clicked');
                  }}
                >
                  Iniciar
                  <i className='fas fa-arrow-right ms-2' />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='carousel-controls d-flex justify-content-between mt-2 w-100'>
          <button className='btn btn-white' onClick={scrollLeft}>
            <i className='fas fa-chevron-left'></i>
          </button>
          <button className='btn btn-white' onClick={scrollRight}>
            <i className='fas fa-chevron-right'></i>
          </button>
        </div>
      </div>
    );
  };
  return (
    <div>
      <div className='card'>
        <div className='card-header w-100 justify-content-between'>
          <h5 className='card-title'>Mantenimientos Pendientes</h5>

          <button className='btn btn-white'>
            <i className='fas fa-sync-alt' />
          </button>
        </div>
        <div className='card-body'>
          {(searchLoading || loading) && (
            <div className='d-flex justify-content-center align-items-center'>
              <Spinner color='primary' /> <p className="text-muted texxt-sm m-0 ms-2">
                Cargando mantenimientos pendientes...
              </p>
            </div>
          )}
          {seraachError && (
            <div className='alert alert-danger' role='alert'>
              {seraachError}
            </div>
          )}

          {searchResults.length === 0 &&
            !searchLoading &&
            !seraachError && (
              <div className='alert alert-info' role='alert'>
                No hay mantenimientos pendientes
              </div>
            )}

          {searchResults.length > 0 &&
            !loading &&
            !searchLoading &&
            !seraachError && (
              <div
                className='d-flex gap-1 showScrollBars'
                style={{
                  flexWrap: 'nowrap',
                  overflowX: 'scroll',
                  whiteSpace: 'nowrap',
                }}
              >
                <PaginatedCarouselPodsLayout
                  maintenanceList={searchResults as Maintenance[]}
                />
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default PnedingMaintenancesComponent;
