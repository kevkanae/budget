import Box from "@mui/material/Box";
import Text from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import { addEntryStyles as sx } from "./AddEntry.styles";
import { modalStyles } from "../Root.modal";
import { Close } from "@mui/icons-material";
import Button from "@mui/material/Button";
import { Controller } from "react-hook-form";
import { MenuItem, Select } from "@mui/material";
import CustomInput from "./CustomInput";
import useAddEntry from "./AddEntry.hook";

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
  const { control, handleSubmit, hideModal, handleSave } = useAddEntry(type);

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
          <Text sx={sx.header}>Add {type}</Text>
          <IconButton onClick={() => hideModal()}>
            <Close />
          </IconButton>
        </Box>

        <Box sx={sx.content}>
          <form style={sx.form} onSubmit={handleSubmit(handleSave)}>
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
            <Box width={"100%"}>
              <Button type="submit" variant="contained" sx={{ float: "right" }}>
                Save
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Modal>
  );
};
export default AddEntryModal;
