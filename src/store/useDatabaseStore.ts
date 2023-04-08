import { DB, Debt, Expense, Income, Investment } from "../utils/Database.type";
import { create, StateCreator, StoreMutatorIdentifier } from "zustand";

type Logger = <
  T extends unknown,
  Mps extends [StoreMutatorIdentifier, unknown][] = [],
  Mcs extends [StoreMutatorIdentifier, unknown][] = []
>(
  f: StateCreator<T, Mps, Mcs>,
  name?: string
) => StateCreator<T, Mps, Mcs>;

type LoggerImpl = <T extends unknown>(
  f: StateCreator<T, [], []>,
  name?: string
) => StateCreator<T, [], []>;

const loggerImpl: LoggerImpl = (f, name) => (set, get, store) => {
  type T = ReturnType<typeof f>;
  const loggedSet: typeof set = (...a) => {
    set(...a);
    console.log(...(name ? [`${name}:`] : []), get());
  };
  store.setState = loggedSet;

  return f(loggedSet, get, store);
};

export const logger = loggerImpl as unknown as Logger;

export interface DatabaseStore {
  userData: DB | null;
  initialUpdate: (value: DB) => void;
  updateIncome: (value: Income) => void;
  updateExpense: (value: Expense) => void;
  updateDebt: (value: Debt) => void;
  updateInvestment: (value: Investment) => void;
}

export const useDatabaseStore = create<DatabaseStore>(
  logger((set) => ({
    userData: null,
    initialUpdate: (value) => set(() => ({ userData: value })),
    updateIncome: () => set(() => ({})),
    updateExpense: () => set(() => ({})),
    updateDebt: () => set(() => ({})),
    updateInvestment: () => set(() => ({})),
  }))
);
