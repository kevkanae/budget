import { splashStyles as sx } from "./Splash.styles";
import Box from "@mui/material/Box";
import { useQuery } from "@tanstack/react-query";
import { invoke } from "@tauri-apps/api";
import { useState } from "react";
import { useModalStore } from "../../utils/useModalStore";
import { useNavigate } from "react-router-dom";

const Splash = () => {
  const navigate = useNavigate();
  const setModal = useModalStore((state) => state.setModal);
  const [newUser, setNewUser] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(true);

  invoke<boolean>("check_new_user")
    .then((accountExists) => {
      if (accountExists) navigate("/home");
      else {
        setNewUser(!accountExists);
        setModal("ADD_ACCOUNT", { show: !accountExists });
      }
    })
    .finally(() => setLoading(false));

  return (
    <Box sx={sx.root}>{isLoading ? <p>Loading</p> : <p>SSUp Bitch</p>}</Box>
  );
};

export default Splash;
