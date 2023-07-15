import { useContext } from "react";
import { AlertContext } from "../context/alertContext";

export const useAlertContext = () =>
  useContext(AlertContext);
