import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { AddCategory } from './AddCategory';
import { CategoryInfo } from './CategoryInfo';
import { LogoutButton } from "./LogoutButton";
import './SelectedBudget.css';


export const SelectedBudget = () => {
    const location = useLocation();
    const [categories, setCategories] = useState([]);
    const [categoriesLoading, setCategoriesLoading] = useState(true);




    //Populate Categories from CategoriesController.
    async function populateCategories() {

        const userId = budget.userId;
        const budgetId = budget.id;

        try {
            setCategoriesLoading(true);
            const response = await fetch('categories/' + userId + "/" + budgetId);
            const data = await response.json();
            setCategories(data);
            setCategoriesLoading(false);
        }
        catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        populateCategories();
    }, [])

    //Return user to the dashboard if URL is manually typed in.
    if (!location.state) {
        return (
            window.location.href = ""
        );
    }


    const budget = location.state.budget.budget;
    


    return budget && (
        
        <div className="selected-budget noselect">
            <div className="budget-title">
                <LogoutButton />
                <h2>{budget.budgetName}</h2>
                <Link className='return-link' to='/'>Return</Link>
                <div className='date-modified'>
                    <u>Last Modified</u>
                    <p>{budget.dateLastModified.slice(0, 10)}</p>
                </div>


                <AddCategory budget={budget} populateCategories={populateCategories} />

            </div>

            <CategoryInfo categories={categories} categoriesLoading={categoriesLoading} />

        </div>
    );

}


