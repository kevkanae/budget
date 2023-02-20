import { useNavigate } from "@tanstack/react-router";
import sx from "./Sidebar.module.scss";

const Sidebar = () => {
  const navigate = useNavigate();

  const sidebarData = [
    {
      id: 1,
      name: "Dashboard",
      link: "/",
    },
    {
      id: 2,
      name: "Income",
      link: "/income",
    },
    {
      id: 3,
      name: "Expense",
      link: "/expense",
    },
    {
      id: 4,
      name: "Debt",
      link: "/debt",
    },
    {
      id: 5,
      name: "Investment",
      link: "/investment",
    },
  ];

  return (
    <div className={sx.root}>
      {sidebarData.map((data) => (
        <div
          className={sx.item}
          key={data.id}
          onClick={() =>
            navigate({
              to: data.link as any,
            })
          }
        >
          <p>-</p>
          <p>{data.name}</p>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
