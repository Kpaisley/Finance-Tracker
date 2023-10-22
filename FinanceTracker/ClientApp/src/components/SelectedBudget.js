import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { AddCategory } from './AddCategory';
import { LogoutButton } from "./LogoutButton";
import './SelectedBudget.css';


export const SelectedBudget = (props) => {
    const location = useLocation();
    const [categories, setCategories] = useState();
    const [categoriesLoading, setCategoriesLoading] = useState(true);
    
    //Only render if a user navigated to here by clicking a budget on the dashboard.
    if (location.state) {
        const budget = location.state.budget.budget;
        var dateModified;

        if (!budget.dateLastModified) {
            dateModified = budget.dateCreated.slice(0, 10);
        }
        else {
            dateModified = budget.dateLastModified;
        }

        populateCategories();

        
        //CALL API TO POPULATE CATEGORIES BELOW...

        async function populateCategories() {
            

            const userId = budget.userId;
            const budgetId = budget.id;
            try {
                
                const response = await fetch('categories/' + userId + "/" + budgetId);
                
            }
            catch (error) {
                console.log(error);
            }

            
        }

        
        

        return budget && (
            <div className="selected-budget noselect">
                <div className="budget-title">
                    <LogoutButton />
                    <h2>{budget.budgetName}</h2>
                    <Link className='return-link' to='/'>Return</Link>
                    <div className='date-modified'>
                        <u>Last Modified</u>
                        <p>{dateModified}</p>
                    </div>
                    

                   <AddCategory />

                </div>

                

            </div>
        );
    }

    //If user manually types in hyperlink, redirect them to the dashboard to prevent errors.
    else
        window.location.href = "";
   
}
