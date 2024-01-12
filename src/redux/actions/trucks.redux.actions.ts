// Assuming you've defined your `createDocument` function as mentioned earlier

import { createAsyncThunk } from '@reduxjs/toolkit';
import { OrderByQuery, Truck } from '../../types';
import { truckFirestoreConverter } from '../../utils/data.util';
import {
  createDocument,
  deleteDocument,
  getAllDocuments,
  getDocumentById,
  updateDocument,
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

export const updateTruck = createAsyncThunk(
  'trucks/update',
  async (data: Truck, { rejectWithValue }) => {
    try {
      await updateDocument(
        'trucks',
        data.id,
        data,
        truckFirestoreConverter,
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const getAllTrucks = createAsyncThunk(
  'trucks/getAll',
  async (_, { rejectWithValue }) => {
    const orderBy: OrderByQuery = new OrderByQuery(
      'displayName',
      'asc',
    );

    try {
      const trucks = await getAllDocuments<Truck>(
        'trucks',
        truckFirestoreConverter,
        [orderBy],
      );
      return trucks;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const getTruckById = createAsyncThunk(
  'trucks/getById',
  async (id: string, { rejectWithValue }) => {
    try {
      const truck = await getDocumentById<Truck>(
        'trucks',
        id,
        truckFirestoreConverter,
      );
      return truck;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);
