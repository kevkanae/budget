import sx from "./Header.module.scss";

const Header = () => {
  return (
    <div className={sx.root}>
      <p className={sx.brand}>Okane</p>
    </div>
  );
};

export default Header;
