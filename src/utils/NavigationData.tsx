import Note from "@mui/icons-material/AttachMoney";
import CreditCard from "@mui/icons-material/CreditCard";
import Debts from "@mui/icons-material/PieChart";
import Investment from "@mui/icons-material/Savings";
import Dashboard from "@mui/icons-material/GridView";

export const navigationData = [
  {
    id: 1,
    name: "Dashboard",
    link: "/",
    icon: <Dashboard />,
  },
  {
    id: 2,
    name: "Income",
    link: "income",
    icon: <Note />,
  },
  {
    id: 3,
    name: "Expense",
    link: "expense",
    icon: <CreditCard />,
  },
  {
    id: 4,
    name: "Debt",
    link: "debt",
    icon: <Debts />,
  },
  {
    id: 5,
    name: "Investment",
    link: "investment",
    icon: <Investment />,
  },
];
