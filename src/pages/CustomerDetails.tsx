import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { format } from 'date-fns';
import { Plus, TrendingUp, TrendingDown } from 'lucide-react';

interface Customer {
  id: string;
  name: string;
  phone: string;
}

interface Transaction {
  id: string;
  amount: number;
  type: 'CREDIT' | 'DEBIT';
  description: string;
  date: string;
}

function CustomerDetails() {
  const { id } = useParams<{ id: string }>();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    amount: '',
    type: 'CREDIT',
    description: '',
  });

  useEffect(() => {
    if (id) {
      fetchCustomerDetails();
      fetchTransactions();
    }
  }, [id]);

  const fetchCustomerDetails = async () => {
    const { data } = await supabase
      .from('customers')
      .select('*')
      .eq('id', id)
      .single();
    
    if (data) setCustomer(data);
  };

  const fetchTransactions = async () => {
    const { data } = await supabase
      .from('transactions')
      .select('*')
      .eq('customer_id', id)
      .order('date', { ascending: false });
    
    if (data) setTransactions(data);
  };

  const handleAddTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { error } = await supabase
      .from('transactions')
      .insert([{
        customer_id: id,
        amount: Number(newTransaction.amount),
        type: newTransaction.type,
        description: newTransaction.description,
      }]);

    if (!error) {
      setShowAddModal(false);
      setNewTransaction({ amount: '', type: 'CREDIT', description: '' });
      fetchTransactions();
    }
  };

  const totalCredit = transactions
    .filter(t => t.type === 'CREDIT')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalDebit = transactions
    .filter(t => t.type === 'DEBIT')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const balance = totalCredit - totalDebit;

  if (!customer) return null;

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">{customer.name}</h1>
          <p className="mt-2 text-sm text-gray-700">
            Phone: {customer.phone}
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Transaction
          </button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
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
                    ₹{totalCredit.toFixed(2)}
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
                    ₹{totalDebit.toFixed(2)}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Balance
                  </dt>
                  <dd className={`text-lg font-semibold ${
                    balance >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    ₹{balance.toFixed(2)}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900">Transaction History</h2>
        <div className="mt-4">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Date
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Type
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Amount
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {format(new Date(transaction.date), 'PPP')}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        transaction.type === 'CREDIT'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {transaction.type}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                      <span className={
                        transaction.type === 'CREDIT'
                          ? 'text-green-600'
                          : 'text-red-600'
                      }>
                        ₹{Number(transaction.amount).toFixed(2)}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {transaction.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Transaction</h3>
            <form onSubmit={handleAddTransaction}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                    Amount
                  </label>
                  <input
                    type="number"
                    id="amount"
                    step="0.01"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    value={newTransaction.amount}
                    onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                    Type
                  </label>
                  <select
                    id="type"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    value={newTransaction.type}
                    onChange={(e) => setNewTransaction({ ...newTransaction, type: e.target.value as 'CREDIT' | 'DEBIT' })}
                  >
                    <option value="CREDIT">Credit (You'll Get)</option>
                    <option value="DEBIT">Debit (You'll Give)</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <input
                    type="text"
                    id="description"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    value={newTransaction.description}
                    onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
                  />
                </div>
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3">
                <button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:text-sm"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                >
                  Add Transaction
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomerDetails;