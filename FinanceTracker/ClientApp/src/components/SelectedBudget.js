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
    const [categoryTotals, setCategoryTotals] = useState(0.00);
    const [categoriesLoading, setCategoriesLoading] = useState(true);
    const [tabValue, setTabValue] = useState('two');

    //Populate Categories from CategoriesController.
    async function populateCategories() {

        
        const budgetId = budget.id;

        try {
            const response = await fetch('categories/' + userId + "/" + budgetId);
            const data = await response.json();
            setCategories(data);
            addCategoryTotals(data);
            setCategoriesLoading(false);
        }
        catch (error) {
            console.log(error);
        }
    }

    //Add the total from each Category.
    function addCategoryTotals(data) {
        var total = 0;
        for (var i = 0; i < data.length; i++) {
            total += data[i].categoryTotal;
        }
        setCategoryTotals(total.toFixed(2));
    }


    

    useEffect(() => {
        populateCategories();
    }, []);
    
    function tabView() {
        if (tabValue === 'one') {
            return (
                <CategoryPurchaseForm />
            );
        }
        else if (tabValue === 'two') {
            return (
                <CategoryInfo categories={categories} categoryTotals={categoryTotals} categoriesLoading={categoriesLoading} budget={budget} userId={userId} populateCategories={populateCategories} />
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


