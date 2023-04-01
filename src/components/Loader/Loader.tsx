import Spinner from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

interface LoaderProps {
  height?: string;
  width?: string;
}

const Loader = ({ height, width }: LoaderProps) => {
  return (
    <Box sx={{ height, width, display: "grid", placeItems: "center" }}>
      <Spinner />
    </Box>
  );
};
export default Loader;
