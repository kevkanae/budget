import { useNavigate } from "react-router-dom";

const Profiles = () => {
  const navigate = useNavigate();
  return (
    <div>
      <p onClick={() => navigate(-1)}>Back</p>
    </div>
  );
};
export default Profiles;
