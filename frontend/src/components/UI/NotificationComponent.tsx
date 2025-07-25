import { useEffect, useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import InfoIcon from "@mui/icons-material/Info";
import ReportIcon from "@mui/icons-material/Report";
import "../../index.css";

export interface Notification {
  message: string;
  type: "success" | "error" | "info" | "warning";
  time: number;
}

export default function NotificationComponent(props: Notification) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), props.time);
    return () => clearTimeout(timer);
  }, [props.time]);

  const getIcon = () => {
    switch (props.type) {
      case "success":
        return <CheckCircleIcon className="icon" fontSize="large" />;
      case "error":
        return <ErrorIcon className="icon" fontSize="large" />;
      case "info":
        return <InfoIcon className="icon" fontSize="large" />;
      case "warning":
        return <ReportIcon className="icon" fontSize="large" />;
      default:
        return null;
    }
  };
  return (
    <>
      {show && (
        <div className={`notification ${props.type}`}>
          {getIcon()}
          <div>
            <p>{props.message}</p>
          </div>
        </div>
      )}
    </>
  );
}
