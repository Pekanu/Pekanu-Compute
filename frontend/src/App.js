import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import RegisterTask from "./Components/RegisterTask";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import ListTasks from "./Components/ListTasks";
import TransactionSuccessful from "./Components/TranscationSuccessful";
// React Router App

const App = () => {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register-task" element={<RegisterTask />} />
        <Route path="/task-list" element={<ListTasks />} />
        <Route path="/transaction-successful" element={<TransactionSuccessful />} />
      </Routes>
    </Router>
  );
};

export default App;
