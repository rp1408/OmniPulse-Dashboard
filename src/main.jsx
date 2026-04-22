import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import { AuthProvider } from './AuthContext';
import Home from './Components/Home';
import Login from './Components/Login';
import Instagramdash from './Components/instagramdash';
import Facebookdash from './Components/Facebookdash';
import Metacamping from './Components/Metacamping';
import Timer from './Components/Timer';
import Schedule from './Components/Schedule'; // Schedule component
import Marketplace from './Components/Marketplace';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Instagramdash" element={<Instagramdash />} />
          <Route path="/Facebookdash" element={<Facebookdash />} />
          <Route path="/Metacamping" element={<Metacamping />} />
          <Route path="/Timer" element={<Timer />} />
          <Route path="/Schedule" element={<Schedule />} /> {/* Schedule route */}
          <Route path="/Marketplace" element={<Marketplace />} />
       
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
);