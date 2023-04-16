import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useCentralStore } from "../../../store/useDatabaseStore";
import { useProfileStore } from "../../../store/useProfileStore";
import { Entry } from "../../../utils/Database.type";
import dayjs from "dayjs";
import { notify } from "../../../utils/Notify";
import { v4 as uuidv4 } from "uuid";

export type FormType = {
  title: string;
  comment: string;
  amount: number;
  month: number;
};

const defaultValues: FormType = {
  title: "",
  comment: "",
  amount: 0,
  month: dayjs().month() + 1,
};

type Type = "income" | "expense" | "debt" | "investment";

const useAddEntry = (
  type: Type,
  editObj: Entry | null,
  hideModal: () => void
) => {
  const { updateEntry } = useCentralStore((state) => state);
  const { profile } = useProfileStore((state) => state);

  const { control, setValue, handleSubmit, reset } = useForm<FormType>({
    defaultValues,
  });

  useEffect(() => {
    if (editObj) {
      setValue("title", editObj.title);
      setValue("comment", editObj.desc);
      setValue("amount", editObj.amount);
      setValue("month", dayjs(editObj.createdAt).get("month") + 1);
    } else {
      const currentMonth = dayjs().month() + 1;
      setValue("month", currentMonth);
    }
  }, [type, editObj]);

  const handleSave: SubmitHandler<FormType> = async (data) => {
    if (profile) {
      const entry: Entry = {
        id: editObj ? editObj.id : uuidv4(),
        month: data.month,
        title: data.title,
        desc: data.comment,
        amount: data.amount,
        updatedAt: dayjs().toISOString(),
        createdAt: editObj ? editObj.createdAt : dayjs().toISOString(),
        type: type,
      };

      updateEntry(entry, profile.id, editObj ? "edit" : "add");
      notify("success", `Successfully ${editObj ? "edited" : "added"}`);
      hideModal();
      reset();
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
