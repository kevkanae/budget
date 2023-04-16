import { toast, ToastOptions } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const config: ToastOptions = {
  position: "top-right",
  autoClose: 1000,
  hideProgressBar: false,
  closeOnClick: true,
  rtl: false,
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: true,
  theme: "light",
};

type AlertType = "error" | "warning" | "info" | "success";

export const notify = (type: AlertType, message: string) => {
  switch (type) {
    case "success":
      return toast.success(message, config);
    case "warning":
      return toast.warn(message, config);
    case "error":
      return toast.error(message, config);
    case "info":
      return toast.info(message, config);

    default:
      break;
  }
};
