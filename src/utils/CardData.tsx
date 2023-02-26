import CreditCard from "../assets/CreditCard";
import Dashboard from "../assets/Dashboard";
import Debts from "../assets/Debts";
import Investment from "../assets/Investment";
import Notes from "../assets/Notes";

export const cardData = [
  {
    id: 2,
    name: "Incomes",
    link: "/income",
    icon: <Notes color="#000" />,
  },
  {
    id: 3,
    name: "Expenses",
    link: "/expense",
    icon: <CreditCard color="#000" />,
  },
  {
    id: 4,
    name: "Mortgages & Loans",
    link: "/debt",
    icon: <Debts color="#000" />,
  },
  {
    id: 5,
    name: "Investments",
    link: "/investment",
    icon: <Investment color="#000" />,
  },
];
