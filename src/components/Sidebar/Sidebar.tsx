import { useNavigate } from "react-router-dom";
import { navigationData } from "../../utils/NavigationData";
import sx from "./Sidebar.module.scss";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className={sx.root}>
      {navigationData.map((data) => (
        <div
          className={sx.item}
          data-text={data.name}
          key={data.id}
          onClick={() => navigate(data.link)}
        >
          {data.icon}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
