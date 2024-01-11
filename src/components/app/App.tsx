/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from '../../pages/login-page/page.login';
import HomePage from '../../pages/homePage/page.homePage';
import TruckListPage from '../../pages/trucks/truck-list/page.truckList';
import PartListPage from '../../pages/parts/part-list/page.partList';
import BasicLayout from '../layout/component.basicLayout';
import MainPage from '../../pages/page.main';
import TruckForm from '../forms/component.truckForm';
import PartForm from '../forms/component.partForm';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainPage />}>
            <Route index element={<HomePage />} />
            {/* Inventory */}
            <Route path='parts' element={<PartListPage />} />
            <Route path='parts/create' element={<PartForm />} />
            <Route
              path='inventory'
              element={
                <div>inventory Vacío, ir a partes o camiones</div>
              }
            />
            {/* Trucks */}
            <Route path='trucks' element={<TruckListPage />} />
            <Route
              path='maintenences'
              element={
                <div>tmaintenences Vacío, ir a partes o camiones</div>
              }
            />
            <Route path='trucks/create' element={<TruckForm />} />

            {/* Files */}
            <Route
              path='files'
              element={
                <div>archivos Vacío, ir a partes o camiones</div>
              }
            />
            <Route
              path='file-list'
              element={
                <div>file-list Vacío, ir a partes o camiones</div>
              }
            />
            {/* Users */}
            <Route
              path='users'
              element={<div>users Vacío, ir a partes o camiones</div>}
            />
            <Route
              path='user-list'
              element={
                <div>user-list Vacío, ir a partes o camiones</div>
              }
            />
          </Route>

          <Route path='/login' element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
