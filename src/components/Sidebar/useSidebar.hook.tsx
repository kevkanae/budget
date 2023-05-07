import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SelectChangeEvent } from "@mui/material/Select";
import { useProfileStore } from "../../store/useProfileStore";
import { useThemeStore } from "../../store/UseThemeStore";
import { useCentralStore } from "../../store/useDatabaseStore";
import { AccountData } from "../../utils/Database.type";

export const useSidebar = () => {
  const navigate = useNavigate();
  const { db } = useCentralStore((state) => state);
  const { profile, updateProfile } = useProfileStore((state) => state);
  const { prefersDarkMode, setMode } = useThemeStore((state) => state);

  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const [selectedProfile, setSelectedProfile] = useState<AccountData | null>(
    profile
  );

  const handleProfileChange = (e: SelectChangeEvent) => {
    const currentProfileIndex = db.userData.findIndex(
      ({ id }) => id === e.target.value
    );
    if (currentProfileIndex !== -1) {
      updateProfile(db.userData[currentProfileIndex], currentProfileIndex);
      setSelectedProfile(db.userData[currentProfileIndex]);
    }
  };

  return {
    navigate,
    db,
    anchor,
    selectedProfile,
    prefersDarkMode,
    setAnchor,
    setMode,
    handleProfileChange,
  };
};
