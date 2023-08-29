import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";



export const Dashboard = (props) => {
    const { logout, user } = useAuth0();

    const [budgets, setBudgets] = useState([]);
    const [budgetsLoading, setBudgetsLoading] = useState(true);

    async function populateBudgets(userID) {
        const response = await fetch('budgets/' + userID);
        const data = await response.json();
        setBudgets(data);
        setBudgetsLoading(false);
        
    }

    useEffect(() => {
        populateBudgets(user.sub)
    }, []);
     
    

    return(
        <div>
            <h1>Welcome to your Dashboard!</h1>

            <button onClick={() => logout()}>Log Out</button>

            <br />
            <br />

           

            <br />
            <br />
            <div>
                {budgetsLoading ? (
                    <h1>Loading...</h1>
                ) : (
                    <h1>Total Budgets: { budgets.length }</h1>
                )}
            </div>
            
        </div>
    );

}