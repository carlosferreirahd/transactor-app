import { create } from 'zustand';
import {
  addConsumerToDb,
  fetchAllConsumersFromDb,
  updateConsumerFromDb,
} from '../database/consumersQueries';

// consumers state store

export const useConsumers = create((set) => ({
  consumers: [],
  fetchConsumersData: { loading: false, },
  addConsumerData: { loading: false },
  updateConsumerData: { loading: false },
  fetchConsumers: ({ onSuccess, onFail }) => {
    set({ fetchConsumersData: { loading: true } });

    fetchAllConsumersFromDb()
      .then((res) => {
        const consumersList = res?.rows?._array;
        set({ consumers: consumersList });
        if (onSuccess) onSuccess();
      })
      .catch((err) => {
        if (onFail) onFail(err);
      })
      .finally(() => set({ fetchConsumersData: { loading: false } }));
  },
  addConsumer: ({ newConsumerName, onSuccess, onFail }) => {
    set({ addConsumerData: { loading: true } });

    addConsumerToDb({ newConsumerName })
      .then((res) => {
        const newId = res?.insertId;

        const addedConsumer = {
          id: newId,
          name: newConsumerName,
          balance: 0,
        };

        set((state) => ({ consumers: [...state.consumers, addedConsumer] }));

        if (onSuccess) onSuccess();
      })
      .catch((err) => {
        if (onFail) onFail(err);
      })
      .finally(() => set({ addConsumerData: { loading: false } }));
  },
  updateConsumer: ({ consumerNewData, onSuccess, onFail }) => {
    set({ updateConsumerData: { loading: true } });

    updateConsumerFromDb({ consumerNewData })
      .then(() => {
        set((state) => ({
          consumers: state.consumers.map(c => {
            if (c.id === consumerNewData.id) {
              return {
                id: consumerNewData.id,
                name: consumerNewData.name,
                balance: consumerNewData.balance,
              }
            } else {
              return c;
            }
          }),
        }))

        if (onSuccess) onSuccess();
      })
      .catch((err) => {
        if (onFail) onFail(err);
      })
      .finally(() => set({ updateConsumerData: { loading: false } }));
  },
}));
