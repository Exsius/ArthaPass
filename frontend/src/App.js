import { BrowserRouter, Routes, Route } from 'react-router-dom';

import UserProvider, { useAuth } from "./Context/UserContext.js";
import PrivateRoute from './Components/PrivateRoute.js';

import Layout from './Pages/Layout.js'
import Login from './Pages/Login.js'
import Logout from './Pages/Logout.js'
import Dashboard from './Pages/Dashboard.js'
import NoPage from './Pages/NoPage.js'
import { useEffect, useState } from 'react';

function App() {
  return (
    <div>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={ <Layout/> }>
              <Route path='/' element={ <PrivateRoute/> }>
                <Route path='/' element={ <Dashboard /> } />
                <Route path='/logout' element={ <Logout /> } />
              </Route>
              <Route path='/login' element={ <Login /> } />
              <Route path='*' element={ <NoPage /> } />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
