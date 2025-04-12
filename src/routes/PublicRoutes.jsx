

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { PRIVATE_ROUTES } from "@routes/routes";
const PublicRoutes = ({ element }) => {
    //  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
            // Redirect to Dashboard if authenticated
            const isAuthenticated = true;
     return isAuthenticated ? <Navigate to={PRIVATE_ROUTES.DASHBOARD} /> :element ;
 
  };

  export default PublicRoutes;