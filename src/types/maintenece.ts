export interface Maintenance {
  id: string;
  type: string;
  description: string;
  remarks?: string;
  performedBy: {
    id: string;
    displayName: string;
  };
  authorizedBy: {
    id: string;
    name: string;
  };
  vehicleId: string;
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
