import Sidebar from "./components/sidebar/Sidebar";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import Dashboard from "./components/dashboard/Dashboard";
import { Layout } from "./components/layout/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={"/bill"} element={<Layout>Bill</Layout>}></Route>
          <Route path={"/register"} element={<Register></Register>}></Route>
          <Route path={"/login"} element={<Login></Login>}></Route>
          <Route
            index
            element={
              <Layout>
                <Dashboard></Dashboard>
              </Layout>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
