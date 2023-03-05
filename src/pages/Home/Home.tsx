import { cardData } from "../../utils/CardData";
import { useProfileStore } from "../../utils/Store";
import Card from "./Card";
import Graph from "./Graph";
import sx from "./Home.module.scss";
import { invoke } from "@tauri-apps/api/tauri";
import { useCallback, useEffect } from "react";

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
    <div className={sx.root}>
      <h3>Overview</h3>
      <p className={sx.summary}>
        You spent <span className={sx.red}>$444</span> and earned{" "}
        <span className={sx.green}>$434</span> this month
      </p>
      <div className={sx.cardWrapper}>
        {cardData.map((data) => (
          <Card data={data} key={data.id} />
        ))}
      </div>
      <Graph />
    </div>
  );
};

export default Home;
