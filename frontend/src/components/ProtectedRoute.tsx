import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../lib/auth";

type Props = {
  children: JSX.Element;
};

export function ProtectedRoute({ children }: Props): JSX.Element {
  if (!isLoggedIn()) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
