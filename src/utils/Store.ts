import { create } from 'zustand'

export interface ProfileStore{
    profileCount: number;
    profiles:string[]
    updateProfile: (list: string[]) => void
}

export const useProfileStore = create<ProfileStore>((set) => ({
  profileCount: 0,
  profiles: [],
  updateProfile: (list) => set(() => ({ profileCount: list.length, profiles: list })),
  // increasePopulation: () => set((state:any) => ({ bears: state.bears + 1 })),
  // removeAllBears: () => set({ bears: 0 }),
}))