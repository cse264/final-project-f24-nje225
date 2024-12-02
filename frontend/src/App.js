import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Map from './Pages/MapPage';
import Reviews from './Pages/Reviews';
import Login from './Pages/Login';
import SignUp from './Pages/Signup';
import AdminScreen from './Pages/Admin';

function App() {
  return (
    <Router>
        <div>
          <Routes>
            <Route path="/admin" element={<AdminScreen />} />
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/map" element={<Map/>}/>
            <Route path="/reviews/:id/:bathroomId" element={<Reviews />} />
          </Routes>
        </div>
    </Router>
  );
}

export default App;