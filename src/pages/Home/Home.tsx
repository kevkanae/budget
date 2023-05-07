import { useCallback, useEffect, useState } from "react";
import { useCentralStore } from "../../store/useDatabaseStore";
import { cardData } from "../../utils/CardData";
import Card from "./Card";
import Graph from "./Graph";
import { homeStyles as sx } from "./Home.styles";
import Box from "@mui/material/Box";
import Text from "@mui/material/Typography";
import { useProfileStore } from "../../store/useProfileStore";

const Home = () => {
  const { db } = useCentralStore((state) => state);
  const { accountIndex } = useProfileStore((state) => state);

  const [gainLoss, setGainLoss] = useState({ gain: 0, loss: 0 });

  const calculateGainLoss = useCallback(() => {
    let gain: number = 0;
    let loss: number = 0;
    db.userData[accountIndex].data.forEach((data) => {
      if (data.type === "income") {
        gain += Number(data.amount);
      } else if (data.type === "expense" || data.type === "debt") {
        loss += Number(data.amount);
      }
    });
    setGainLoss({ gain, loss });
  }, [db, accountIndex]);

  useEffect(() => {
    calculateGainLoss();
  }, [db, accountIndex, calculateGainLoss]);

  return (
    <Box sx={sx.root}>
      <Text sx={sx.h3}>Overview</Text>
      <Text sx={sx.summary}>
        You spent{" "}
        <Text component={"span"} sx={sx.red}>
          ${gainLoss.loss}
        </Text>{" "}
        and earned{" "}
        <Text component={"span"} sx={sx.green}>
          ${gainLoss.gain}
        </Text>{" "}
        this month
      </Text>
      <Box sx={sx.cardWrapper}>
        {cardData.map((data) => (
          <Card data={data} key={data.id} />
        ))}
      </Box>
      <Graph />
    </Box>
  );
};

export default Home;
