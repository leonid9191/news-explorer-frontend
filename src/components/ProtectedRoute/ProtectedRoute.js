import React from 'react';
import {Navigate } from "react-router-dom";

const ProtectedRoute = ({isLoggedIn, component: Component, ...props  }) => {
  return (
    <>
      {
        isLoggedIn ? <Component {...props} /> : <Navigate replace to="/" />
      }
    </>
)}

export default ProtectedRoute;