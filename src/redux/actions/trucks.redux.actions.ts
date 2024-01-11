// Assuming you've defined your `createDocument` function as mentioned earlier

import { createAsyncThunk } from '@reduxjs/toolkit';
import { Truck } from '../../types';
import { truckFirestoreConverter } from '../../utils/data.util';
import {
  createDocument,
  deleteDocument,
  getAllDocuments,
} from '../../resources/services/dataService';

export const createTruck = createAsyncThunk(
  'trucks/create',
  async (data: Truck, { rejectWithValue }) => {
    try {
      const truck = await createDocument<Truck>(
        'trucks',
        data,
        truckFirestoreConverter,
      );
      return truck;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const deleteTruck = createAsyncThunk(
  'trucks/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      await deleteDocument('trucks', id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const getAllTrucks = createAsyncThunk(
  'trucks/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const trucks = await getAllDocuments<Truck>(
        'trucks',
        truckFirestoreConverter,
      );
      return trucks;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);
