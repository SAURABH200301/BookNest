import { useEffect, useState } from "react";
import "./Loader.component.css";

export default function Loader({ showLoader }: { showLoader: boolean }) {
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    setLoader(showLoader);
  }, [showLoader]);
  return (
    <>
      {loader && (
        <div className="container">
          <div className="wrapper">
            <div className="blue ball"></div>
            <div className="red ball"></div>
            <div className="yellow ball"></div>
            <div className="green ball"></div>
          </div>
        </div>
      )}
    </>
  );
}
