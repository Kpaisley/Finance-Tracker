import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { BudgetInfo } from "./BudgetInfo";
import { LogoutButton } from './Buttons';
import './Dashboard.css';
import AddBudgetModal from "./AddBudgetModal";



export const Dashboard = (props) => {
    const { user } = useAuth0();

    const [budgets, setBudgets] = useState([]);
    const [budgetsLoading, setBudgetsLoading] = useState(true);


    //Populate a users budget from BudgetController.cs
    async function populateBudgets() {
        var userID = user.sub;

        try {
            setBudgetsLoading(true);
            const response = await fetch('budgets/' + userID);
            const data = await response.json();
            setBudgets(data);
            setBudgetsLoading(false);


        }
        catch (error) {
            console.log(error.message);
        }
        
    }

    useEffect(() => {
        populateBudgets();
    }, []);

    //Return content based on the amount of budgets created.
    const content = () => {

        if (budgets.length === 0) {
            return (
                <h5 style={{ textAlign: "center" }}>
                    Add a budget below to get started!
                </h5>
            );
        }
        else {
            return (
                <h5 style={{textAlign:"center"}}>
                    Manage, Modify and Delete your budgets below!
                </h5>
            );
        
        }
    }


    return (

        <div id="dashboard" className='noselect'>
            <div className="dashboard-bg">
                <LogoutButton />
                <h1 className="title">Budget Flow</h1>
                <h4 className="budget-count">Total Budgets: {budgets.length} / 3</h4>
                {content()}
                <hr />
                <AddBudgetModal userId={user.sub} budgetsLength={budgets.length} populateBudgets={populateBudgets} budgetsLoading={budgetsLoading}  />
                <BudgetInfo budgets={budgets} budgetsLoading={budgetsLoading} populateBudgets={populateBudgets}></BudgetInfo>
            </div>
            
        </div>


            
        
    );

}