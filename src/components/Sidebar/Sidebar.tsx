import { useNavigate } from "react-router-dom";
import { navigationData } from "../../utils/NavigationData";
import { sidebarStyles as sx } from "./Sidebar.styles";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <Box sx={sx.root}>
      {navigationData.map((data) => (
        <Tooltip title={data.name} placement="right">
          <Box
            sx={sx.item}
            data-text={data.name}
            key={data.id}
            onClick={() => navigate(data.link)}
          >
            {data.icon}
          </Box>
        </Tooltip>
      ))}
    </Box>
  );
};

export default Sidebar;
