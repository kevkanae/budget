import { FaMoneyBillWaveAlt as Note } from "react-icons/fa";
import {
  BsCreditCard2Front as CreditCard,
  BsFillBarChartLineFill as Investment,
} from "react-icons/bs";
import {
  AiOutlineHome as Dashboard,
  AiOutlinePieChart as Debts,
} from "react-icons/ai";

export const navigationData = [
  {
    id: 1,
    name: "Dashboard",
    link: "/",
    icon: <Dashboard color="#FFF" size={21} />,
  },
  {
    id: 2,
    name: "Income",
    link: "/income",
    icon: <Note color="#FFF" size={21} />,
  },
  {
    id: 3,
    name: "Expense",
    link: "/expense",
    icon: <CreditCard color="#FFF" size={21} />,
  },
  {
    id: 4,
    name: "Debt",
    link: "/debt",
    icon: <Debts color="#FFF" size={21} />,
  },
  {
    id: 5,
    name: "Investment",
    link: "/investment",
    icon: <Investment color="#FFF" size={21} />,
  },
];
