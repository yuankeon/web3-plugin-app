import { create } from 'zustand'

export const useUserStore = create((set) => ({
  userData: undefined,
  setUserData: (data) => set({ userData: data }),
}))