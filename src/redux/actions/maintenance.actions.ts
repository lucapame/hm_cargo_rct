import { createAsyncThunk } from '@reduxjs/toolkit';
import { createDocument } from '../../resources/services/dataService';
import { Maintenance } from '../../types/maintenece';
import { maintenanceFirestoreConverter } from '../../utils/data.util';

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
