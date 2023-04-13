import { useEffect } from "react";
import { useModalStore } from "../../../store/useModalStore";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDatabaseStore } from "../../../store/useDatabaseStore";
import { useProfileStore } from "../../../store/useProfileStore";
import { BaseEntry, DB } from "../../../utils/Database.type";
import { BaseDirectory, writeTextFile } from "@tauri-apps/api/fs";
import { notify } from "../../../utils/Notify";

export type FormType = {
  title: string;
  comment: string;
  amount: number;
  month: number;
};

type Props = "income" | "expense" | "debt" | "investment";

const useAddEntry = (type: Props) => {
  const { control, setValue, handleSubmit } = useForm<FormType>({
    defaultValues: {
      title: "",
      comment: "",
      amount: 0,
      month: new Date().getMonth() + 1,
    },
  });

  const hideModal = useModalStore((state) => state.hideModal);
  const database = useDatabaseStore((state) => state);
  const currentProfile = useProfileStore((state) => state.currentProfile);

  useEffect(() => {
    const currentMonth = new Date().getMonth() + 1;
    setValue("month", currentMonth);
  }, []);

  const handleSave: SubmitHandler<FormType> = async (data) => {
    const entry: BaseEntry = {
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
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
              curr[type].push(entry);
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
          .then(() => notify("success", `Successfully Added`))
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
