import { useAuth0 } from "@auth0/auth0-react";
import { Dashboard } from "./Dashboard";

export const Home = (props) => {

    const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
    
    //Return login screen if not logged in.
    if (!isAuthenticated && !isLoading) {
        return (
            loginWithRedirect()
        );
    }

    //Return Dashboard.js if user is logged in.
    return isAuthenticated && (
        <Dashboard />
    );

    
 
}
