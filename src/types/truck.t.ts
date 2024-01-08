export interface Truck {
  id: string;
  displayName: string;
  make: string;
  model: string;
  motor: string;
  motorSerialNumber: string;
  year: number;
  color?: string;
  transmission: string;
  vin: string;
  licensePlate: string;
  licensePlateState?: string;
  licensePlateExpiration?: string;
  insuranceExpiration?: string;
  insuranceCompany?: string;
  insurancePolicy?: string;
}
