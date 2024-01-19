import React from "react";
import { Route, Router, Routes } from "react-router-dom";
import MultiStepForm from "./MultiStepForm";
import FormDataTable from "./FormDataTable";
const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MultiStepForm />} />
      <Route path="/table" element={<FormDataTable />} />
    </Routes>
  );
};

export default MainRoutes;