import { create } from 'zustand';

export const useErrorHandler = create((set) => ({
  isVisible: false,
  title: '',
  description: '',
  buttonText: '',
  onButtonClick: () => null,
  onHideModal: () => set({
    isVisible: false,
    title: '',
    description: '',
    buttonText: '',
    onButtonClick: () => null,
  }),
  showErrorModal: ({
    title,
    description,
    buttonText,
    onButtonClick,
  }) => set({
    isVisible: true,
    title: title,
    description: description,
    buttonText: buttonText,
    onButtonClick: onButtonClick,
  }),
}));
