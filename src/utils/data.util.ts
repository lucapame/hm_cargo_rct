import { DocumentData } from 'firebase/firestore';
import { Truck } from '../types';

export const truckFirestoreConverter = {
  toFireStore: (truck: Truck, id?: string): any => {
    console.log(truck);
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
    } = truck;

    const data: DocumentData = {
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
      (key) => data[key] === undefined && delete data[key],
    );

    return data;
  },
  fromFireStore: (id: string, data: any) => {
    // Convert Firestore data to Publication
    // Example conversion logic
    return {
      id: data.id,
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
