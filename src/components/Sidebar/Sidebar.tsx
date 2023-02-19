import sx from "./Sidebar.module.scss";

const Sidebar = () => {
  return (
    <div className={sx.root}>
      <div className={sx.item}>
        <p>-</p>
        <p>Dashboard</p>
      </div>
      <div className={sx.item}>
        <p>-</p>
        <p>Income</p>
      </div>
      <div className={sx.item}>
        <p>-</p>
        <p>Expense</p>
      </div>
      <div className={sx.item}>
        <p>-</p>
        <p>Debts</p>
      </div>
      <div className={sx.item}>
        <p>-</p>
        <p>Investments</p>
      </div>
    </div>
  );
};

export default Sidebar;
