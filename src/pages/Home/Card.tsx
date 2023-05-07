import { homeStyles as sx } from "./Home.styles";
import Box from "@mui/material/Box";
import Text from "@mui/material/Typography";
import ArrowRight from "@mui/icons-material/East";
import { useNavigate } from "react-router-dom";
import { useCentralStore } from "../../store/useDatabaseStore";
import { useProfileStore } from "../../store/useProfileStore";
import { useCallback, useEffect, useState } from "react";
import { useAmountStore } from "../../store/useAmountStore";
import { Param } from "../../utils/UserData.type";

type Card = {
  id: number;
  name: string;
  link: Param;
  icon: JSX.Element;
};

const Card = ({ data }: { data: Card }) => {
  const navigate = useNavigate();
  const { db } = useCentralStore((state) => state);
  const { accountIndex } = useProfileStore((state) => state);
  const value = useAmountStore((state) => state);

  const [percentage, setPercentage] = useState(0);

  const calculateGainLoss = useCallback(() => {
    let per: number = 0;

    db.userData[accountIndex].data.forEach((item) => {
      if (item.type === data.link) {
        per += Number(item.amount);
      }
    });

    setPercentage(per);
  }, [db, accountIndex, data.link]);

  useEffect(() => {
    calculateGainLoss();
  }, [db, accountIndex, calculateGainLoss]);

  return (
    <Box sx={sx.card}>
      <Box sx={sx.cardHeader}>
        {data.icon}
        {percentage !== 0 ? (
          <Text sx={sx.cardOverview}>
            <Text component={"span"} sx={sx.red}>
              +2.11%
            </Text>{" "}
            vs last 30 days
          </Text>
        ) : (
          <Text sx={sx.cardOverview}>N/A</Text>
        )}
      </Box>

      <Text sx={sx.h3}>${value[data.link].amount}</Text>

      <Box sx={sx.cardFooter}>
        <Text sx={sx.cardLink} onClick={() => navigate(data.link)}>
          {data.name}
        </Text>{" "}
        <ArrowRight />
      </Box>
    </Box>
  );
};
export default Card;
