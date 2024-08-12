import { createSlice } from '@reduxjs/toolkit';

import {
  createPart,
  deletePart,
  getAllParts,
  getPartById,
  updatePart,
} from '../actions/parts.redux.actions';
import { Part } from '../../types/part.t';

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

const partsSlice = createSlice({
  name: 'parts',
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
    builder.addCase(createPart.pending, (state) => {
      state.dataItem = null;
      state.loading = true;
      state.error = null;
      state.succsess = false;
    });
    builder.addCase(createPart.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.dataItem = payload;
      state.succsess = true;
      state.succsess = true;
    });
    builder.addCase(createPart.rejected, (state, { payload }) => {
      state.dataItem = null;
      state.loading = false;
      state.error = payload;
      state.succsess = false;
    });

    // deletePart
    builder.addCase(deletePart.pending, (state) => {
      state.dataItem = null;
      state.loading = true;
      state.error = null;
      state.succsess = false;
    });
    builder.addCase(deletePart.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.dataArray = state.dataArray.filter(
        (item: Part) => item.id !== payload,
      );
      state.succsess = true;
      state.error = null;
    });
    builder.addCase(deletePart.rejected, (state, { payload }) => {
      state.dataItem = null;
      state.loading = false;
      state.error = payload;
      state.succsess = false;
    });

    // getAllParts
    builder.addCase(getAllParts.pending, (state) => {
      state.dataArray = [];
      state.loading = true;
      state.error = null;
      state.succsess = false;
    });

    builder.addCase(getAllParts.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.dataArray = payload;
      state.succsess = true;
      state.error = null;
    });

    builder.addCase(getAllParts.rejected, (state, { payload }) => {
      state.dataArray = [];
      state.loading = false;
      state.error = payload;
      state.succsess = false;
    });

    // getPartById
    builder.addCase(getPartById.pending, (state) => {
      state.dataItem = null;
      state.loading = true;
      state.error = null;
      state.succsess = false;
    });

    builder.addCase(getPartById.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.dataItem = payload;
      state.succsess = true;
      state.error = null;
    });

    builder.addCase(getPartById.rejected, (state, { payload }) => {
      state.dataItem = null;
      state.loading = false;
      state.error = payload;
      state.succsess = false;
    });

    // updatePart
    builder.addCase(updatePart.pending, (state) => {
      state.dataItem = null;
      state.loading = true;
      state.error = null;
      state.succsess = false;
    });
    builder.addCase(updatePart.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.dataItem = payload;
      state.succsess = true;
      state.error = null;
    });
    builder.addCase(updatePart.rejected, (state, { payload }) => {
      state.dataItem = null;
      state.loading = false;
      state.error = payload;
      state.succsess = false;
    });
  },
});

export const { filterData } = partsSlice.actions;
export default partsSlice.reducer;
