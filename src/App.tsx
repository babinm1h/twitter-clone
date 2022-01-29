import React from 'react';
import { Route, Routes } from 'react-router';
import Home from './pages/Home/Home';
import LoginPage from './pages/LoginPage/LoginPage';

const App = () => {
  return (
    <div className="wrapper">
      <Routes>
        <Route path="/auth" element={<LoginPage />} />
        <Route path="/*" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;