import { createSlice } from '@reduxjs/toolkit';
import { Maintenance } from '../../types/maintenece';
import { createMaintenance } from '../actions/maintenance.actions';

export interface MaintenanceInititialState {
  loading: boolean;
  searchLoading: boolean;
  dataArray: any[];
  searchResults: any[];
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
      },
    );
  },
});

export const { filterData } = maintenancesSlice.actions;
export default maintenancesSlice.reducer;
