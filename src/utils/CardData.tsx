import { FaMoneyBillWaveAlt as Note } from "react-icons/fa";
import {
  BsCreditCard2Front as CreditCard,
  BsFillBarChartLineFill as Investment,
} from "react-icons/bs";
import { AiOutlinePieChart as Debts } from "react-icons/ai";

export const cardData = [
  {
    id: 2,
    name: "Incomes",
    link: "income",
    icon: <Note color="#000" size={21} />,
  },
  {
    id: 3,
    name: "Expenses",
    link: "expense",
    icon: <CreditCard color="#000" size={21} />,
  },
  {
    id: 4,
    name: "Mortgages & Loans",
    link: "debt",
    icon: <Debts color="#000" size={21} />,
  },
  {
    id: 5,
    name: "Investments",
    link: "investment",
    icon: <Investment color="#000" size={21} />,
  },
];
