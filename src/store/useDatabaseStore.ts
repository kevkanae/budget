import { DB, Debt, Expense, Income, Investment } from "../utils/Database.type";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { logger } from "../utils/Logger";

export interface DatabaseStore {
  userData: DB | null;
  initialUpdate: (value: DB) => void;
  updateIncome: (value: Income) => void;
  updateExpense: (value: Expense) => void;
  updateDebt: (value: Debt) => void;
  updateInvestment: (value: Investment) => void;
}

export const useDatabaseStore = create<DatabaseStore>()(
  logger(
    persist(
      (set, get) => ({
        userData: get() ? get().userData : null,
        initialUpdate: (value) => set(() => ({ userData: value })),
        updateIncome: () => set(() => ({})),
        updateExpense: () => set(() => ({})),
        updateDebt: () => set(() => ({})),
        updateInvestment: () => set(() => ({})),
      }),
      {
        name: "Okane-DB",
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);
