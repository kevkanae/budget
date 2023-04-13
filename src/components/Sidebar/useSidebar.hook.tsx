import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SelectChangeEvent } from "@mui/material/Select";
import { useProfileStore } from "../../store/useProfileStore";
import { useThemeStore } from "../../store/UseThemeStore";
import { useDatabaseStore } from "../../store/useDatabaseStore";
import { Account } from "../../utils/Database.type";

export const useSidebar = () => {
  const navigate = useNavigate();
  const { accountData } = useDatabaseStore((state) => state);
  const { updateProfile } = useProfileStore((state) => state);
  const { prefersDarkMode, setMode } = useThemeStore((state) => state);

  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const [selectedProfile, setSelectedProfile] = useState<Account>(
    accountData[0]
  );

  useEffect(() => {
    if (accountData) {
      updateProfile(accountData[0]);
    }
  }, [accountData]);

  const handleSettingsClose = () => setAnchor(null);
  const handleSettingsOpen = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchor(event.currentTarget);

  const handleProfileChange = (e: SelectChangeEvent) => {
    if (accountData) {
      const currentProfile = accountData.find(
        ({ id }) => id === Number(e.target.value)
      );
      updateProfile(currentProfile!);
      setSelectedProfile(currentProfile!);
    }
  };

  const handleThemeToggle = () => setMode(prefersDarkMode ? "light" : "dark");

  return {
    navigate,
    accountData,
    anchor,
    selectedProfile,
    prefersDarkMode,
    handleSettingsOpen,
    handleSettingsClose,
    handleProfileChange,
    handleThemeToggle,
  };
};
