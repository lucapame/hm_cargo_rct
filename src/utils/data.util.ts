import { DocumentData, Timestamp } from 'firebase/firestore';
import { Truck } from '../types';
import { Part } from '../types/part.t';
import { Maintenance } from '../types/maintenece';

// Utility function to handle conversion of `updatedAt`
const convertUpdatedAt = (data: DocumentData): string | null => {
  if (data.updatedAt instanceof Timestamp) {
    return data.updatedAt.toDate().toISOString();
  } else if (typeof data.updatedAt === 'string') {
    return new Date(data.updatedAt).toISOString();
  }
  return null;
};

// Generic Firestore converter
const createFirestoreConverter = <T>(typeName: string) => ({
  toFirestore: (data: T, id?: string): DocumentData => {
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

  fromFirestore: (id: string, data: DocumentData): T => {
    const updatedAt = convertUpdatedAt(data);

    return {
      id,
      ...data,
      updatedAt,
    } as T;
  },
});

// Specific converters for each type
export const truckFirestoreConverter =
  createFirestoreConverter<Truck>('Truck');
export const partFirestoreConverter =
  createFirestoreConverter<Part>('Part');
export const maintenanceFirestoreConverter =
  createFirestoreConverter<Maintenance>('Maintenance');
