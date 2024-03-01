import React, { FC } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

interface ProtectedPageProps {
  children: React.ReactNode;
}

const ProtectedPage: FC<ProtectedPageProps> = ({ children }) => {
  const { auth } = useAuth();
  if (!auth) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedPage;
