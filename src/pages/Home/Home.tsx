import { cardData } from "../../utils/CardData";
import Card from "./Card";
import Graph from "./Graph";
import { homeStyles as sx } from "./Home.styles";
import Box from "@mui/material/Box";
import Text from "@mui/material/Typography";

const Home = () => {
  return (
    <Box sx={sx.root}>
      <Text sx={sx.h3}>Overview</Text>
      <Text sx={sx.summary}>
        You spent{" "}
        <Text component={"span"} sx={sx.red}>
          $444
        </Text>{" "}
        and earned{" "}
        <Text component={"span"} sx={sx.green}>
          $434
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
