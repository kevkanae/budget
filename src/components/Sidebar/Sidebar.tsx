import { navigationData } from "../../utils/NavigationData";
import { sidebarStyles as sx } from "./Sidebar.styles";
import SettingsIcon from "@mui/icons-material/SettingsOutlined";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Text from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useSidebar } from "./useSidebar.hook";

const Sidebar = () => {
  const {
    navigate,
    accountData,
    anchor,
    selectedProfile,
    prefersDarkMode,
    handleSettingsOpen,
    handleSettingsClose,
    handleProfileChange,
    handleThemeToggle,
  } = useSidebar();

  return (
    <Box sx={sx.root}>
      <Box sx={sx.avatarWrapper}>
        <Text sx={sx.brand}>O K A N E</Text>
      </Box>
      {navigationData.map((data) => (
        <Box
          sx={sx.item}
          data-text={data.name}
          key={data.id}
          onClick={() => navigate(data.link)}
        >
          {data.icon}
          <Text>{data.name}</Text>
        </Box>
      ))}
      <Box sx={sx.actions}>
        {accountData && selectedProfile && (
          <FormControl sx={{ width: "100%" }} size="small">
            <InputLabel id="Account-Select">Account</InputLabel>
            <Select
              labelId="Account-Select"
              id="Account-Select"
              sx={sx.profiles}
              value={selectedProfile.id.toString()}
              label="Account"
              fullWidth
              onChange={handleProfileChange}
            >
              {accountData.map((profile) => (
                <MenuItem key={profile.id} value={profile.id}>
                  {profile.accountName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

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

export default Sidebar;
