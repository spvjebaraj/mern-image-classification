import React from "react";
import { Provider as AuthProvider } from "../context/AuthContext";
import { Provider as ClassificationProvider } from "../context/ClassificationContext";
import Routes from "./routes";

const Providers = () => {
  return (
    <ClassificationProvider>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ClassificationProvider>
  );
};

export default Providers;
