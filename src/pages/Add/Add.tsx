import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Text from "@mui/material/Typography";
import { addStyles as sx } from "./Add.styles";
import { useCallback, useEffect, useState } from "react";
import { IconButton, MenuItem, Paper, Select } from "@mui/material";
import { useProfileStore } from "../../store/useProfileStore";
import { useParams } from "react-router-dom";
import { useCentralStore } from "../../store/useDatabaseStore";
import { Entry } from "../../utils/Database.type";
import AddEntryModal, {
  MONTHS,
} from "../../components/Modals/AddEntry/AddEntry.modal";
import dayjs from "dayjs";
import { DeleteForeverOutlined, EditSharp } from "@mui/icons-material";
import Pagination from "@mui/material/Pagination";
import { writeTextFile, BaseDirectory } from "@tauri-apps/api/fs";
import { notify } from "../../utils/Notify";
import produce from "immer";

export type Param = "income" | "expense" | "debt" | "investment";

const Add = () => {
  const { type } = useParams<{ type: Param }>();
  const { profile } = useProfileStore((state) => state);
  const { db, updateEntry } = useCentralStore((state) => state);

  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<Entry | null>(null);
  const [rows, setRows] = useState<Entry[]>([]);
  const [monthValue, setMonthValue] = useState<number>(dayjs().month() + 1);
  const [page, setPage] = useState(1);

  const handleChange = (_: any, value: number) => {
    setPage(value);
  };

  const fetchRows = useCallback(async () => {
    if (profile) {
      setRows(
        produce(db.userData, (draft) => {
          draft
            .filter((acc) => acc.id === profile.id)[0]
            .data.filter(
              (item) => item.month === monthValue && item.type === type
            )[0];
        })[0].data
      );
    }
  }, [db.userData, profile, monthValue, type]);

  const writeToStorage = useCallback(async () => {
    try {
      await writeTextFile("index.json", JSON.stringify(db), {
        dir: BaseDirectory.Download,
      });
    } catch (error) {
      console.log(error);
      notify("error", "Something went wrong");
    }
  }, []);

  useEffect(() => {
    fetchRows();
    writeToStorage();
  }, [monthValue, fetchRows, writeToStorage]);

  const handleAdd = () => {
    setShowModal(true);
  };

  const handleEdit = (row: Entry) => {
    setSelectedRow(row);
    setShowModal(true);
  };

  const handleRemove = (row: Entry) => {
    if (profile) {
      updateEntry(row, profile.id, "delete");
      setSelectedRow(null);
      notify("success", "Sucessfully deleted");
    }
  };

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
        <Box sx={sx.noData}>Add {type} to get started</Box>
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
        type={type as Param}
        selectedRow={selectedRow}
      />
    </Box>
  );
};

export default Add;
