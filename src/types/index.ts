/* eslint-disable @typescript-eslint/no-explicit-any */
export type Transaction = {
  id: string;
  type: 'expense' | 'income';
  category: string;
  amount: number;
  date: string;
  description: string;
};

export type IUser = {
  id: string;
  email: string;
  name: string; 
}