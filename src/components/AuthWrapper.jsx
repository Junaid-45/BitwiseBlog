// import React from "react";
// import { Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// const AuthWrapper = ({ children, auth }) => {
//   auth : true / false
//   if false then route is public
//   if true then route is protected  / only authorized users are allowed
//   const { user } = useSelector((state) => state.userState);

//   let isAuthRequired = auth;
//   return isAuthRequired ? user ? children : <Navigate to={"/"} /> : children;
// };

// export default AuthWrapper;
