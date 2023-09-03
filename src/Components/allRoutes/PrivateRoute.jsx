import React, { useContext } from "react";
import { DataContext } from "../../context/DataProvider";
import Login from "../account/Login";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const { isAuth } = useContext(DataContext);
  return isAuth ? children : <Navigate replace to={"/login"} />;
}

export default PrivateRoute;
