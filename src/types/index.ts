export interface DatabaseConnection {
  id: string;
  name: string;
  type: 'postgres';
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;
  ssl: boolean;
}

export interface ChartData {
  [key: string]: any;
}

export interface Farm {
  farm: string;
  index: number;
}

export interface Variety {
  variety: string;
  index: number;
}

export interface Product {
  productcode: string;
  index: number;
}

export interface SalesData {
  isoweek: number;
  farm?: string;
  variety?: string;
  product?: string;
  dollars?: number;
  cases?: number;
  poundsperday?: number;
  datalabel: string;
}
