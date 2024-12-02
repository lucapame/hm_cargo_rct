import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createDocument,
  deleteDocument,
  getAllDocuments,
  getDocumentById,
  updateDocument,
} from '../../resources/services/dataService';
import { Maintenance } from '../../types/maintenece';
import { maintenanceFirestoreConverter } from '../../utils/data.util';
import { OrderByQuery, Query, WhereQuery } from '../../types';
import { queries } from '@testing-library/react';

export const createMaintenance = createAsyncThunk(
  'maintenance/create',
  async (data: Maintenance, { rejectWithValue }) => {
    try {
      const maintenance = await createDocument<Maintenance>(
        'maintenance',
        data,
        maintenanceFirestoreConverter,
      );
      return maintenance;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const deleteMaintenance = createAsyncThunk(
  'maintenance/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      await deleteDocument('maintenance', id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const updateMaintenance = createAsyncThunk(
  'maintenance/update',
  async (data: Maintenance, { rejectWithValue }) => {
    try {
      await updateDocument(
        'maintenance',
        data.id,
        data,
        maintenanceFirestoreConverter,
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const getAllMaintenances = createAsyncThunk(
  'maintenance/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const maintenances = await getAllDocuments<Maintenance>(
        'maintenance',
        maintenanceFirestoreConverter,
      );
      return maintenances;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const getAllMaintenancesByQuery = createAsyncThunk(
  'maintenance/getAllByQuery',
  async (queries: Query[], { rejectWithValue }) => {
    try {
      const maintenances = await getAllDocuments<Maintenance>(
        'maintenance',
        maintenanceFirestoreConverter,
        queries,
      );
      return maintenances;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const getMaintenanceById = createAsyncThunk(
  'maintenance/getById',
  async (id: string, { rejectWithValue }) => {
    try {
      const maintenance = await getDocumentById<Maintenance>(
        'maintenance',
        id,
        maintenanceFirestoreConverter,
      );
      return maintenance;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const getAllMaintenancesByTruckId = createAsyncThunk(
  'maintenance/getAllByTruckId',
  async (
    {
      truckId,
      getPending,
    }: { truckId: string; getPending?: boolean },
    { rejectWithValue },
  ) => {
    try {
      const maintenances = await getAllDocuments<Maintenance>(
        'maintenance',
        maintenanceFirestoreConverter,
        [
          new WhereQuery('truckId', '==', truckId),
          new OrderByQuery('date', 'desc'),
          ...(getPending
            ? [new WhereQuery('status', '==', 'pending')]
            : []),
        ],
      );
      return maintenances;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);
