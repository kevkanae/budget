import Box from "@mui/material/Box";
import Text from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { addAccountStyles as sx } from "./AddAccount.styles";
import { modalStyles } from "../Root.modal";
import { AddCircle } from "@mui/icons-material";
import { useState } from "react";
// import { generateLinearGradient } from "../../../utils/GradientColorData";
import Button from "@mui/material/Button";
import { writeTextFile, BaseDirectory } from "@tauri-apps/api/fs";
import { useNavigate } from "react-router-dom";

type Account = {
  account: string;
  card_color: string;
};

type Props = { show: boolean };
const AddAccountModal = ({ show }: Props) => {
  const navigate = useNavigate();
  const [accName, setAccName] = useState<string>("");
  const [accounts, setAccounts] = useState<Account[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setAccName(event.target.value);

  const handleAddAccount = () => {
    setAccounts((prev) => [
      ...prev,
      {
        account: accName,
        card_color: "random",
      },
    ]);
  };

  const handleSave = async () => {
    await writeTextFile("index.json", JSON.stringify(accounts), {
      dir: BaseDirectory.AppLocalData,
    }).then(() => navigate("/home"));
  };

  return (
    <Modal open={show}>
      <Box
        sx={{
          ...modalStyles,
          p: 4,
          height: "35%",
        }}
      >
        <Text sx={sx.header}>Add Accounts</Text>
        <Box>
          <Paper sx={sx.addPaper}>
            <InputBase
              sx={sx.input}
              placeholder="Add Your Account"
              onChange={handleInputChange}
            />
            <IconButton
              sx={sx.addButton}
              color="primary"
              type="reset"
              onClick={handleAddAccount}
            >
              <AddCircle />
            </IconButton>
          </Paper>
          <Divider variant="middle" sx={{ my: 3 }} />
          {accounts.map((acc) => (
            <Box>{acc.account}</Box>
          ))}
          <Box>
            <Button onClick={handleSave}>Save</Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
export default AddAccountModal;
