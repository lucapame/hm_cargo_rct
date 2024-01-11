import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createDocument,
  deleteDocument,
  getAllDocuments,
} from '../../resources/services/dataService';
import { partFirestoreConverter } from '../../utils/data.util';
import { Part } from '../../types/part.t';

export const createPart = createAsyncThunk(
  'parts/create',
  async (data: Part, { rejectWithValue }) => {
    try {
      const part = await createDocument<Part>(
        'parts',
        data,
        partFirestoreConverter,
      );
      return part;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const deletePart = createAsyncThunk(
  'parts/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      await deleteDocument('parts', id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const getAllParts = createAsyncThunk(
  'parts/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const parts = await getAllDocuments<Part>(
        'parts',
        partFirestoreConverter,
      );
      return parts;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);
