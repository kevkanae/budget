import { create } from "zustand";
import { AccountData } from "../utils/Database.type";
import { createJSONStorage, persist } from "zustand/middleware";

export interface ProfileStore {
  profile: AccountData | null;
  accountIndex: number;
  updateProfile: (obj: AccountData, idx: number) => void;
}

export const useProfileStore = create<ProfileStore>()(
  persist(
    (set, get) => ({
      profile: get() ? get().profile : null,
      accountIndex: get() ? get().accountIndex : 0,
      updateProfile: (obj, idx) =>
        set(() => ({ profile: obj, accountIndex: idx })),
    }),
    {
      name: "OkaneProfile",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
