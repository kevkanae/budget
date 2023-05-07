import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Param } from "../utils/UserData.type";

export type AmountValue = {
  amount: number;
  //   prevPercentage: number;
  //   newPercentage: number;
};

const initialAmount: AmountValue = {
  amount: 0,
  //   prevPercentage: 0,
  //   newPercentage: 0,
};

export interface AmountStore {
  income: AmountValue;
  expense: AmountValue;
  debt: AmountValue;
  investment: AmountValue;
  updateAmount: (amount: number, type: Param, action: "+" | "-") => void;
}

export const useAmountStore = create<AmountStore>()(
  persist(
    (set, get) => ({
      income: get() ? get().income : initialAmount,
      expense: get() ? get().expense : initialAmount,
      debt: get() ? get().debt : initialAmount,
      investment: get() ? get().investment : initialAmount,
      updateAmount: (amount, type, action) =>
        set(() => ({
          [type]: {
            amount:
              action === "+"
                ? get()[type].amount + amount
                : get()[type].amount - amount,
          },
        })),
    }),
    {
      name: "OkaneAmount",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
