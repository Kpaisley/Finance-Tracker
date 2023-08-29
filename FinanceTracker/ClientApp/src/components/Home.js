import { useAuth0 } from "@auth0/auth0-react";
import { Dashboard } from "./Dashboard";
import { HomeDefault } from "./HomeDefault";

export const Home = (props) => {

    const { isAuthenticated, isLoading } = useAuth0();
    
    //Return login screen if not logged in.
    if (!isAuthenticated && !isLoading) {
        return (
            <>
                <HomeDefault />
            </>
        );
    }

    //Return Dashboard.js if user is logged in.
    return isAuthenticated && (
        <Dashboard />
    );

    
 
}
