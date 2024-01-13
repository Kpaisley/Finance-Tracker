import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AddCategory } from './AddCategory';
import { CategoryInfo } from './CategoryInfo';
import { CategoryPurchaseForm } from './CategoryPurchaseForm';
import { LogoutButton } from "./LogoutButton";
import './SelectedBudget.css';


export const SelectedBudget = (props) => {
    const budget = props.budget;
    const userId = props.budget.userId;
    const [categories, setCategories] = useState([]);
    const [categoriesLoading, setCategoriesLoading] = useState(true);
    const [changeView, setChangeView] = useState(false);



    //Populate Categories from CategoriesController.
    async function populateCategories() {

        
        const budgetId = budget.id;

        try {
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
    }, []);

    //Change user view depending on the state of changeUserView.
    function changeUserView() {
        setChangeView(!changeView);
    }

    //Change the text inside 'manage-categories-btn' depending on what the user is viewing.
    let buttonText = !changeView
        ? "Manage Categories"
        : "Add Purchase";

    //Display either <CategoryInfo /> or <CategoryPurchaseForm /> depending on state of viewManageCategories
    let contents = changeView
        ? <CategoryInfo categories={categories} categoriesLoading={categoriesLoading} userId={userId} populateCategories={populateCategories} />
        : <CategoryPurchaseForm />



    return (

        <div className="selected-budget noselect">
            <div className="budget-title">
                <LogoutButton />
                <h1>{budget.budgetName}</h1>
                <Link className='return-link' to='/'>Go Back</Link>
                <div className='date-modified'>
                    <u>Last Modified</u>
                    <p>{budget.dateLastModified.slice(0, 10)}</p>
                </div>


                <AddCategory budget={budget} populateCategories={populateCategories} />
                <p id='manage-categories-btn' onClick={() => changeUserView()}>{buttonText}</p>

            </div>

            {contents}

        </div>
    );

}


