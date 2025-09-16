
export interface Plan {
  id: number;
  name: string;
  price: number;
  durationDays: number;
  description: string;
}

export interface Recharge {
  id: number;
  customerId: number;
  planId: number;
  rechargeDate: string;
  amount: number;
}

export interface Customer {
  id: number;
  name: string;
  phone: string;
  address: string;
  cdsn: string;
  planId: number;
  expiryDate: string;
  rechargeHistory: Recharge[];
}

export type DataContextType = {
  customers: Customer[];
  plans: Plan[];
  recharges: Recharge[];
  addCustomer: (customer: Omit<Customer, 'id' | 'rechargeHistory' | 'expiryDate'>) => void;
  deleteCustomer: (customerId: number) => void;
};
