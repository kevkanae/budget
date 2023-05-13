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
import { AccountData, OkaneDB } from "../../utils/Database.type";
import { useCentralStore } from "../../store/useDatabaseStore";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
import { produce } from "immer";
import { useProfileStore } from "../../store/useProfileStore";

export const useInit = () => {
  const navigate = useNavigate();
  const { updateUserData } = useCentralStore((state) => state);
  const { updateProfile } = useProfileStore((state) => state);

  const [isLoading, setLoading] = useState<boolean>(true);
  const [accName, setAccName] = useState<string>("");
  const [accounts, setAccounts] = useState<AccountData[]>([]);
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
              const parsedData: OkaneDB = JSON.parse(data);
              updateUserData(parsedData);
              navigate("/home");
            });
          }
        })
        .finally(() => setLoading(false));
    } catch (error) {
      notify("error", "Something went wrong");
    }
  }, []);

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  const handleAddAccount = () => {
    if (accName) {
      if (accounts.length > 5) {
        notify("info", "You can only add 5 accounts");
        return;
      } else {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];

        // Remove the color from the array
        setColors(
          produce(colors, (draft) => {
            return draft.filter((color) => color !== randomColor);
          })
        );

        // Add new account
        setAccounts(
          produce(accounts, (draft) => {
            draft.push({
              id: uuidv4(),
              name: accName,
              gradient: randomColor,
              createdAt: dayjs().toISOString(),
              updatedAt: dayjs().toISOString(),
              data: [],
            });
          })
        );

        // Reset the input field
        setAccName("");
      }
    }
  };

  const handleRemoveAccount = (currentAcc: AccountData) => {
    // Add the color back to the array
    setColors(
      produce(colors, (draft) => {
        draft.push(currentAcc.gradient);
      })
    );

    // Remove the account
    setAccounts(
      produce(accounts, (draft) => {
        return draft.filter((acc) => acc.id !== currentAcc.id);
      })
    );
  };

  const handleSave = async () => {
    const okaneDB: OkaneDB = {
      userData: accounts,
    };

    // Save the data to the file
    try {
      setLoading(true);
      await writeTextFile("index.json", JSON.stringify(okaneDB), {
        dir: BaseDirectory.Download,
      })
        .then(() => {
          updateUserData(okaneDB);
          updateProfile(okaneDB.userData[0], 0, true);
        })
        .then(() => setLoading(false))
        .finally(() => navigate("/home"));
    } catch (error) {
      notify("error", "Something went wrong");
    }
  };

  return {
    isLoading,
    accName,
    accounts,
    setAccName,
    handleAddAccount,
    handleRemoveAccount,
    handleSave,
  };
};
