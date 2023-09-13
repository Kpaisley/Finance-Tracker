import { useAuth0 } from "@auth0/auth0-react";
import { Route, Routes } from 'react-router-dom';
import { AddBudget } from "./AddBudget";
import { Dashboard } from "./Dashboard";
import { HomeDefault } from "./HomeDefault";

export const Home = (props) => {

    const { isAuthenticated, isLoading, user } = useAuth0();
    
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
        <Routes>
            <Route element={<Dashboard />} index='true'></Route>
            <Route element={<AddBudget user={user.sub} />} path='add-budget'></Route>
        </Routes>
        
    );

    
 
}
