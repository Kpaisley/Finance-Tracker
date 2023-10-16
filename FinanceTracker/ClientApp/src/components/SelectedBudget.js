import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';


export const SelectedBudget = (props) => {
    const location = useLocation();
    const [categories, setCategories] = useState();
    //Only render if a user navigated to here by clicking a budget on the dashboard.
    if (location.state) {
        const budget = location.state.budget.budget;

        //CALL API TO POPULATE CATEGORIES BELOW...

        return budget &&(
            <>
                <h1>{budget.budgetName}</h1>
                <Link to="/">Go Back</Link>
            </>
        );
    }

    //If user manually types in hyperlink, redirect them to the dashboard to prevent errors.
    else
        window.location.href = "";
   
}
