import { cardData } from "../../utils/CardData";
import { useProfileStore } from "../../utils/Store";
import Card from "./Card";
import Graph from "./Graph";
import { homeStyles as sx } from "./Home.styles";
import { invoke } from "@tauri-apps/api/tauri";
import { useCallback, useEffect } from "react";
import Box from "@mui/material/Box";
import Text from "@mui/material/Typography";

const Home = () => {
  const { profiles, updateProfile } = useProfileStore((state) => state);

  const getProfiles = useCallback(async () => {
    const res: string[] = await invoke("get_profiles");
    if (res.length > 0) {
      console.log(res);
      updateProfile(res);
    } else {
      console.log("No profiles found");
    }
  }, []);

  useEffect(() => {
    getProfiles();
  }, []);

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
