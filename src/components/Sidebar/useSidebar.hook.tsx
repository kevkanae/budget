import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SelectChangeEvent } from "@mui/material/Select";
import { useProfileStore } from "../../store/useProfileStore";
import { useThemeStore } from "../../store/UseThemeStore";
import { useDatabaseStore } from "../../store/useDatabaseStore";
import { Account } from "../../utils/Database.type";

export const useSidebar = () => {
  const navigate = useNavigate();
  const { userData } = useDatabaseStore((state) => state);
  const { updateProfile } = useProfileStore((state) => state);
  const { prefersDarkMode, setMode } = useThemeStore((state) => state);

  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const [selectedProfile, setSelectedProfile] = useState<Account>();

  useEffect(() => {
    if (userData) {
      setSelectedProfile(userData.accounts[0]);
      updateProfile(userData.accounts[0]);
    }
  }, [userData]);

  const handleSettingsClose = () => setAnchor(null);
  const handleSettingsOpen = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchor(event.currentTarget);

  const handleProfileChange = (e: SelectChangeEvent) => {
    if (userData) {
      const currentProfile = userData.accounts.find(
        ({ id }) => id === Number(e.target.value)
      );
      updateProfile(currentProfile!);
      setSelectedProfile(currentProfile!);
    }
  };

  const handleThemeToggle = () => setMode(prefersDarkMode ? "light" : "dark");

  return {
    navigate,
    userData,
    anchor,
    selectedProfile,
    prefersDarkMode,
    handleSettingsOpen,
    handleSettingsClose,
    handleProfileChange,
    handleThemeToggle,
  };
};
