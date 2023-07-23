import { create } from 'zustand'

export const useDataStore = create((set) => ({
  systemData: undefined,
  setSystemData: (data) => set({ systemData: data }),
}))