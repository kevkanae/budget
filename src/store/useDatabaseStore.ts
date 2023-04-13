import { DB, Detail } from "../utils/Database.type";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { logger } from "../utils/Logger";
import { Account } from "../utils/Database.type";

export interface DatabaseStore {
  accountData: Account[];
  accountDetails: Detail[];
  initialUpdate: (value: DB) => void;
  updateEntry: (value: Detail[]) => void;
}

export const useDatabaseStore = create<DatabaseStore>()(
  logger(
    persist(
      (set, get) => ({
        accountData: get() ? get().accountData : [],
        accountDetails: get() ? get().accountDetails : [],
        initialUpdate: (value) =>
          set(() => ({
            accountData: value.accounts,
            accountDetails: value.details,
          })),
        updateEntry: (value) =>
          set(() => ({
            accountDetails: value,
          })),
      }),
      {
        name: "Okane-DB",
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);
