import Sidebar from "../sidebar/Sidebar";

export const Layout = ({ children }) => {
  return (
    <div className="">
      <Sidebar></Sidebar>
      <div className="">{children}</div>
    </div>
  );
};
