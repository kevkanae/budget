import Note from "@mui/icons-material/AttachMoney";
import CreditCard from "@mui/icons-material/CreditCard";
import Debts from "@mui/icons-material/PieChart";
import Investment from "@mui/icons-material/Savings";
import { Param } from "./UserData.type";

export type CardDataType = {
  id: number;
  name: string;
  link: Param;
  icon: JSX.Element;
};

export const cardData: CardDataType[] = [
  {
    id: 1,
    name: "Incomes",
    link: "income",
    icon: <Note />,
  },
  {
    id: 2,
    name: "Expenses",
    link: "expense",
    icon: <CreditCard />,
  },
  {
    id: 3,
    name: "Mortgages & Loans",
    link: "debt",
    icon: <Debts />,
  },
  {
    id: 4,
    name: "Investments",
    link: "investment",
    icon: <Investment />,
  },
];
