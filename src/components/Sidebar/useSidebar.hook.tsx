import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SelectChangeEvent } from "@mui/material/Select";
import { useProfileStore } from "../../store/useProfileStore";
import { useThemeStore } from "../../store/UseThemeStore";
import { useDatabaseStore } from "../../store/useDatabaseStore";
import { Account } from "../../utils/Database.type";

export const useSidebar = () => {
  const navigate = useNavigate();
  const { userData } = useDatabaseStore((state) => state);
  const profileData = userData!.accounts;

  const { updateProfile } = useProfileStore((state) => state);

  const { prefersDarkMode, setMode } = useThemeStore((state) => state);

  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const [selectedProfile, setSelectedProfile] = useState<Account>(
    profileData[0]
  );

  const handleSettingsOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchor(event.currentTarget);
  };

  const handleSettingsClose = () => {
    setAnchor(null);
  };

  const handleProfileChange = (e: SelectChangeEvent) => {
    const currentProfile = profileData.find(
      ({ id }) => id === Number(e.target.value)
    );
    updateProfile(currentProfile!);
    setSelectedProfile(currentProfile!);
  };

  const handleThemeToggle = () => setMode(prefersDarkMode ? "light" : "dark");

  return {
    navigate,
    profileData,
    anchor,
    selectedProfile,
    prefersDarkMode,
    handleSettingsOpen,
    handleSettingsClose,
    handleProfileChange,
    handleThemeToggle,
  };
};
