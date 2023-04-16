import { create } from "zustand";
import { AccountData } from "../utils/Database.type";
import { createJSONStorage, persist } from "zustand/middleware";

export interface ProfileStore {
  profile: AccountData | null;
  updateProfile: (obj: AccountData) => void;
}

export const useProfileStore = create<ProfileStore>()(
  persist(
    (set, get) => ({
      profile: get() ? get().profile : null,
      updateProfile: (newProfile) => set(() => ({ profile: newProfile })),
    }),
    {
      name: "OkaneProfile",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
