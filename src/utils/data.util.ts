import { DocumentData, Timestamp } from 'firebase/firestore';
import { Truck } from '../types';
import { Part } from '../types/part.t';

export const truckFirestoreConverter = {
  toFireStore: (data: Truck, id?: string): DocumentData => {
    const exportData: DocumentData = {
      ...data,
      updatedAt: new Date().toISOString(),
    };

    // Remove undefined properties
    Object.keys(exportData).forEach(
      (key) =>
        exportData[key] === undefined && delete exportData[key],
    );

    return exportData;
  },

  fromFireStore: (id: string, data: DocumentData): Truck => {
    let updatedAt: string | null = null;

    if (data.updatedAt instanceof Timestamp) {
      updatedAt = data.updatedAt.toDate().toISOString();
    } else if (typeof data.updatedAt === 'string') {
      updatedAt = new Date(data.updatedAt).toISOString();
    }

    return {
      id,
      ...data,
      updatedAt,
    } as Truck;
  },
};

export const partFirestoreConverter = {
  toFireStore: (data: Part, id?: string): DocumentData => {
    const exportData: DocumentData = {
      ...data,
      updatedAt: new Date().toISOString(),
    };

    // Remove undefined properties
    Object.keys(exportData).forEach(
      (key) =>
        exportData[key] === undefined && delete exportData[key],
    );

    return exportData;
  },

  fromFireStore: (id: string, data: DocumentData): Part => {
    let updatedAt: string | null = null;

    if (data.updatedAt instanceof Timestamp) {
      updatedAt = data.updatedAt.toDate().toISOString();
    } else if (typeof data.updatedAt === 'string') {
      updatedAt = new Date(data.updatedAt).toISOString();
    }

    return {
      id,
      ...data,
      updatedAt,
    } as Part;
  },
};
