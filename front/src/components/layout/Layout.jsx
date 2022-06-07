import Sidebar from "../sidebar/Sidebar";
import "./Layout.css";
import Addinvoice from "../addinvoice/Addinvoice";
import AuthService from "../Auth/AuthService";
import Redirect from "../Util/Redirect";
export const Layout = ({ children }) => {
  const _auth = AuthService;
  const isLogged = _auth.isLogged();
  if (!isLogged) {
    return <Redirect path={"/login"} />;
  }
  return (
    <div className="layoutWrapper">
      <Sidebar></Sidebar>
      <Addinvoice></Addinvoice>
      <div className="">{children}</div>
    </div>
  );
};
