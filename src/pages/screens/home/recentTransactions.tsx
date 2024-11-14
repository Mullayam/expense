import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Transaction } from '@/types';
import { useState } from 'react';
 
 
export function RecentTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      type: 'expense',
      category: 'Bus',
      amount: 20,
      date: '2024-01-01',
      description: 'Fare',
    },
    {
      id: '2',
      type: 'income',
      category: 'Bank',
      amount: 300,
      date: '2024-01-01',
      description: 'Loan',
    },
  ]);

  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold text-purple-600">
            Recent Expenses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sortedTransactions
              .filter((t) => t.type === 'expense')
              .map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div>
                    <h3 className="font-medium capitalize">{transaction.category}</h3>
                    <p className="text-sm text-gray-500">{transaction.description}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(transaction.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-lg font-semibold text-red-600">
                    -{transaction.amount} BDT
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold text-purple-600">
            Recent Incomes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sortedTransactions
              .filter((t) => t.type === 'income')
              .map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div>
                    <h3 className="font-medium capitalize">{transaction.category}</h3>
                    <p className="text-sm text-gray-500">{transaction.description}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(transaction.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-lg font-semibold text-green-600">
                    +{transaction.amount} BDT
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
}