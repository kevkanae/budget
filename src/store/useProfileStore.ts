import { create } from "zustand";
import { AccountData } from "../utils/Database.type";
import { createJSONStorage, persist } from "zustand/middleware";

export interface ProfileStore {
  profile: AccountData | null;
  accountIndex: number;
  isNewUser: boolean;
  updateProfile: (obj: AccountData, idx: number, isNew?: boolean) => void;
}

export const useProfileStore = create<ProfileStore>()(
  persist(
    (set, get) => ({
      profile: get() ? get().profile : null,
      accountIndex: get() ? get().accountIndex : 0,
      isNewUser: get() ? get().isNewUser : false,
      updateProfile: (obj, idx, isNewUser = false) =>
        set(() => ({ profile: obj, accountIndex: idx, isNewUser })),
    }),
    {
      name: "OkaneProfile",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
