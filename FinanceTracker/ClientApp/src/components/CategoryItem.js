import ModifyCategoryModal from './ModifyCategoryModal';
import { useState } from 'react';
import './CategoryItem.css';
import Stack from '@mui/material/Stack';
import { DeleteArrowIcon, ModifyIcon } from './Buttons';

export const CategoryItem = (props) => {

    async function deleteCategoryItem() {

        const categoryToDelete = {
            userId: props.userId,
            categoryId: props.category.id,
            budgetId: props.category.budgetId
        }

        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify(categoryToDelete)
        }

        try {
            await fetch('categories', requestOptions)
            props.populateCategories();
        }
        catch (error) {
            console.log(error);
        }
    }


    return (
        

        <div className="category-item">
           <div className="category-name">{props.category.categoryName}</div>
            <div className="category-total">${props.category.categoryTotal.toFixed(2)}</div>

            <Stack direction="row" spacing={3}>
                <ModifyCategoryModal populateCategories={props.populateCategories} userId={props.userId} category={props.category} deleteCategoryItem={deleteCategoryItem} />
                <DeleteArrowIcon action={deleteCategoryItem} />
            </Stack>
        </div>
            
       
        
    );


}
