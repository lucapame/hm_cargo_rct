import { SimpleUser } from './User.t';


export enum MaintenanceStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED',
  }

  export const maintenaceTypeOptions = [
    { value: 'oilChange', label: 'Cambio de aceite' },
    { value: 'tireRotation', label: 'Rotación de llantas' },
    { value: 'brakeService', label: 'Servicio de frenos' },
    { value: 'tuneUp', label: 'Afinación' },
    { value: 'transmissionService', label: 'Servicio de transmisión' },
    { value: 'airFilter', label: 'Filtro de aire' },
    { value: 'cabinFilter', label: 'Filtro de cabina' },
    { value: 'fuelFilter', label: 'Filtro de combustible' },
    { value: 'coolantFlush', label: 'Limpieza de refrigerante' },
    { value: 'powerSteeringFlush', label: 'Limpieza de dirección hidráulica' },
    { value: 'brakeFluidFlush', label: 'Limpieza de líquido de frenos' },
    { value: 'transmissionFlush', label: 'Limpieza de transmisión' },
    { value: 'timingBelt', label: 'Cambio de banda de tiempo' },
    { value: 'sparkPlugs', label: 'Bujías' },
    { value: 'battery', label: 'Batería' },
    { value: 'shocks', label: 'Amortiguadores' },
    { value: 'suspension', label: 'Suspensión' },
    { value: 'alignment', label: 'Alineación' },
    { value: 'wheelBearing', label: 'Baleros' },
    { value: 'exhaust', label: 'Escape' },
    { value: 'other', label: 'Otro' },
    { value: 'major', label: 'Mantenimiento mayor' },
  ] as const;
export interface Maintenance {
  id: string;
  type: string;
  description: string;
  remarks?: string;
  performedBy?: SimpleUser | null;
  authorizedBy?: SimpleUser | null;
  truckId: string;
  truckDisplayName: string;
  truckImageURL: string;
  date: string;
  mileage: number;
  cost: number;
  updatedAt: string;
  notesList?: string[];
  maintenanceDueDate?: string;
  nextMaintenanceMileage?: number;
  nextManitenanceDate?: string;
  nextMaintenanceDate?: string;
  usedParts?: string[];
  status: MaintenanceStatus;
  progress?: number;
}
