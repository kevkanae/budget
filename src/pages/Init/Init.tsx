import { initStyles as sx } from "./Init.styles";
import Box from "@mui/material/Box";
import { useQuery } from "@tanstack/react-query";
import { exists, BaseDirectory } from "@tauri-apps/api/fs";
import { useState, useEffect, useCallback } from "react";
import { useModalStore } from "../../utils/useModalStore";
import { useNavigate } from "react-router-dom";

const Init = () => {
  const navigate = useNavigate();
  const setModal = useModalStore((state) => state.setModal);

  const [isLoading, setLoading] = useState<boolean>(true);

  const checkUser = useCallback(async () => {
    setLoading(true);
    const isExistingUser = await exists("index.json", {
      dir: BaseDirectory.AppLocalData,
    }).finally(() => setLoading(false));

    isExistingUser
      ? navigate("/home")
      : setModal("ADD_ACCOUNT", { show: true });
  }, []);

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  return <Box sx={sx.root} />;
};

export default Init;
