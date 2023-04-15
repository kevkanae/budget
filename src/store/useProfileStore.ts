import { create } from "zustand";
import { Account } from "../utils/Database.type";
import { createJSONStorage, persist } from "zustand/middleware";

export interface ProfileStore {
  currentProfile: Account | null;
  updateProfile: (obj: Account) => void;
}

export const useProfileStore = create<ProfileStore>()(
  persist(
    (set, get) => ({
      currentProfile: get() ? get().currentProfile : null,
      updateProfile: (obj) => set(() => ({ currentProfile: obj })),
    }),
    {
      name: "Okane-Selected-Profile",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
