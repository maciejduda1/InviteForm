import React from "react";

const Auth = ({ auth, notAuth, isAuthenticated }) => (
  <>
    {isAuthenticated ? auth : notAuth}
  </>
);
export default Auth;
