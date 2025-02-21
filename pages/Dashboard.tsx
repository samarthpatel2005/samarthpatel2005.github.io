import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { format } from 'date-fns';
import { TrendingUp, TrendingDown, Users } from 'lucide-react';

interface DashboardStats {
  totalCustomers: number;
  totalCredit: number;
  totalDebit: number;
  recentTransactions: any[];
}

function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalCustomers: 0,
    totalCredit: 0,
    totalDebit: 0,
    recentTransactions: [],
  });

  useEffect(() => {
    const fetchDashboardStats = async () => {
      const { data: customers } = await supabase
        .from('customers')
        .select('id');

      const { data: transactions } = await supabase
        .from('transactions')
        .select(`
          amount,
          type,
          date,
          description,
          customers (
            name
          )
        `)
        .order('date', { ascending: false })
        .limit(5);

      const { data: creditSum } = await supabase
        .from('transactions')
        .select('amount')
        .eq('type', 'CREDIT');

      const { data: debitSum } = await supabase
        .from('transactions')
        .select('amount')
        .eq('type', 'DEBIT');

      setStats({
        totalCustomers: customers?.length || 0,
        totalCredit: creditSum?.reduce((sum, t) => sum + Number(t.amount), 0) || 0,
        totalDebit: debitSum?.reduce((sum, t) => sum + Number(t.amount), 0) || 0,
        recentTransactions: transactions || [],
      });
    };

    fetchDashboardStats();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Customers
                  </dt>
                  <dd className="text-lg font-semibold text-gray-900">
                    {stats.totalCustomers}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <TrendingUp className="h-6 w-6 text-green-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Credit
                  </dt>
                  <dd className="text-lg font-semibold text-gray-900">
                    ₹{stats.totalCredit.toFixed(2)}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <TrendingDown className="h-6 w-6 text-red-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Debit
                  </dt>
                  <dd className="text-lg font-semibold text-gray-900">
                    ₹{stats.totalDebit.toFixed(2)}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900">Recent Transactions</h2>
        <div className="mt-4">
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {stats.recentTransactions.map((transaction, index) => (
                <li key={index}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <p className="text-sm font-medium text-indigo-600 truncate">
                          {transaction.customers.name}
                        </p>
                        <p className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          transaction.type === 'CREDIT'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {transaction.type}
                        </p>
                      </div>
                      <div className="ml-2 flex-shrink-0 flex">
                        <p className={`text-sm font-medium ${
                          transaction.type === 'CREDIT' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          ₹{Number(transaction.amount).toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="text-sm text-gray-500">
                          {transaction.description}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        {format(new Date(transaction.date), 'PPP')}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;