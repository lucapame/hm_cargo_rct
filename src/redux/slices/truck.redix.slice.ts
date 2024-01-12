import { createSlice } from '@reduxjs/toolkit';
import { Truck } from '../../types';
import {
  createTruck,
  deleteTruck,
  getAllTrucks,
  getTruckById,
  updateTruck,
} from '../actions/trucks.redux.actions';

export interface TruckInititialState {
  loading: boolean;
  searchLoading: boolean;
  dataArray: any[];
  searchResults: any[];
  dataItem: Truck | null;
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
      state.succsess = false;
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

    // deleteTruck
    builder.addCase(deleteTruck.pending, (state) => {
      state.dataItem = null;
      state.loading = true;
      state.error = null;
      state.succsess = false;
    });
    builder.addCase(deleteTruck.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.dataArray = state.dataArray.filter(
        (item: Truck) => item.id !== payload,
      );
      state.succsess = true;
    });
    builder.addCase(deleteTruck.rejected, (state, { payload }) => {
      state.dataItem = null;
      state.loading = false;
      state.error = payload;
    });

    //updateDocument
    builder.addCase(updateTruck.pending, (state) => {
      state.dataItem = null;
      state.loading = true;
      state.error = null;
      state.succsess = false;
    });

    builder.addCase(updateTruck.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.dataItem = payload;
      state.succsess = true;
    });

    builder.addCase(updateTruck.rejected, (state, { payload }) => {
      state.dataItem = null;
      state.loading = false;
      state.error = payload;
    });

    // getAllTrucks
    builder.addCase(getAllTrucks.pending, (state) => {
      state.dataArray = [];
      state.loading = true;
      state.error = null;
      state.succsess = false;
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

    //Get by id

    builder.addCase(getTruckById.pending, (state) => {
      state.dataItem = null;
      state.loading = true;
      state.error = null;
      state.succsess = false;
    });

    builder.addCase(getTruckById.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.dataItem = payload;
      state.succsess = true;
    });

    builder.addCase(getTruckById.rejected, (state, { payload }) => {
      state.dataItem = null;
      state.loading = false;
      state.error = payload;
    });
  },
});

export const { filterData } = truckSlice.actions;
export default truckSlice.reducer;
