import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Text from "@mui/material/Typography";
import { addStyles as sx } from "./Add.styles";
import { invoke } from "@tauri-apps/api";
import { useCallback, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useProfileStore } from "../../store/useProfileStore";
import { useParams } from "react-router-dom";
import { useModalStore } from "../../store/useModalStore";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70, hideable: true },
  {
    field: "date",
    headerName: "Date",
    sortable: false,
    flex: 1,
    hideable: true,
  },
  {
    field: "title",
    headerName: "Title",
    sortable: false,
    flex: 1,
    hideable: false,
  },
  {
    field: "category",
    headerName: "Category",
    sortable: false,
    flex: 1,
    hideable: false,
  },
  {
    field: "amount",
    headerName: "Amount",
    sortable: true,
    flex: 1,
    hideable: false,
  },
  {
    field: "action",
    headerName: "Action",
    sortable: false,
    flex: 1,
    hideable: false,
  },
];

const rows = [
  { id: 1, title: "Snow", date: "Jon", amount: 335 },
  { id: 2, title: "Lannister", date: "Cersei", amount: 462 },
  { id: 3, title: "Lannister", date: "Jaime", amount: 455 },
  { id: 4, title: "Stark", date: "Arya", amount: 126 },
  { id: 5, title: "Targaryen", date: "Daenerys", amount: 3434 },
  { id: 6, title: "Melisandre", date: null, amount: 1450 },
  { id: 7, title: "Clifford", date: "Ferrara", amount: 434 },
  { id: 8, title: "Frances", date: "Rossini", amount: 326 },
  { id: 9, title: "Roxie", date: "Harvey", amount: 658 },
];

const Add = () => {
  const currentProfile = useProfileStore((state) => state.currentProfile);
  const setModal = useModalStore((state) => state.setModal);
  const { type } = useParams();
  console.log(currentProfile);

  const handleAdd = () => {
    setModal("ADD_ENTRY", {
      show: true,
      type: type,
    });
  };

  return (
    <Box sx={sx.root}>
      <Box sx={sx.header}>
        <Text sx={sx.h3}>{type}</Text>
        <Button variant="outlined" color="primary" onClick={handleAdd}>
          Add {type}
        </Button>
      </Box>

      <Box sx={sx.tableWrapper}>
        <DataGrid
          rows={rows}
          columns={columns}
          autoPageSize
          density="standard"
          checkboxSelection
        />
      </Box>
    </Box>
  );
};

export default Add;
