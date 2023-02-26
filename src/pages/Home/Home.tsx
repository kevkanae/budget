import { cardData } from "../../utils/CardData";
import Card from "./Card";
import Graph from "./Graph";
import sx from "./Home.module.scss";

const Home = () => {
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
