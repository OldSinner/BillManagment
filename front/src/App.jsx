import Sidebar from "./components/sidebar/Sidebar";
import Register from "./components/register/Register";
import { Layout } from "./components/layout/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Layout>Index Page</Layout>}></Route>
          <Route path={"/bill"} element={<Layout>Bill</Layout>}></Route>
          <Route path={"/register"} element={<Register></Register>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
