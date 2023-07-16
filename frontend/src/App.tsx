import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StudentTable from './components/StudentTable';
import StudentCreate from './components/StudentCreate';
import EditStudent from './components/EditStudent';

function App() {
  return (
    <div>

     <Routes>
         <Route path="/" element={< StudentTable/>} />
          <Route path="/Create" element={< StudentCreate/>} />
          <Route path="/Edit" element={< EditStudent/>} />
      </Routes>
    </div>
  );
}

export default App;
