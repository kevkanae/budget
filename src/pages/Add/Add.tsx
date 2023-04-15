import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Text from "@mui/material/Typography";
import { addStyles as sx } from "./Add.styles";
import { useCallback, useEffect, useState } from "react";
import { IconButton, MenuItem, Paper, Select } from "@mui/material";
import { useProfileStore } from "../../store/useProfileStore";
import { useParams } from "react-router-dom";
import { useDatabaseStore } from "../../store/useDatabaseStore";
import { BaseEntry, DB } from "../../utils/Database.type";
import AddEntryModal, {
  MONTHS,
} from "../../components/Modals/AddEntry/AddEntry.modal";
import dayjs from "dayjs";
import { DeleteForeverOutlined, EditSharp } from "@mui/icons-material";
import Pagination from "@mui/material/Pagination";
import { writeTextFile, BaseDirectory } from "@tauri-apps/api/fs";
import { notify } from "../../utils/Notify";

export type Rows = {
  id: string;
  date: string;
  title: string;
  comments: string | null;
  amount: number;
  month: number;
};

export type Param = "income" | "expense" | "debt" | "investment";

const Add = () => {
  const { type } = useParams<{ type: Param }>();
  const { currentProfile } = useProfileStore((state) => state);
  const { accountDetails, updateEntry, accountData } = useDatabaseStore(
    (state) => state
  );

  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<Rows | null>(null);
  const [rows, setRows] = useState<Rows[]>([]);
  const [monthValue, setMonthValue] = useState<number>(dayjs().month() + 1);
  const [page, setPage] = useState(1);

  const handleChange = (_: any, value: number) => {
    setPage(value);
  };

  const getRows = (raw: BaseEntry[]): Rows[] =>
    raw.map((entry) => ({
      id: entry.id,
      date: dayjs(entry.updatedAt).format("MMMM DD, YYYY [at] hh:mm A"),
      title: entry.title,
      comments: entry.comments,
      amount: entry.amount,
      month: dayjs(entry.updatedAt).month() + 1,
    }));

  const fetchRows = useCallback(() => {
    if (accountDetails && currentProfile && type) {
      const accountID = currentProfile.id;
      const currentAccount = accountDetails.filter(
        ({ id }) => id === accountID
      );
      const currentMonth = currentAccount
        .map(({ months }) =>
          months.filter(({ monthID }) => monthID === monthValue)
        )
        .flat();

      if (currentMonth.length > 0) {
        setRows(getRows(currentMonth[0][type as Param]));
      }
    }
  }, [accountDetails, currentProfile, monthValue, type]);

  useEffect(() => {
    fetchRows();
  }, [monthValue, fetchRows]);

  const handleAdd = () => {
    setShowModal(true);
  };

  const handleEdit = (rows: Rows) => {
    setSelectedRow(rows);
    setShowModal(true);
  };

  const handleRemove = async ({ id }: Rows) => {
    console.log(id);
    if (currentProfile && accountDetails) {
      let details = accountDetails;
      details.forEach((acc) => {
        if (acc.id === currentProfile.id) {
          acc.months.forEach((month) => {
            if (month.monthID === monthValue) {
              month[type as Param] = month[type as Param].filter(
                (entry) => entry.id !== id
              );
            }
          });
        }
      });

      // Update Store
      updateEntry(details);
      const newData: DB = {
        accounts: accountData,
        details: details,
      };

      try {
        await writeTextFile("index.json", JSON.stringify(newData), {
          dir: BaseDirectory.Download,
        })
          .then(() => notify("success", `Successfully Deleted`))
          .finally(() => fetchRows());
      } catch (error) {
        console.log(error);
        notify("error", "Something went wrong");
      }
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
          {rows.map((row) => (
            <Paper sx={sx.listItem} key={row.id}>
              <Box sx={sx.left}>
                <Text sx={sx.title}>{row.title}</Text>
                <Text sx={sx.comment}>{row.comments}</Text>
                <Text sx={sx.date}>{row.date}</Text>
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
