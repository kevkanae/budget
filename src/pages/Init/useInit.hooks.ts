import { exists, BaseDirectory, writeTextFile } from "@tauri-apps/api/fs";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { gradientColorArray } from "../../utils/GradientColorData";
import { notify } from "../../utils/Notify";

type Account = {
  id: number;
  account: string;
  card_color: string;
};

export const useInit = () => {
  const navigate = useNavigate();

  const [isLoading, setLoading] = useState<boolean>(true);
  const [accName, setAccName] = useState<string>("");
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [colors, setColors] = useState<string[]>(gradientColorArray);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setAccName(event.target.value);

  const handleAddAccount = () => {
    const colorIndex = Math.floor(Math.random() * colors.length);
    const randomColor = colors.splice(colorIndex, 1)[0];

    accounts.length < 5
      ? setAccounts((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            account: accName,
            card_color: randomColor,
          },
        ])
      : notify("info", "You can only add 5 accounts");

    setAccName("");
  };

  const handleRemoveAccount = (currentAcc: Account) => {
    setColors((prev) => [...prev, currentAcc.card_color]);

    const newAccounts = accounts.filter((acc) => acc.id !== currentAcc.id);
    setAccounts(newAccounts);
  };

  const handleSave = async () => {
    await writeTextFile("index.json", JSON.stringify(accounts), {
      dir: BaseDirectory.AppLocalData,
    }).then(() => navigate("/home"));
  };

  const checkUser = useCallback(async () => {
    setLoading(true);
    const isExistingUser = await exists("index.json", {
      dir: BaseDirectory.AppLocalData,
    }).finally(() => setLoading(false));

    if (isExistingUser) navigate("/home");
  }, []);

  useEffect(() => {
    checkUser();
  }, [checkUser]);

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
