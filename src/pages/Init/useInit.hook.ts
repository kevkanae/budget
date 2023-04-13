import {
  BaseDirectory,
  exists,
  readTextFile,
  writeTextFile,
} from "@tauri-apps/api/fs";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { gradientColorArray } from "../../utils/GradientColorData";
import { notify } from "../../utils/Notify";
import { Account, DB } from "../../utils/Database.type";
import { useDatabaseStore } from "../../store/useDatabaseStore";

export const useInit = () => {
  const navigate = useNavigate();
  const initialUpdate = useDatabaseStore((state) => state.initialUpdate);

  const [isLoading, setLoading] = useState<boolean>(true);
  const [accName, setAccName] = useState<string>("");
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [colors, setColors] = useState<string[]>(gradientColorArray);

  const checkUser = useCallback(async () => {
    try {
      setLoading(true);
      await exists("index.json", {
        dir: BaseDirectory.Download,
      })
        .then(async (isExists) => {
          if (isExists) {
            await readTextFile("index.json", {
              dir: BaseDirectory.Download,
            }).then((data) => {
              const parsedData: DB = JSON.parse(data);
              initialUpdate(parsedData);
              navigate("/home");
            });
          }
        })
        .finally(() => setLoading(false));
    } catch (error) {
      console.log(error);
      notify("error", "Something went wrong");
    }
  }, []);

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAccName(event.target.value);
  };

  const handleAddAccount = () => {
    if (accName) {
      const colorIndex = Math.floor(Math.random() * colors.length);
      const randomColor = colors.splice(colorIndex, 1)[0];

      accounts.length < 5
        ? setAccounts((prev) => [
            ...prev,
            {
              id: prev.length + 1,
              accountName: accName,
              cardColor: randomColor,
            },
          ])
        : notify("info", "You can only add 5 accounts");

      setAccName("");
    }
  };

  const handleRemoveAccount = (currentAcc: Account) => {
    setColors((prev) => [...prev, currentAcc.cardColor]);

    const newAccounts = accounts.filter((acc) => acc.id !== currentAcc.id);
    setAccounts(newAccounts);
  };

  const handleSave = async () => {
    const initialData: DB = {
      accounts: accounts,
      details: accounts.map((acc) => ({
        id: acc.id,
        accountName: acc.accountName,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        months: [
          {
            monthID: new Date().getMonth() + 1,
            income: [],
            expense: [],
            debt: [],
            investment: [],
          },
        ],
      })),
    };

    try {
      setLoading(true);
      await writeTextFile("index.json", JSON.stringify(initialData), {
        dir: BaseDirectory.Download,
      })
        .then(() => initialUpdate(initialData))
        .then(() => setLoading(false))
        .finally(() => navigate("/home"));
    } catch (error) {
      console.log(error);
      notify("error", "Something went wrong");
    }
  };

  return {
    isLoading,
    accName,
    accounts,
    handleInputChange,
    handleAddAccount,
    handleRemoveAccount,
    handleSave,
  };
};
