import { createSlice } from '@reduxjs/toolkit';
import { Truck } from '../../types';
import { truckFirestoreConverter } from '../../utils/data.util';
import { createDocument } from '../../resources/services/dataService';
import {
  createTruck,
  getAllTrucks,
} from '../actions/trucks.redux.actions';

export interface TruckInititialState {
  loading: boolean;
  searchLoading: boolean;
  dataArray: any[];
  searchResults: any[];
  dataItem: any;
  error: any;
  succsess: boolean;
}

const initialState: TruckInititialState = {
  loading: false,
  searchLoading: false,
  dataArray: [],
  searchResults: [],
  dataItem: null,
  error: null,
  succsess: false,
};

const truckSlice = createSlice({
  name: 'trucks',
  initialState: initialState,
  reducers: (create: any) => ({
    filterData: (state, action) => {
      state.searchLoading = true;
      const { searchValue } = action.payload;
      const results = state.dataArray.filter((item: any) => {
        const name = item.name.toLowerCase();
        return name.includes(searchValue.toLowerCase());
      });
      state.searchResults = results;
      state.searchLoading = false;
    },
  }),
  extraReducers: (builder) => {
    builder.addCase(createTruck.pending, (state) => {
      state.dataItem = null;
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createTruck.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.dataItem = payload;
      state.succsess = true;
    });
    builder.addCase(createTruck.rejected, (state, { payload }) => {
      state.dataItem = null;
      state.loading = false;
      state.error = payload;
    });

    // getAllTrucks
    builder.addCase(getAllTrucks.pending, (state) => {
      state.dataArray = [];
      state.loading = true;
      state.error = null;
    });

    builder.addCase(getAllTrucks.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.dataArray = payload;
      state.succsess = true;
    });

    builder.addCase(getAllTrucks.rejected, (state, { payload }) => {
      state.dataArray = [];
      state.loading = false;
      state.error = payload;
    });
  },
});

export const { filterData } = truckSlice.actions;
export default truckSlice.reducer;
