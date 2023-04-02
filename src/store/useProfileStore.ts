import { create } from "zustand";

export type Profile = {
  id: number;
  name: string;
};

export interface ProfileStore {
  profileCount: number;
  profiles: Profile[];
  currentProfile: Profile | null;
  updateProfileList: (list: Profile[]) => void;
  updateProfile: (obj: Profile) => void;
}

export const useProfileStore = create<ProfileStore>((set) => ({
  profileCount: 0,
  profiles: [],
  currentProfile: null,
  updateProfileList: (list) =>
    set(() => ({
      profileCount: list.length,
      profiles: list,
      currentProfile: list[0],
    })),
  updateProfile: (obj) => set(() => ({ currentProfile: obj })),
}));
