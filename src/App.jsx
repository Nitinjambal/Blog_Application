import { useContext } from "react";
import "./App.css";
import Login from "./Components/account/Login";
import AllRouter from "./Components/allRoutes/AllRouter";
import PrivateRoute from "./Components/allRoutes/PrivateRoute";
import Header from "./Components/header/Header";
import Home from "./Components/home/Home";
import { DataContext } from "./context/DataProvider";

function App() {


  return (
    <>
      <Header />
      <AllRouter />
    </>
  );
}

export default App;
