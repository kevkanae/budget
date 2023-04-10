import Box from "@mui/material/Box";
import Text from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { addEntryStyles as sx } from "./AddEntry.styles";
import { modalStyles } from "../Root.modal";
import { AddCircle, Close } from "@mui/icons-material";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { useModalStore } from "../../../store/useModalStore";
import { useForm, Controller } from "react-hook-form";
import { MenuItem, Select, TextField } from "@mui/material";
import CustomInput from "./CustomInput";

const months = [
  { id: 1, abbr: "Jan", name: "January" },
  { id: 2, abbr: "Feb", name: "February" },
  { id: 3, abbr: "Mar", name: "March" },
  { id: 4, abbr: "Apr", name: "April" },
  { id: 5, abbr: "May", name: "May" },
  { id: 6, abbr: "Jun", name: "June" },
  { id: 7, abbr: "Jul", name: "July" },
  { id: 8, abbr: "Aug", name: "August" },
  { id: 9, abbr: "Sep", name: "September" },
  { id: 10, abbr: "Oct", name: "October" },
  { id: 11, abbr: "Nov", name: "November" },
  { id: 12, abbr: "Dec", name: "December" },
];

export type FormType = {
  title: string;
  comment: string;
  amount: number;
  month: number;
};

type Props = {
  show: boolean;
  type: "income" | "expense" | "debt" | "investment";
};

const AddEntryModal = ({ show, type }: Props) => {
  const { control, setValue } = useForm<FormType>();
  const hideModal = useModalStore((state) => state.hideModal);

  useEffect(() => {
    const currentMonth = new Date().getMonth() + 1;
    setValue("month", currentMonth);
  }, []);

  const handleSave = async () => {
    // await writeTextFile("index.json", JSON.stringify(accounts), {
    //   dir: BaseDirectory.AppLocalData,
    // }).then(() => navigate("/home"));
  };

  return (
    <Modal open={show} onClose={() => hideModal()}>
      <Box
        sx={{
          ...modalStyles,
          px: 4,
          py: 2,
          width: "49%",
        }}
      >
        <Box sx={sx.top}>
          <Text sx={sx.header}>Add Accounts</Text>
          <IconButton onClick={() => hideModal()}>
            <Close />
          </IconButton>
        </Box>

        <Box sx={sx.content}>
          <form style={sx.form}>
            <CustomInput
              name="title"
              control={control}
              placeholder="Enter Title"
              type="text"
              required={true}
            />
            <CustomInput
              name="comment"
              control={control}
              placeholder="Add a Comment/Description/Category"
              type="text"
              required={false}
            />

            <Box sx={sx.subform}>
              <CustomInput
                name="amount"
                control={control}
                placeholder="Enter Amount"
                type="number"
                required={true}
                fullWidth={false}
              />
              <Controller
                name={"month"}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Select
                    onChange={(e) => {
                      console.log(e.target.value);
                      onChange(e.target.value);
                    }}
                    defaultValue={value}
                    value={value}
                    displayEmpty
                    sx={{ width: "48%" }}
                  >
                    {months.map((month) => (
                      <MenuItem key={month.id} value={month.id}>
                        {month.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </Box>
          </form>
          <Box>
            <Button onClick={handleSave}>Save</Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
export default AddEntryModal;
