import { useState } from "react";
import { Profile, useProfileStore } from "../../utils/useProfileStore";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { invoke } from "@tauri-apps/api";

export const useHeader = () => {
  const navigate = useNavigate();

  const { profiles, updateProfileList, updateProfile } = useProfileStore(
    (state) => state
  );

  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const [selectedProfile, setSelectedProfile] = useState<null | Profile>(null);

  const { data: profileData } = useQuery({
    queryKey: ["GetProfiles"],
    queryFn: () => invoke<Profile[]>("get_profiles"),
    onSuccess(data) {
      updateProfileList(data);
      setSelectedProfile(data[0]);
    },
  });

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

  return {
    navigate,
    profileData,
    anchor,
    selectedProfile,
    handleSettingsOpen,
    handleSettingsClose,
    handleProfileChange,
  };
};
