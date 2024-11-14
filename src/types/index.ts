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
  name: string;
  email: string;
}