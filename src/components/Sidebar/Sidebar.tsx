import { useNavigate } from "@tanstack/react-router";
import CreditCard from "../../assets/CreditCard";
import Dashboard from "../../assets/Dashboard";
import Debts from "../../assets/Debts";
import Investment from "../../assets/Investment";
import Notes from "../../assets/Notes";
import sx from "./Sidebar.module.scss";

const Sidebar = () => {
  const navigate = useNavigate();

  const sidebarData = [
    {
      id: 1,
      name: "Dashboard",
      link: "/",
      icon: <Dashboard />,
    },
    {
      id: 2,
      name: "Income",
      link: "/income",
      icon: <Notes />,
    },
    {
      id: 3,
      name: "Expense",
      link: "/expense",
      icon: <CreditCard />,
    },
    {
      id: 4,
      name: "Debt",
      link: "/debt",
      icon: <Debts />,
    },
    {
      id: 5,
      name: "Investment",
      link: "/investment",
      icon: <Investment />,
    },
  ];

  return (
    <div className={sx.root}>
      {sidebarData.map((data) => (
        <div
          className={sx.item}
          data-text={data.name}
          key={data.id}
          onClick={() =>
            navigate({
              to: data.link as any,
            })
          }
        >
          {data.icon}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
