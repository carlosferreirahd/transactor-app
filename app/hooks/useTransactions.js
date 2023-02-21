import { create } from 'zustand';
import { fetchAllTransactions } from '../database/transactionsQueries';

// transations state store

export const useTransactions = create((set) => ({
  transactions: [],
  fetchTransactionsData: { loading: false, },
  fetchTransactions: ({ onSuccess, onFail }) => {
    set({ fetchTransactionsData: { loading: true } });
    fetchAllTransactions()
      .then((res) => {
        const transactionsList = res?.rows?._array;
        set({ transactions: transactionsList });
        if (onSuccess) onSuccess();
      })
      .catch((err) => {
        if (onFail) onFail(err);
      })
      .finally(() => set({ fetchTransactionsData: { loading: false } }));
  },
}));
