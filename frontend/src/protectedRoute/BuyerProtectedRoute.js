import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../components/Layout/Loader";

const BuyerProtectedRoute = ({ children }) => {
  const { loading, isAuthenticated } = useSelector((state) => state.user);
  if (loading === true) {
    return <Loader />;
  } else {
    if (!isAuthenticated) {
      return <Navigate to={`/login`} replace />;
    }
    return children;
  }
};

export default BuyerProtectedRoute; 

