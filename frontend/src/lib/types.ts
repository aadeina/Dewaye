export type User = {
  id: number;
  username: string;
  email: string;
};

export type Pharmacy = {
  id: number;
  name: string;
  location: string;
  contact_phone: string;
  contact_email: string;
  created_at: string;
  updated_at: string;
};

export type Medicine = {
  id: number;
  name: string;
  category: string;
  price: string;
  stock: number;
  created_at: string;
  updated_at: string;
};

export type InventoryItem = {
  id: number;
  pharmacy: number;
  medicine: number;
  quantity: number;
  last_updated: string;
  pharmacy_name: string;
  medicine_name: string;
};
