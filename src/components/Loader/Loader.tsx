import sx from "./Loader.module.scss";

const Loader = () => {
  return (
    <div className={sx.root}>
      <div className={sx.loader} />
    </div>
  );
};
export default Loader;
