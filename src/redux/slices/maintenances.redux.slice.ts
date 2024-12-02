import { createSlice } from '@reduxjs/toolkit';
import { Maintenance } from '../../types/maintenece';
import {
  createMaintenance,
  getAllMaintenances,
  getAllMaintenancesByQuery,
  getMaintenanceById,
} from '../actions/maintenance.actions';

export interface MaintenanceInititialState {
  loading: boolean;
  searchLoading: boolean;
  dataArray: any[];
  searchResults: any[];
  seraachError: any;
  activeMaintenanceList: any[];
  dataItem: any;
  error: any;
  succsess: boolean;
}

const initialState: MaintenanceInititialState = {
  loading: false,
  searchLoading: false,
  dataArray: [],
  searchResults: [],
  activeMaintenanceList: [],
  dataItem: null,
  seraachError: null,
  error: null,
  succsess: false,
};

const maintenancesSlice = createSlice({
  name: 'maintenances',
  initialState: initialState,
  reducers: (create: any) => ({
    filterData: (state, action) => {
      state.searchLoading = true;
      const { searchValue } = action.payload;
      const results = state.dataArray.filter((item: any) => {
        const type = item.type.toLowerCase();
        return type.includes(searchValue.toLowerCase());
      });
      state.searchResults = results;
      state.searchLoading = false;
    },
    setActiveMaintenanceList: (state, action) => {
      state.activeMaintenanceList = action.payload;
    },
  }),
  extraReducers: (builder) => {
    //create maintenance
    builder.addCase(createMaintenance.pending, (state) => {
      state.dataItem = null;
      state.loading = true;
      state.error = null;
      state.succsess = false;
    });
    builder.addCase(
      createMaintenance.fulfilled,
      (state, { payload }) => {
        state.loading = false;
        state.dataItem = payload;
        state.succsess = true;
      },
    );
    builder.addCase(
      createMaintenance.rejected,
      (state, { payload }) => {
        state.dataItem = null;
        state.loading = false;
        state.error = payload;
        state.succsess = false;
      },
    );

    // Get all maintenances
    builder.addCase(getAllMaintenances.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.succsess = false;
    });

    builder.addCase(
      getAllMaintenances.fulfilled,
      (state, { payload }) => {
        state.loading = false;
        state.dataArray = payload;
        state.succsess = true;
      },
    );

    builder.addCase(
      getAllMaintenances.rejected,
      (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.succsess = false;
      },
    );

    //get maintenance by id
    builder.addCase(getMaintenanceById.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.dataItem = null;
    });

    builder.addCase(
      getMaintenanceById.fulfilled,
      (state, { payload }) => {
        state.loading = false;
        state.dataItem = payload;
        state.error = null;
      },
    );

    builder.addCase(
      getMaintenanceById.rejected,
      (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      },
    );

    //Get all maintenances by query
    builder.addCase(getAllMaintenancesByQuery.pending, (state) => {
      state.searchLoading = true;
      state.seraachError = null;
    });

    builder.addCase(
      getAllMaintenancesByQuery.fulfilled,
      (state, { payload }) => {
        state.searchLoading = false;
        state.searchResults = payload;
      },
    );

    builder.addCase(
      getAllMaintenancesByQuery.rejected,
      (state, { payload }) => {
        state.searchLoading = false;
        state.seraachError = payload;
      },
    );
  },
});

export const { filterData } = maintenancesSlice.actions;
export default maintenancesSlice.reducer;
