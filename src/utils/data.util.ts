import { DocumentData } from 'firebase/firestore';
import { Truck } from '../types';
import { Part } from '../types/part.t';

export const truckFirestoreConverter = {
  toFireStore: (data: Truck, id?: string): any => {
    const {
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
    };

    // Remove undefined properties
    Object.keys(data).forEach(
      (key) =>
        exportData[key] === undefined && delete exportData[key],
    );

    return data;
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
      updated,
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
      updated,
      fitsIn,
    };

    // Remove undefined properties
    Object.keys(data).forEach(
      (key) =>
        exportData[key] === undefined && delete exportData[key],
    );

    return data;
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
    } as Part;
  },
};
