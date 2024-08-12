export interface Part {
  id: string;
  partNumber: string;
  description: string;
  price?: number;
  sku?: string;
  manufacturer: string;
  notes?: string;
  imageURL?: string;
  updatedAt: string;
  fitsIn?: string[];
}
