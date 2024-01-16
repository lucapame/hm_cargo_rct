/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import useOutsideAlerter from '../../../utils/hooks/useOutsideAlerter';
import Spinner from '../component.spinner';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../utils/hooks/useReduxDispatch';
import { getAllTrucks } from '../../../redux/actions/trucks.redux.actions';
import { Truck } from '../../../types';

const TruckSelectComponent = ({
  selectedOptions,
  setSelectedOptions,
}: {
  selectedOptions: { value: string; label: string }[];
  setSelectedOptions: any;
}) => {
  const dispatch = useAppDispatch();
  const { loading: truckLoading, dataArray: truckDataArray } =
    useAppSelector((state) => state.trucks);

  const wrapperRef = useRef(null);
  const [searchValue, setSearchValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState<any[]>([]);
  const [optionsDisplay, setOptionsDisplay] = useState(false);

  useEffect(() => {
    dispatch(getAllTrucks());
    setFilteredOptions(truckDataArray);
  }, []);

  const handleOnChange = (e: any) => {
    !optionsDisplay && setOptionsDisplay(true);
    const { value } = e.target;
    setSearchValue(value);

    if (!value) {
      setFilteredOptions(truckDataArray);
      return;
    }

    const filtered = truckDataArray.filter((option: any) =>
      option.displayName.toLowerCase().includes(value.toLowerCase()),
    );
    setFilteredOptions(filtered);
  };

  useOutsideAlerter(wrapperRef, () => {
    setOptionsDisplay(false);
  });

  const handleDeleteSelection = (option: any) => {
    const filtered = selectedOptions.filter(
      (item) => item.value !== option.value,
    );
    setSelectedOptions(filtered);
  };

  const handleSelectOption = (option: any) => {
    if (selectedOptions.find((item) => item.value === option.value)) {
      setSearchValue('');
      setOptionsDisplay(false);
      return;
    }
    setSelectedOptions([...selectedOptions, option]);
    setSearchValue('');
    setOptionsDisplay(false);
  };

  return (
    <div>
      <div className='card'>
        <div className='card-header'>
          <div
            ref={wrapperRef}
            className='input-icon w-100'
            style={{ position: 'relative' }}
          >
            <span className='input-icon-addon'>
              <i className='fas fa-search' />
            </span>
            <input
              type='text'
              value={searchValue}
              className='form-control'
              placeholder='Buscar '
              onChange={handleOnChange}
              onClick={() => {
                setOptionsDisplay(true);
                setFilteredOptions(truckDataArray);
              }}
            />
            {optionsDisplay && (
              <div className='d-flex flex-column flex-wrap'>
                <div
                  className='card p-3'
                  style={{
                    position: 'absolute',
                    zIndex: 1000,
                    left: 0,
                    top: 40,
                    width: '100%',
                    maxHeight: '200px',
                    overflow: 'auto',
                    boxShadow: '0 0 10px rgba(0,0,0,0.2)',
                  }}
                >
                  {filteredOptions.length > 0 ? (
                    filteredOptions.map((option: Truck) => (
                      <span
                        key={option.id}
                        className='p-1 selectable option'
                        onClick={() => {
                          handleSelectOption({
                            label: `${option.displayName}, ${option.make} ${option.model}`,
                            value: option.id,
                          });
                        }}
                      >
                        {option.displayName}, (
                        <span>
                          {option.make} {option.model}
                        </span>
                        )
                      </span>
                    ))
                  ) : !truckLoading ? (
                    <span className='badge bg-blue-lt me-1 mb-1'>
                      No hay resultados
                    </span>
                  ) : (
                    <Spinner small />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className='card-body'>
          {selectedOptions.length > 0 && (
            <div className=''>
              {selectedOptions.map((option) => (
                <span
                  key={option.value}
                  className='badge bg-blue-lt me-1 '
                >
                  {option.label}
                  <button
                    type='button'
                    className='btn-close ms-2 '
                    onClick={() => {
                      handleDeleteSelection(option);
                    }}
                  >
                    <i className='fa-solid fa-xmark' />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TruckSelectComponent;
