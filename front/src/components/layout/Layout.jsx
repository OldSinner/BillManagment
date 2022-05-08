import Sidebar from "../sidebar/Sidebar";
import "./Layout.css";
export const Layout = ({ children }) => {
  return (
    <div className="layoutWrapper">
      <Sidebar></Sidebar>
      <div className="">{children}</div>
    </div>
  );
};
