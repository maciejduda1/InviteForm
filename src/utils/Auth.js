import React from "react";

const Auth = ({ children, isAuthenticated }) => (
  <>{isAuthenticated && children}</>
);
export default Auth;
