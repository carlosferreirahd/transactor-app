import { create } from 'zustand';

export const useFeedbackMessage = create((set) => ({
  isVisible: false,
  message: '',
  onHideSnackbar: () => set({
    isVisible: false,
    message: '',
  }),
  showFeedbackMessage: ({ message }) => set({
    isVisible: true,
    message: message,
  }),
}));
