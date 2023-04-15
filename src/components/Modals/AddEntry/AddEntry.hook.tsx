import { useEffect } from "react";
import { useModalStore } from "../../../store/useModalStore";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDatabaseStore } from "../../../store/useDatabaseStore";
import { useProfileStore } from "../../../store/useProfileStore";
import { BaseEntry, DB } from "../../../utils/Database.type";
import { BaseDirectory, writeTextFile } from "@tauri-apps/api/fs";
import { notify } from "../../../utils/Notify";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
import { Rows } from "../../../pages/Add/Add";

export type FormType = {
  title: string;
  comment: string;
  amount: number;
  month: number;
};

type Type = "income" | "expense" | "debt" | "investment";

const useAddEntry = (
  type: Type,
  editObj: Rows | null,
  hideModal: () => void
) => {
  const database = useDatabaseStore((state) => state);
  const currentProfile = useProfileStore((state) => state.currentProfile);

  const { control, setValue, handleSubmit } = useForm<FormType>({
    defaultValues: {
      title: "",
      comment: "",
      amount: 0,
      month: dayjs().month() + 1,
    },
  });

  useEffect(() => {
    if (editObj) {
      setValue("title", editObj.title);
      setValue("comment", editObj.comments ?? "");
      setValue("amount", editObj.amount);
      setValue("month", editObj.month);
    } else {
      const currentMonth = dayjs().month() + 1;
      setValue("month", currentMonth);
    }
  }, [type, editObj]);

  const handleSave: SubmitHandler<FormType> = async (data) => {
    const entry: BaseEntry = {
      id: editObj ? editObj.id : uuidv4(),
      createdAt: dayjs().toISOString(),
      updatedAt: dayjs().toISOString(),
      title: data.title,
      comments: data.comment ? data.comment : null,
      amount: data.amount,
    };

    if (database.accountData && currentProfile) {
      const details = database.accountDetails;

      details.forEach((detail) => {
        if (detail.id === currentProfile.id) {
          let months = detail.months;
          months.forEach((curr) => {
            if (curr.monthID === data.month) {
              if (editObj) {
                const index = curr[type].findIndex(
                  (item) => item.id === editObj.id
                );
                curr[type][index] = entry;
              } else {
                curr[type].push(entry);
              }
            }
          });
        }
      });

      // Update Store
      database.updateEntry(details);
      const newData: DB = {
        accounts: database.accountData,
        details: details,
      };

      try {
        await writeTextFile("index.json", JSON.stringify(newData), {
          dir: BaseDirectory.Download,
        })
          .then(() =>
            notify("success", `Successfully ${editObj ? "edited" : "added"}`)
          )
          .finally(() => hideModal());
      } catch (error) {
        console.log(error);
        notify("error", "Something went wrong");
      }
    }
  };

  return {
    control,
    handleSubmit,
    hideModal,
    handleSave,
  };
};

export default useAddEntry;
