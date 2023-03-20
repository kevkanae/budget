import Box from "@mui/material/Box";
import Text from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { useModalStore } from "../../../utils/useModalStore";
import { addAccountStyles as sx } from "./AddAccount.styles";
import { modalStyles } from "../Root.modal";
import { AddCircle } from "@mui/icons-material";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { invoke } from "@tauri-apps/api";
import { generateLinearGradient } from "../../../utils/ColorGen";
import Button from "@mui/material/Button";

type Account = {
  account: string;
  card_color: string;
};

type Props = { show: boolean };
const AddAccountModal = ({ show }: Props) => {
  const [account, setAccount] = useState<string>("");
  const [accounts, setAccounts] = useState<Account[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setAccount(event.target.value);

  const handleAddAccount = () => {
    setAccounts((prev) => [
      ...prev,
      {
        account: account,
        card_color: generateLinearGradient(),
      },
    ]);
  };

  const handleSave = () => {
    invoke<any>("add_account", {
      newAccount: accounts,
    }).then(() => {
      console.log("HIIII");
    });
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
          {/* <Divider variant="middle" />
          <Box sx={sx.addPaper}></Box> */}
          <Button onClick={handleSave}>Save</Button>
        </Box>
      </Box>
    </Modal>
  );
};
export default AddAccountModal;
