import { create } from 'zustand';

// consumers state store

export const useConsumers = create((set) => ({
  consumers: [],
  saveConsumers: (consumersList) => set({ consumers: consumersList, }),
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
