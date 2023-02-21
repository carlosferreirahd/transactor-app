import { create } from 'zustand';
import { fetchAllConsumers } from '../database/consumersQueries';

// consumers state store

export const useConsumers = create((set) => ({
  consumers: [],
  fetchConsumersData: { loading: false, },
  fetchConsumers: ({ successCallback, errorCallback }) => {
    set({ fetchConsumersData: { loading: true } });
    fetchAllConsumers()
      .then((res) => {
        const consumersList = res?.rows?._array;
        set({ consumers: consumersList });
        if (successCallback) successCallback();
      })
      .catch((err) => {
        if (errorCallback) errorCallback(err);
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
