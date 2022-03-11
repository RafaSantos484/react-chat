import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./screens/login";
import SingnUp from "./screens/signUp";
import MainPage from "./screens/mainPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<SingnUp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
