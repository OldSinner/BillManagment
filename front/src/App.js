import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './components/Pages/MainPage';
import Register from './components/Pages/Auth/Register';
import Login from './components/Pages/Auth/Login';
function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route index element={<MainPage />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
