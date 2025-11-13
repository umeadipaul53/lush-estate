import { useContext } from "react";
import { ToastContext } from "./CreateToast";

export const useToast = () => useContext(ToastContext);
