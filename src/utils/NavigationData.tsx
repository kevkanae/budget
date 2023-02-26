import CreditCard from "../assets/CreditCard";
import Dashboard from "../assets/Dashboard";
import Debts from "../assets/Debts";
import Investment from "../assets/Investment";
import Notes from "../assets/Notes";

export const navigationData = [
  {
    id: 1,
    name: "Dashboard",
    link: "/",
    icon: <Dashboard color="#FFF" />,
  },
  {
    id: 2,
    name: "Income",
    link: "/income",
    icon: <Notes color="#FFF" />,
  },
  {
    id: 3,
    name: "Expense",
    link: "/expense",
    icon: <CreditCard color="#FFF" />,
  },
  {
    id: 4,
    name: "Debt",
    link: "/debt",
    icon: <Debts color="#FFF" />,
  },
  {
    id: 5,
    name: "Investment",
    link: "/investment",
    icon: <Investment color="#FFF" />,
  },
];
