import { create } from "zustand";
import { DB, Debt, Expense, Income, Investment } from "../utils/Database.type";

export interface DatabaseStore {
  userData: DB | null;
  initialUpdate: (value: DB) => void;
  updateIncome: (value: Income) => void;
  updateExpense: (value: Expense) => void;
  updateDebt: (value: Debt) => void;
  updateInvestment: (value: Investment) => void;
}

export const useDatabaseStore = create<DatabaseStore>((set) => ({
  userData: null,
  initialUpdate: (value) => set(() => ({ userData: value })),
  updateIncome: () => set(() => ({})),
  updateExpense: () => set(() => ({})),
  updateDebt: () => set(() => ({})),
  updateInvestment: () => set(() => ({})),
}));
