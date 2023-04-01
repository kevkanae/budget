import { headerStyles as sx } from "./Header.styles";
import SettingsIcon from "@mui/icons-material/SettingsOutlined";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Text from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useHeader } from "./useHeader.hook";

const Header = () => {
  const {
    navigate,
    profileData,
    anchor,
    selectedProfile,
    handleSettingsOpen,
    handleSettingsClose,
    handleProfileChange,
    prefersDarkMode,
    handleThemeToggle,
  } = useHeader();

  return (
    <Box sx={sx.root}>
      <Text sx={sx.brand}>Okane</Text>

      <Box sx={sx.actions}>
        {/* <select
          style={sx.profiles}
          name="profiles"
          value={selectedProfile?.id}
          onChange={handleProfileChange}
        >
          {profileData?.map((profile) => (
            <option key={profile.id} value={profile.id}>
              {profile.name}
            </option>
          ))}
        </select> */}

        <IconButton
          aria-label="Settings"
          onClick={handleSettingsOpen}
          color="secondary"
        >
          <SettingsIcon />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchor}
          open={!!anchor}
          onClose={handleSettingsClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={() => navigate("/profile")}>Profile</MenuItem>
          <MenuItem onClick={handleThemeToggle}>
            {prefersDarkMode ? "Light" : "Dark"}
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default Header;
