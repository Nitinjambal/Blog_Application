import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../home/Home";
import Login from "../account/Login";
import PrivateRoute from "./PrivateRoute";

function AllRouter() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route />
      <Route />
    </Routes>
  );
}

export default AllRouter;
