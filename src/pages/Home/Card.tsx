import { BsArrowRight as ArrowRight } from "react-icons/bs";
import Box from "@mui/material/Box";
import Text from "@mui/material/Typography";
import { homeStyles as sx } from "./Home.styles";
import { useNavigate } from "react-router-dom";

type Card = {
  id: number;
  name: string;
  link: string;
  icon: JSX.Element;
};

const Card = ({ data }: { data: Card }) => {
  const navigate = useNavigate();

  return (
    <Box sx={sx.card}>
      <Box sx={sx.cardHeader}>
        {data.icon}
        <Text sx={sx.cardOverview}>
          <Text component={"span"} sx={sx.red}>
            +2.11%
          </Text>{" "}
          vs last 30 days
        </Text>
      </Box>

      <Text sx={sx.h3}>+$ 3039</Text>

      <Box sx={sx.cardFooter}>
        <Text sx={sx.cardLink} onClick={() => navigate(data.link)}>
          {data.name}
        </Text>{" "}
        <ArrowRight color="#AAA" />
      </Box>
    </Box>
  );
};
export default Card;
