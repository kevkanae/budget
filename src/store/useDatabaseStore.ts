import { Entry, OkaneDB } from "../utils/Database.type";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { logger } from "../utils/Logger";
import { produce } from "immer";

export interface CentralStore {
  db: OkaneDB;
  updateUserData: (value: OkaneDB) => void;
  updateEntry: (
    entry: Entry,
    accountId: string,
    action: "add" | "edit" | "delete"
  ) => void;
}

export const useCentralStore = create<CentralStore>()(
  logger(
    persist(
      (set, get) => ({
        db: get() ? get().db : { userData: [] },
        updateUserData: (value) =>
          set(() => ({
            db: value,
          })),
        updateEntry: (entry, accountId, action) =>
          set(() => {
            if (action === "add") {
              return {
                db: produce(get().db, (draft) => {
                  return draft.userData.forEach(
                    (account) =>
                      account.id === accountId && account.data.push(entry)
                  );
                }),
              };
            } else if (action === "edit") {
              return {
                db: produce(get().db, ({ userData }) => {
                  const accIndex = userData.findIndex(
                    (acc) => acc.id === accountId
                  );

                  if (accIndex !== -1) {
                    userData[accIndex].data = userData[accIndex].data.map(
                      (item) => (item.id === entry.id ? entry : item)
                    );
                  }
                }),
              };
            } else if (action === "delete") {
              return {
                db: produce(get().db, (draft) => {
                  return draft.userData.forEach(({ id, data }) => {
                    if (id === accountId) {
                      data.forEach((item, index) => {
                        if (item.id === entry.id) {
                          data.splice(index, 1);
                        }
                      });
                    }
                  });
                }),
              };
            } else
              return {
                db: get().db,
              };
          }),
      }),
      {
        name: "OkaneDB",
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);
