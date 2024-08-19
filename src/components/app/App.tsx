/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from '../../pages/login-page/page.login';
import HomePage from '../../pages/homePage/page.homePage';
import TruckListPage from '../../pages/trucks/truck-list/page.truckList';
import PartListPage from '../../pages/parts/part-list/page.partList';
import MainPage from '../../pages/page.main';
import TruckDetailsPage from '../../pages/trucks/truck-page/page.truckDetails';
import EditTruckPage from '../../pages/trucks/truck-page/page.editTruck';
import PartDetailsPage from '../../pages/parts/part-page/page.partDetails';
import EditPartPage from '../../pages/parts/part-page/page.editPart';
import MaintenanceList from '../../pages/maintenance/maintenance-list/page.maintenance-list';
import CreateMaintenance from '../../pages/maintenance/maintenance-page/page.createMaintenance';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainPage />}>
            <Route index element={<HomePage />} />
            {/* Inventory */}
            <Route path='parts' element={<PartListPage />} />
            <Route path='parts/create' element={<EditPartPage />} />
            <Route path='parts/:id' element={<PartDetailsPage />} />
            <Route path='parts/edit/:id' element={<EditPartPage />} />
            <Route
              path='inventory'
              element={
                <div>inventory Vacío, ir a partes o camiones</div>
              }
            />
            {/* Trucks */}
            <Route path='trucks' element={<TruckListPage />} />
            <Route path='trucks/create' element={<EditTruckPage />} />
            <Route path='trucks/:id' element={<TruckDetailsPage />} />
            <Route
              path='trucks/edit/:id'
              element={<EditTruckPage />}
            />

            {/* Maintenences */}
            <Route
              path='maintenences'
              element={<MaintenanceList />}
            />
            <Route
              path='maintenences/create'
              element={<CreateMaintenance />}
            />
            <Route
              path='maintenences/:id'
              element={<MaintenanceList />}
            />

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
