import { create } from 'zustand';
import {
  addTransactionToDb,
  fetchAllTransactionsFromDb,
} from '../database/transactionsQueries';

// transations state store

export const useTransactions = create((set) => ({
  transactions: [],
  fetchTransactionsData: { loading: false },
  addTransactionData: { loading: false },
  fetchTransactions: ({ onSuccess, onFail }) => {
    set({ fetchTransactionsData: { loading: true } });
    fetchAllTransactionsFromDb()
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
  addTransaction: ({ value, operationTime, consumerId, onSuccess, onFail }) => {
    set({ addTransactionData: { loading: true } });

    addTransactionToDb({ value, operationTime, consumerId })
      .then((res) => {
        const newId = res?.insertId;

        const addedTransaction = {
          id: newId,
          value,
          operationTime,
          consumerId,
        };

        set((state) => ({ transactions: [addedTransaction, ...state.transactions] }));

        if (onSuccess) onSuccess();
      })
      .catch((err) => {
        if (onFail) onFail(err);
      })
      .finally(() => set({ addTransactionData: { loading: false } }));
  },
}));
