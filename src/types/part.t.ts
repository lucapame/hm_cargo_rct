export interface Part {
  id: string;
  partNumber: string;
  description: string;
  price?: number;
  sku?: string;
  manufacturer: string;
  notes?: string;
  image?: string;
  updated?: string;
  fitsIn?: string[];
}
