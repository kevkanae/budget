import { initStyles as sx } from "./Init.styles";
import Box from "@mui/material/Box";
import Text from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import { AddCircle, RemoveCircle } from "@mui/icons-material";
import { IconButton, Button } from "@mui/material";
import Loader from "../../components/Loader/Loader";
import { useInit } from "./useInit.hooks";

const Init = () => {
  const {
    isLoading,
    accName,
    accounts,
    handleInputChange,
    handleAddAccount,
    handleRemoveAccount,
    handleSave,
  } = useInit();

  if (isLoading) return <Loader height={"100vh"} width={"100%"} />;

  return (
    <Box sx={sx.root}>
      <Box sx={sx.left}>
        <Text sx={sx.title}>Okane</Text>
      </Box>

      <Box sx={sx.right}>
        <Text sx={sx.header}>Welcome</Text>
        <Box sx={sx.content}>
          {/* Input */}
          <Paper sx={sx.addPaper}>
            <InputBase
              sx={sx.input}
              placeholder="Add Account"
              value={accName}
              onChange={handleInputChange}
            />
            <IconButton
              sx={{ p: "0.7rem" }}
              color="primary"
              type="reset"
              onClick={handleAddAccount}
            >
              <AddCircle />
            </IconButton>
          </Paper>

          <Divider variant="middle" sx={{ my: 1 }} />

          {/* Accounts */}
          {accounts.length > 0 && (
            <Paper sx={sx.list}>
              {accounts.map((acc, i) => (
                <Box
                  key={i}
                  sx={sx.listItem}
                  marginBottom={i === accounts.length - 1 ? 0 : 2}
                >
                  <Text marginRight={"auto"} fontWeight={600}>
                    {acc.accountName}
                  </Text>
                  <Paper
                    sx={{
                      ...sx.colorCard,
                      backgroundImage: acc.cardColor,
                    }}
                  />
                  <IconButton
                    sx={{ p: "0.7rem" }}
                    color="error"
                    onClick={() => handleRemoveAccount(acc)}
                  >
                    <RemoveCircle />
                  </IconButton>
                </Box>
              ))}
            </Paper>
          )}

          {/* Save */}
          <Box mt={"auto"}>
            <Button
              variant={"contained"}
              disabled={accounts.length < 1}
              onClick={handleSave}
              sx={{ px: 4, py: 1 }}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Init;
