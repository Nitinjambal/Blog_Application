import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../home/Home";
import Login from "../account/Login";
import PrivateRoute from "./PrivateRoute";
import CreatePost from "../create/CreatePost";

import {Box, styled } from "@mui/material";


const Container=styled(Box)({
  marginTop:"65px"
})

Box
function AllRouter() {
  return (
    <Container>
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
      <Route
        path="/create"
        element={
          <PrivateRoute>
            <CreatePost />
          </PrivateRoute>
        }
      />
      <Route />
    </Routes>
    </Container>
  );
}

export default AllRouter;
