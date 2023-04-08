import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import Box from "@mui/material/Box";
import { SxProps } from "@mui/material/styles";
import { exists, BaseDirectory, readTextFile } from "@tauri-apps/api/fs";
import { useState, useEffect, useCallback } from "react";
import Loader from "../components/Loader/Loader";
import { notify } from "../utils/Notify";
import { useDatabaseStore } from "../store/useDatabaseStore";
import { DB } from "../utils/Database.type";

const Layout = () => {
  const { userData, initialUpdate } = useDatabaseStore((state) => state);
  const [indexFileExists, setIndexFileExists] = useState<boolean>(true);
  const [isLoading, setLoading] = useState<boolean>(false);

  const root: SxProps = {
    height: "100vh",
    width: "100%",
    display: "grid",
    gridTemplateColumns: {
      xs: "0 100vw",
      md: "14vw 86vw",
    },

    bgcolor: "background.default",
  };

  const checkUser = useCallback(async () => {
    try {
      setLoading(true);
      await exists("index.json", {
        dir: BaseDirectory.Download,
      })
        .then(async (isExists) => {
          if (isExists) {
            await readTextFile("index.json", {
              dir: BaseDirectory.Download,
            }).then((data) => {
              const parsedData: DB = JSON.parse(data);

              initialUpdate(parsedData);
              setIndexFileExists(false);
            });
          } else {
            setIndexFileExists(false);
            notify("error", "App data not found");
          }
        })
        .finally(() => setLoading(false));
    } catch (error) {
      console.log(error);
      notify("error", "Something went wrong");
    }
  }, []);

  useEffect(() => {
    setLoading(true);

    if (!userData) {
      checkUser();
    }
    setLoading(false);
  }, [checkUser]);

  if (isLoading) return <Loader height={"100vh"} width={"100%"} />;

  return (
    <Box sx={root}>
      <Sidebar />
      {indexFileExists ? <Outlet /> : <Navigate to="/" />}
    </Box>
  );
};

export default Layout;
