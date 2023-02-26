import ArrowRight from "../../assets/ArrowRIght";
import sx from "./Home.module.scss";

type Card = {
  id: number;
  name: string;
  link: string;
  icon: JSX.Element;
};

const Card = ({ data }: { data: Card }) => {
  return (
    <div className={sx.card}>
      <div className={sx.cardHeader}>
        {data.icon}
        <p className={sx.cardOverview}>
          <span className={sx.red}>+2.11%</span> vs last 30 days
        </p>
      </div>

      <h4>+$ 3039</h4>

      <div className={sx.cardFooter}>
        <p className={sx.cardLink}>{data.name}</p> <ArrowRight color="#AAA" />
      </div>
    </div>
  );
};
export default Card;
