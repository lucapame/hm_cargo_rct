/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from '../../pages/login-page/page.login';
import HomePage from '../../pages/homePage/page.homePage';
import TruckListPage from '../../pages/trucks/truck-list/page.truckList';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />}>
            <Route index element={<div>home</div>} />
            {/* Inventory */}
            <Route path='parts' element={<div>parts</div>} />
            <Route path='inventory' element={<div>inventory</div>} />
            {/* Trucks */}
            <Route path='trucks' element={<TruckListPage />} />
            <Route
              path='truck-list'
              element={<div>truck-list</div>}
            />
            <Route
              path='maintenences'
              element={<div>tmaintenences</div>}
            />
            {/* Files */}
            <Route path='files' element={<div>files</div>} />
            <Route path='file-list' element={<div>file-list</div>} />
            {/* Users */}
            <Route path='users' element={<div>users</div>} />
            <Route path='user-list' element={<div>user-list</div>} />
          </Route>
          <Route path='/login' element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
