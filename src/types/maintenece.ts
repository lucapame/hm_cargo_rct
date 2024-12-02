import { SimpleUser } from './User.t';

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
  status: 'completed' | 'pending' | 'in-progress';
  progress?: number;
}
