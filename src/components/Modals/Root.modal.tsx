import { SxProps } from "@mui/system";
import { useModalStore } from "../../store/useModalStore";
import AddAccount from "./AddAccount/AddAccount.modal";

export const modalStyles: SxProps = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: "0.2rem",
};

const MODAL_COMPONENTS: { [key: string]: Function } = {
  ADD_ACCOUNT: AddAccount,
};

const RootModal = () => {
  const { modalType, modalProps } = useModalStore((state) => state);
  const CurrentModal = MODAL_COMPONENTS[modalType];

  if (CurrentModal) {
    return <CurrentModal {...modalProps} />;
  } else {
    return null;
  }
};

export default RootModal;
