import { useContext } from "react";

import { AuthContext } from "./context-API";
const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);

  return isLoggedIn ? children : "";
};

export default PrivateRoute;
