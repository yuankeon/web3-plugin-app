import { create } from 'zustand'

export const useUserStore = create((set) => ({
  userData: undefined,
  setUserData: (data) => set({ userData: data }),
  passwordModalOpen: false,
  setPasswordModalOpen: () => set((state) => ({ passwordModalOpen: !state.passwordModalOpen })),
  modalClickFn: undefined,
  setModalClickFn: (fn) => set({ modalClickFn: fn })
}))