
import { Plan, Customer, Recharge } from './types';

export const PLANS: Plan[] = [
  { id: 1, name: 'Basic HD', price: 250, durationDays: 30, description: '150+ Channels with HD' },
  { id: 2, name: 'Family Plus HD', price: 400, durationDays: 30, description: '250+ Channels with HD' },
  { id: 3, name: 'Sports Premium', price: 650, durationDays: 30, description: 'All sports channels in HD' },
  { id: 4, name: 'Annual Saver HD', price: 4000, durationDays: 365, description: 'Family Plus for a year' },
  { id: 5, name: 'Mega Pack', price: 800, durationDays: 30, description: 'All channels included' },
];

const generateRecharges = (customerId: number, planId: number, count: number): Recharge[] => {
  const recharges: Recharge[] = [];
  let currentDate = new Date();
  for (let i = 0; i < count; i++) {
    const plan = PLANS.find(p => p.id === planId);
    if (plan) {
      currentDate.setMonth(currentDate.getMonth() - Math.floor(plan.durationDays / 30));
      recharges.push({
        id: customerId * 100 + i,
        customerId: customerId,
        planId: planId,
        rechargeDate: currentDate.toISOString().split('T')[0],
        amount: plan.price,
      });
    }
  }
  return recharges.reverse();
};

const calculateExpiryDate = (lastRechargeDate: string, durationDays: number): string => {
    const date = new Date(lastRechargeDate);
    date.setDate(date.getDate() + durationDays);
    return date.toISOString().split('T')[0];
};

const customerData: Omit<Customer, 'rechargeHistory' | 'expiryDate'>[] = [
  { id: 1, name: 'Aarav Sharma', phone: '9876543210', address: '123 MG Road, Mumbai', cdsn: '1000000001', planId: 2 },
  { id: 2, name: 'Diya Patel', phone: '9876543211', address: '456 Park Street, Kolkata', cdsn: '1000000002', planId: 3 },
  { id: 3, name: 'Rohan Mehta', phone: '9876543212', address: '789 Main Road, Chennai', cdsn: '1000000003', planId: 1 },
  { id: 4, name: 'Priya Singh', phone: '9876543213', address: '101 Cyber City, Gurgaon', cdsn: '1000000004', planId: 4 },
  { id: 5, name: 'Aditi Gupta', phone: '9876543214', address: '212 Banjara Hills, Hyderabad', cdsn: '1000000005', planId: 2 },
  { id: 6, name: 'Vikram Reddy', phone: '9876543215', address: '333 Koramangala, Bangalore', cdsn: '1000000006', planId: 5 },
  { id: 7, name: 'Sneha Kumar', phone: '9876543216', address: '444 Indiranagar, Bangalore', cdsn: '1000000007', planId: 1 },
  { id: 8, name: 'Arjun Nair', phone: '9876543217', address: '555 Anna Nagar, Chennai', cdsn: '1000000008', planId: 3 },
  { id: 9, name: 'Ishaan Joshi', phone: '9876543218', address: '666 Viman Nagar, Pune', cdsn: '1000000009', planId: 4 },
  { id: 10, name: 'Ananya Desai', phone: '9876543219', address: '777 Satellite, Ahmedabad', cdsn: '1000000010', planId: 2 },
];


export const CUSTOMERS: Customer[] = customerData.map(c => {
    const rechargeHistory = generateRecharges(c.id, c.planId, 5);
    const lastRecharge = rechargeHistory[rechargeHistory.length-1];
    const plan = PLANS.find(p => p.id === c.planId);
    const expiryDate = calculateExpiryDate(lastRecharge.rechargeDate, plan?.durationDays || 30);
    return { ...c, rechargeHistory, expiryDate };
});

export const ALL_RECHARGES: Recharge[] = CUSTOMERS.flatMap(c => c.rechargeHistory);
