export interface Truck {
  id: string;
  displayName: string;
  make: string;
  model: string;
  motor: string;
  motorSerialNumber: string;

  engine: string;
  engineSerialNumber: string;

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
  notes?: string;
  updatedAt: string;
  isActive: boolean;
}
