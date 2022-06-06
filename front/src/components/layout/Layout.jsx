import Sidebar from "../sidebar/Sidebar";
import "./Layout.css";
import Addinvoice from "../addinvoice/Addinvoice";
export const Layout = ({ children }) => {
  return (
    <div className="layoutWrapper">
      <Sidebar></Sidebar>
      <Addinvoice></Addinvoice>
      <div className="">{children}</div>
    </div>
  );
};
