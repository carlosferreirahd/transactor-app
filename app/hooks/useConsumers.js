import { create } from 'zustand';
import { fetchAllConsumers } from '../database/consumersQueries';

// consumers state store

export const useConsumers = create((set) => ({
  consumers: [],
  fetchConsumersData: { loading: false, },
  fetchConsumers: ({ onSuccess, onFail }) => {
    set({ fetchConsumersData: { loading: true } });
    fetchAllConsumers()
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
  addConsumer: (newConsumer) => set((state) => ({ consumers: [...state.consumers, newConsumer] })),
  updateConsumer: ({ consumerId, newConsumerName, newConsumerBalance }) => set((state) => ({
    consumers: state.consumers.map(c => {
      if (c.id === consumerId) {
        return {
          id: consumerId,
          name: newConsumerName,
          balance: newConsumerBalance,
        }
      } else {
        return c;
      }
    }),
  })),
}));
