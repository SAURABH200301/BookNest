import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

type NotificationContextType = {
  showNotification: boolean;
  setShowNotification: Dispatch<SetStateAction<boolean>>;
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
  type: "success" | "error" | "info" | "warning";
  setType: Dispatch<SetStateAction<"success" | "error" | "info" | "warning">>;
  time:number;
  setTime: Dispatch<SetStateAction<number>>;
};

interface NotificationProviderProps {
  children: React.ReactNode;
}

export enum NotificationType {
  SUCCESS = "success",
  ERROR = "error",
  INFO = "info",
  WARNING = "warning",
}

const NotificationContext = createContext<NotificationContextType>({
  showNotification: false,
  setShowNotification: () => {},
  message: "",
  type: "info",
  setMessage: () => {},
  setType: () => {},
  time: 1000,
  setTime: () => {},
});

export const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
}) => {
  const [showNotification, setShowNotification] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<"success" | "error" | "info" | "warning">(
    "info"
  );
  const [time, setTime] = useState<number>(1000);
  useEffect(() => {
    setTimeout(() => {
      setShowNotification(false);
    }, time);
  }, [showNotification, time]);

  return (
    <NotificationContext.Provider
      value={{
        showNotification,
        setShowNotification,
        message,
        setMessage,
        setType,
        type,
        time,
        setTime,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
