import { create } from "zustand";

export interface ModalStore {
  modalType: string;
  modalProps: any;
  setModal: (modalType: string, modalProps: any) => void;
  hideModal: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  modalType: "",
  modalProps: null,
  setModal: (modalType, modalProps) =>
    set(() => ({ modalType: modalType, modalProps: modalProps })),
  hideModal: () => set(() => ({ modalType: "", modalProps: null })),
}));
