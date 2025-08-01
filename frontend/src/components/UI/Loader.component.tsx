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
            <div className="brown1 ball"></div>
            <div className="brown2 ball"></div>
            <div className="brown3 ball"></div>
            <div className="brown4 ball"></div>
          </div>
        </div>
      )}
    </>
  );
}
