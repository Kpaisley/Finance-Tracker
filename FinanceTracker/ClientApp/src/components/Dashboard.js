import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import './Dashboard.css';
import { AddBudget } from "./AddBudget";



export const Dashboard = (props) => {
    const { logout, user } = useAuth0();

    const [budgets, setBudgets] = useState([]);
    const [budgetsLoading, setBudgetsLoading] = useState(true);

    //If budgetsLoading = true, return a loader icon. Else return a chart displaying a users budget info.
    function budgetsInfo() {
        return (
            <div>
                {budgetsLoading ? (
                    <div className="loader"><div></div><div></div><div></div><div></div></div>
                ) : (
                    <div className="budget-info">
                            {
                                budgets.map(budget =>
                                    <div key={budget.id} className="budget">
                                        {budget.budgetName}
                                    </div>
                                )
                                    
                            }
                    </div>
               )}
            </div>
        );
    }

   

    async function populateBudgets(userID) {
        const response = await fetch('budgets/' + userID);
        const data = await response.json();
        setBudgets(data);
        setBudgetsLoading(false);
        
    }

    useEffect(() => {
        populateBudgets(user.sub)
    }, []);
     
    

    return (

        <div id="dashboard">
            <div className="dashboard-bg">
                <div className="logout-btn" onClick={() => logout()}>
                    <FontAwesomeIcon icon={faArrowRightFromBracket} />
                </div>

                <h1 className="title">Welcome to your Dashboard!</h1>
                <h4>Total Budgets: {budgets.length} / 3</h4>
                <AddBudget />


                
            </div>
                {budgetsInfo()}
        </div>


            
        
    );

}