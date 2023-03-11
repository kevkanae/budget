import { headerStyles as sx } from "./Header.styles";
import { invoke } from "@tauri-apps/api/tauri";
import { useCallback, useEffect, useRef, useState } from "react";
import { useProfileStore } from "../../utils/Store";
import SettingsIcon from "@mui/icons-material/SettingsOutlined";
import IconButton from "@mui/material/IconButton";
import { useClickOutside } from "../../hooks/useClickOutside";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Text from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const Header = () => {
  const navigate = useNavigate();

  const { profiles, updateProfile } = useProfileStore((state) => state);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

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

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={sx.root}>
      <Text sx={sx.brand}>Okane</Text>

      <Box sx={sx.actions}>
        <select style={sx.profiles} name="profiles">
          {profiles.map((profile) => (
            <option value={profile}>{profile}</option>
          ))}
        </select>

        <IconButton aria-label="delete" onClick={handleClick}>
          <SettingsIcon />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={() => navigate("/profile")}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>Theme</MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default Header;
