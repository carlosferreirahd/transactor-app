import { create } from 'zustand';
import { fetchAllTransactions } from '../database/transactionsQueries';

// transations state store

export const useTransactions = create((set) => ({
  transactions: [],
  fetchTransactionsData: { loading: false, },
  fetchTransactions: ({ successCallback, errorCallback }) => {
    set({ fetchTransactionsData: { loading: true } });
    fetchAllTransactions()
      .then((res) => {
        const transactionsList = res?.rows?._array;
        set({ transactions: transactionsList });
        if (successCallback) successCallback();
      })
      .catch((err) => {
        if (errorCallback) errorCallback(err);
      })
      .finally(() => set({ fetchTransactionsData: { loading: false } }));
  },
}));
