import React, { useEffect } from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './components/Pages/MainPage';
import Register from './components/Pages/Auth/Register';
import Login from './components/Pages/Auth/Login';
import Layout from './components/Layout';
import BillList from './components/Pages/BillList';
import { Dashboard } from './components/Dashboard';
import { Chart, registerables } from 'chart.js';
import Settings from './components/Pages/Settings';
import Raports from './components/Pages/Raports';
Chart.register(...registerables);
function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route index element={<MainPage />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route
            path="/dash"
            element={
              <Layout>
                <Dashboard />
              </Layout>
            }
          ></Route>
          <Route
            path="/list"
            element={
              <Layout>
                <BillList />
              </Layout>
            }
          ></Route>
          <Route
            path="/settings"
            element={
              <Layout>
                <Settings></Settings>
              </Layout>
            }
          ></Route>
          <Route
            path="/raports"
            element={
              <Layout>
                <Raports></Raports>
              </Layout>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
