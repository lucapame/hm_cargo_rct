import { DocumentData, Timestamp } from 'firebase/firestore';
import { Truck } from '../types';
import { Part } from '../types/part.t';

export const truckFirestoreConverter = {
  toFireStore: (data: Truck, id?: string): any => {
    const {
      displayName,
      make,
      model,
      motor,
      motorSerialNumber,
      year,
      color,
      transmission,
      vin,
      licensePlate,
      licensePlateState,
      licensePlateExpiration,
      insuranceExpiration,
      insuranceCompany,
      insurancePolicy,
      notes,
      isActive,
    } = data;

    const exportData: DocumentData = {
      displayName,
      make,
      model,
      year,
      color,
      transmission,
      vin,
      licensePlate,
      licensePlateState,
      licensePlateExpiration,
      insuranceExpiration,
      insuranceCompany,
      insurancePolicy,
      motor,
      motorSerialNumber,
      notes,
      isActive: isActive || false,
      updatedAt: Timestamp.now(),
    };

    // Remove undefined properties
    Object.keys(data).forEach(
      (key) =>
        exportData[key] === undefined && delete exportData[key],
    );

    return exportData;
  },
  fromFireStore: (id: string, data: any) => {
    // Convert Firestore data to Publication
    // Example conversion logic
    return {
      id: id,
      displayName: data.displayName,
      make: data.make,
      model: data.model,
      year: data.year,
      color: data.color,
      transmission: data.transmission,
      vin: data.vin,
      licensePlate: data.licensePlate,
      licensePlateState: data.licensePlateState,
      licensePlateExpiration: data.licensePlateExpiration,
      insuranceExpiration: data.insuranceExpiration,
      insuranceCompany: data.insuranceCompany,
      insurancePolicy: data.insurancePolicy,
      motor: data.motor,
      motorSerialNumber: data.motorSerialNumber,
      notes: data.notes,
      updatedAt: new Date(
        data.updatedAt.seconds * 1000,
      ).toISOString() as string,
      isActive: data.isActive,
    } as Truck;
  },
};

export const partFirestoreConverter = {
  toFireStore: (data: Part, id?: string): any => {
    const {
      partNumber,
      description,
      price,
      sku,
      manufacturer,
      notes,
      image,
      fitsIn,
    } = data;

    const exportData: DocumentData = {
      partNumber,
      description,
      price,
      sku,
      manufacturer,
      notes,
      image,
      updatedAt: new Date().toISOString(),
      fitsIn,
    };

    // Remove undefined properties
    Object.keys(data).forEach(
      (key) =>
        exportData[key] === undefined && delete exportData[key],
    );

    return exportData;
  },

  fromFireStore: (id: string, data: any) => {
    // Convert Firestore data to Publication
    // Example conversion logic
    return {
      id: id,
      partNumber: data.partNumber,
      description: data.description,
      price: data.price,
      sku: data.sku,
      manufacturer: data.manufacturer,
      notes: data.notes,
      image: data.image,
      updated: data.updated,
      fitsIn: data.fitsIn,
      updatedAt: data.updatedAt,
    } as Part;
  },
};
