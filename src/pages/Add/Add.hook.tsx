import { useCallback, useEffect, useState } from "react";
import { useProfileStore } from "../../store/useProfileStore";
import { useParams } from "react-router-dom";
import { useCentralStore } from "../../store/useDatabaseStore";
import { Entry } from "../../utils/Database.type";
import dayjs from "dayjs";
import { writeTextFile, BaseDirectory } from "@tauri-apps/api/fs";
import { notify } from "../../utils/Notify";

export type Param = "income" | "expense" | "debt" | "investment";

const useAdd = () => {
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
        db.userData
          .filter((acc) => acc.id === profile.id)[0]
          .data.filter(
            (item) => item.month === monthValue && item.type === "income"
          )
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

  return {
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
  };
};

export default useAdd;
