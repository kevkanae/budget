import sx from "./Header.module.scss";
import { invoke } from "@tauri-apps/api/tauri";
import { useCallback, useEffect, useRef, useState } from "react";
import { useProfileStore } from "../../utils/Store";
import { AiOutlineSetting as Settings } from "react-icons/ai";
import { useClickOutside } from "../../hooks/useClickOutside";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const { profiles, updateProfile } = useProfileStore((state) => state);

  const popoverRef = useRef<HTMLDivElement | null>(null);
  const [showPopover, setShowPopover] = useState(false);
  useClickOutside(popoverRef, () => setShowPopover(false));

  const getProfiles = useCallback(async () => {
    const res: string[] = await invoke("get_profiles");
    if (res.length > 0) {
      updateProfile(res);
    } else {
      console.log("No profiles found");
    }
  }, []);

  useEffect(() => {
    getProfiles();
  }, []);

  const handlePopover = () => setShowPopover(!showPopover);

  return (
    <div className={sx.root}>
      <p className={sx.brand}>Okane</p>

      <div className={sx.actions}>
        <select className={sx.profiles} name="profiles">
          {profiles.map((profile) => (
            <option value={profile}>{profile}</option>
          ))}
        </select>

        <Settings
          className={sx.settings}
          color={"#FFF"}
          size={24}
          onClick={handlePopover}
        />
        {showPopover && (
          <div className={sx.popover} ref={popoverRef}>
            <p onClick={() => navigate("/profiles")}>Manage Profiles</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
