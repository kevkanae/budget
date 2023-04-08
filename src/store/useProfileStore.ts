import { create } from "zustand";
import { Account } from "../utils/Database.type";

export interface ProfileStore {
  currentProfile: Account | null;
  updateProfile: (obj: Account) => void;
}

export const useProfileStore = create<ProfileStore>((set) => ({
  currentProfile: null,
  updateProfile: (obj) => set(() => ({ currentProfile: obj })),
}));
