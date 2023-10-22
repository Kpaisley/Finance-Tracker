﻿import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { AddBudget } from "./AddBudget";
import { BudgetInfo } from "./BudgetInfo";
import { LogoutButton } from "./LogoutButton";
import './Dashboard.css';



export const Dashboard = (props) => {
    const { user } = useAuth0();

    const [budgets, setBudgets] = useState([]);
    const [budgetsLoading, setBudgetsLoading] = useState(true);

   

    async function populateBudgets(userID) {

        try {
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
        populateBudgets(user.sub)
    }, []);


    
     
    

    return (

        <div id="dashboard" className='noselect'>
            <div className="dashboard-bg">
                <LogoutButton />
                <h1 className="title">Welcome to your Dashboard!</h1>
                <h4 className="budget-count">Total Budgets: {budgets.length} / 3</h4>
                
                <AddBudget userID={user.sub} budgetsLength={budgets.length} setBudgets={setBudgets} setBudgetsLoading={setBudgetsLoading} />
            </div>
            <BudgetInfo budgets={budgets} setBudgets={setBudgets} budgetsLoading={budgetsLoading}></BudgetInfo>
        </div>


            
        
    );

}