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
    const [categoriesLoading, setCategoriesLoading] = useState(true);
    const [currentCategories, setCurrentCategories] = useState([]);
    const [currentCategoriesLoading, setCurrentCategoriesLoading] = useState(true);
    const [purchases, setPurchases] = useState([]);
    const [purchasesLoading, setPurchasesLoading] = useState(true);
    const [tabValue, setTabValue] = useState('one');
    const date = new Date();
    const [month, setMonth] = useState(date.getMonth());
    const [year, setYear] = useState(date.getFullYear());

    
    //Populate Purchases from PurchasesController from the selected month
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



    //Populate Categories from CategoriesController from the selected month.
    async function populateCategories() {
        
        const budgetId = budget.id;
        
        try {
            const response = await fetch('categories/' + userId + "/" + budgetId + "/" + month + "/" + year);
            const data = await response.json();
            setCategories(data);
            setCategoriesLoading(false);
        }
        catch (error) {
            console.log(error);
        }
    }

    async function populateCurrentCategories() {
        
        const budgetId = budget.id;

        try {
            const response = await fetch('categories/' + userId + '/' + budgetId);
            const data = await response.json();
            setCurrentCategories(data);
            setCurrentCategoriesLoading(false);

        }
        catch (error) {
            console.log(error);
        }
    }

    

    //Populate Categories & Purchases on load && when user changes month / year value
    useEffect(() => {
        setCategoriesLoading(true);
        populateCategories();
        setPurchasesLoading(true);
        populatePurchases();
    }, [month])


    //Populate CurrentCategories on load
    useEffect(() => {
        populateCurrentCategories();
    }, [])
    

    function tabView() {
        if (tabValue === 'one') {
            return (
                <PurchaseInfo purchases={purchases} purchasesLoading={purchasesLoading} setPurchasesLoading={setPurchasesLoading} populatePurchases={populatePurchases} categories={categories} categoriesLoading={categoriesLoading}
                    populateCategories={populateCategories} userId={userId} budget={budget} month={month} setMonth={setMonth} year={year} setYear={setYear} />
            );
        }
        else if (tabValue === 'two') {
            return (
                <CategoryInfo currentCategories={currentCategories} currentCategoriesLoading={currentCategoriesLoading} populateCurrentCategories={populateCurrentCategories} populateCategories={populateCategories}
                    populatePurchases={populatePurchases} userId={userId} budgetId={budget.id} />
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


