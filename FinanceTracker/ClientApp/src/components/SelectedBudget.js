import { useEffect, useState } from 'react';
import { CategoryInfo } from './CategoryInfo';
import { LinkButton, LogoutButton } from './Buttons';
import { SelectedBudgetTab } from './SelectedBudgetTab';
import './SelectedBudget.css';
import { PurchaseInfo } from './PurchaseInfo';


export const SelectedBudget = (props) => {
    const budget = props.budget;
    const userId = props.budget.userId;
    const [categories, setCategories] = useState([]);
    const [categoryTotals, setCategoryTotals] = useState(0.00);
    const [categoriesLoading, setCategoriesLoading] = useState(true);
    const [purchases, setPurchases] = useState([]);
    const [purchasesLoading, setPurchasesLoading] = useState(true);
    const [tabValue, setTabValue] = useState('one');
    const date = new Date();
    const [month, setMonth] = useState(date.getMonth());
    const [year, setYear] = useState(date.getFullYear());

    

    async function populatePurchases() {

        const budgetId = budget.id;

       
        try {
            const response = await fetch('purchases/' + userId + "/" + budgetId + "/" + month + "/" + year);
            const data = await response.json();
            setPurchases(data);
            setPurchasesLoading(false);
        }
        catch (error) {
            console.log(error);
        }
    }






    //Populate Categories from CategoriesController.
    async function populateCategories() {
        
        
        const budgetId = budget.id;

        try {
            const response = await fetch('categories/' + userId + "/" + budgetId + "/" + month + "/" + year);
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


    
    //Populate Purchases & Categories on load.
    useEffect(() => {
        populatePurchases();
        populateCategories();
    }, []);

    //Populate Purchases & Categories when user changes month / year value
    useEffect(() => {
        populatePurchases();
        populateCategories();
    }, [month])

    
    function tabView() {
        if (tabValue === 'one') {
            return (
                <PurchaseInfo purchases={purchases} purchasesLoading={purchasesLoading} populatePurchases={populatePurchases} categories={categories} categoriesLoading={categoriesLoading} populateCategories={populateCategories}
                    userId={userId} budget={budget} month={month} setMonth={setMonth} year={year} setYear={setYear} />
            );
        }
        else if (tabValue === 'two') {
            return (
                <CategoryInfo categories={categories} categoryTotals={categoryTotals} categoriesLoading={categoriesLoading} budget={budget} userId={userId} populatePurchases={populatePurchases} populateCategories={populateCategories} />
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


