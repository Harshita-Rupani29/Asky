import { useContext } from "react";
import { AuthContext } from "./context-API";
import { Navigate } from "react-router-dom";

const RedirectLoggedIn = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);

  if (isLoggedIn) {
    return <Navigate to="/questions" replace />;
  }

  return children;
};

export default RedirectLoggedIn;
