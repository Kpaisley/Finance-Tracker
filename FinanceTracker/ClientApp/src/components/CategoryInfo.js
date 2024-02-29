import { useState } from 'react';
import { PrimaryButton } from './Buttons';
import './CategoryInfo.css';
import { CategoryItem } from './CategoryItem';
import AddCategoryModal from './AddCategoryModal';

export const CategoryInfo = (props) => {

    //Return loader icon if categories are populating.
    if (props.categoriesLoading) {
        return (
            <div className="loader"><div></div><div></div><div></div><div></div></div>
        );
    }

    //Return message to user that there are no categories associated with the selected budget.
    else if (props.categories.length <= 0) {
        return (
            <div className="no-categories">
                
                <h3>You currently have <strong>{props.categories.length}</strong> categories associated with this budget.</h3>
                <AddCategoryModal userId={props.userId} budgetId={props.budget.id} populateCategories={props.populateCategories} />
            </div>
        );
    }

    //Return a list of the users categories if any are retrieved from the database.
    else
        return (
            <div className="category-info">
                <h2>Manage your Categories Below!</h2>
                <AddCategoryModal userId={props.userId} budgetId={props.budget.id} populateCategories={props.populateCategories} />
                    
                
                <br />
                {
                    props.categories.map(category =>
                        <CategoryItem key={category.id} userId={props.userId} category={category} populateCategories={props.populateCategories} />
                    )
                }
            </div>
        );

} 
