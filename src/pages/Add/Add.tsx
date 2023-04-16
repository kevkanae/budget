import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Text from "@mui/material/Typography";
import { addStyles as sx } from "./Add.styles";
import { IconButton, MenuItem, Paper, Select } from "@mui/material";
import AddEntryModal, {
  MONTHS,
} from "../../components/Modals/AddEntry/AddEntry.modal";
import dayjs from "dayjs";
import { DeleteForeverOutlined, EditSharp } from "@mui/icons-material";
import Pagination from "@mui/material/Pagination";
import useAdd from "./Add.hook";

const Add = () => {
  const {
    type,
    handleAdd,
    setMonthValue,
    monthValue,
    rows,
    handleEdit,
    handleRemove,
    page,
    handleChange,
    showModal,
    setShowModal,
    fetchRows,
    selectedRow,
  } = useAdd();

  return (
    <Box sx={sx.root}>
      <Box sx={sx.header}>
        <Text sx={sx.h3}>{type}</Text>
        <Button variant="outlined" color="primary" onClick={handleAdd}>
          Add {type}
        </Button>
      </Box>

      <Select
        onChange={({ target }) => {
          setMonthValue(Number(target.value));
        }}
        defaultValue={monthValue}
        value={monthValue}
        displayEmpty
        sx={{ width: "21%", mt: 2 }}
      >
        {MONTHS.map((month) => (
          <MenuItem key={month.id} value={month.id}>
            {month.name}
          </MenuItem>
        ))}
      </Select>

      {rows.length > 0 ? (
        <Box sx={sx.listWrapper}>
          {rows.map((row, i) => (
            <Paper sx={sx.listItem} key={i}>
              <Box sx={sx.left}>
                <Text sx={sx.title}>{row.title}</Text>
                <Text sx={sx.comment}>{row.desc}</Text>
                <Text sx={sx.date}>
                  {dayjs(row.updatedAt).format("MMMM DD, YYYY [at] hh:mm A")}
                </Text>
              </Box>

              <Box sx={sx.mid}>
                <Text sx={sx.amount}>${row.amount}</Text>
              </Box>

              <Box sx={sx.right}>
                <IconButton onClick={() => handleEdit(row)}>
                  <EditSharp />
                </IconButton>
                <IconButton onClick={() => handleRemove(row)}>
                  <DeleteForeverOutlined />
                </IconButton>
              </Box>
            </Paper>
          ))}
        </Box>
      ) : (
        <Box sx={sx.noData} onClick={handleAdd}>
          Add {type} to get started
        </Box>
      )}

      <Box sx={sx.paginationWrapper}>
        <Pagination
          color="primary"
          count={10}
          page={page}
          onChange={handleChange}
        />
      </Box>

      <AddEntryModal
        show={showModal}
        hideModal={() => {
          setShowModal(false);
          fetchRows();
        }}
        type={type}
        selectedRow={selectedRow}
      />
    </Box>
  );
};

export default Add;
