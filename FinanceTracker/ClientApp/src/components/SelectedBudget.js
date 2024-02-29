import { useEffect, useState } from 'react';
import { CategoryInfo } from './CategoryInfo';
import { CategoryPurchaseForm } from './CategoryPurchaseForm';
import { LinkButton, LogoutButton } from './Buttons';
import { SelectedBudgetTab } from './SelectedBudgetTab';
import './SelectedBudget.css';


export const SelectedBudget = (props) => {
    const budget = props.budget;
    const userId = props.budget.userId;
    const [categories, setCategories] = useState([]);
    const [categoriesLoading, setCategoriesLoading] = useState(true);

    const [tabValue, setTabValue] = useState('two');

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

    //Update DOM when user switches between tabs.
    useEffect(() => {
    }, [tabValue]);
    

    function tabView() {
        if (tabValue === 'one') {
            return (
                <CategoryPurchaseForm />
            );
        }
        else if (tabValue === 'two') {
            return (
                <CategoryInfo categories={categories} categoriesLoading={categoriesLoading} budget={budget} userId={userId} populateCategories={populateCategories} />
            );
        }

    }



    return (

        <div className="selected-budget noselect">
            <div className="selected-budget-bg">
                <LogoutButton />
                <h1>{budget.budgetName}</h1>

                <div className='date-modified'>
                    <u>Last Modified</u>
                    <p>{budget.dateLastModified.slice(0, 10)}</p>
                </div>

                <LinkButton href="/" text="To Dashboard" />

                

                <hr />
                
                <SelectedBudgetTab tabValue={tabValue} setTabValue={setTabValue} />
                
                {tabView()}
            </div>

            

        </div>
    );

}


