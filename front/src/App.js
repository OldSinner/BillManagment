import React from 'react';
import {
  ChakraProvider,
  theme,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './components/Pages/MainPage';
import Register from './components/Pages/Auth/Register';
import Login from './components/Pages/Auth/Login';
import Layout from './components/Layout';
import BillList from './components/Pages/BillList';
import Card from './components/Card';
import { Dashboard } from './components/Dashboard';
import { Chart, registerables } from 'chart.js';
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
                {/* <Card
                  Title={'1800 PLN'}
                  Content={<Text
          textAlign={'left'}
          color={useColorModeValue('gray.700', 'gray.400')}
          px={0}
        >
          Bieżące Saldo
        </Text>}
                  
                  Color={useColorModeValue('blue.300', 'blue.300')}
                />
                <Card
                  Title={'+800 PLN'}
                  Content={'Przychody'}
                  Color={useColorModeValue('green.300', 'green.300')}
                />
                <Card
                  Title={'-800 PLN'}
                  Content={'Wydatki'}
                  Color={useColorModeValue('red.300', 'red.300')}
                /> */}
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
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
