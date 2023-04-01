import { useState } from "react";
import { Profile, useProfileStore } from "../../utils/useProfileStore";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { invoke } from "@tauri-apps/api";
import { useThemeStore } from "../../utils/UseThemeStore";

export const useHeader = () => {
  const navigate = useNavigate();

  const { profiles, updateProfileList, updateProfile } = useProfileStore(
    (state) => state
  );

  const { prefersDarkMode, setMode } = useThemeStore((state) => state);

  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const [selectedProfile, setSelectedProfile] = useState<null | Profile>(null);

  const profileData: any = [];

  const handleSettingsOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchor(event.currentTarget);
  };

  const handleSettingsClose = () => {
    setAnchor(null);
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const curr = profiles.find(
      (profile) => profile.id === Number(e.currentTarget.value)
    );
    updateProfile(curr!);
    setSelectedProfile(curr!);
  };

  const handleThemeToggle = () => setMode(prefersDarkMode ? "light" : "dark");

  return {
    navigate,
    profileData,
    anchor,
    selectedProfile,
    handleSettingsOpen,
    handleSettingsClose,
    handleProfileChange,
    prefersDarkMode,
    handleThemeToggle,
  };
};
