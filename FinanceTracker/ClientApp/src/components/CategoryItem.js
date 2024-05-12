import ModifyCategoryModal from './ModifyCategoryModal';
import './CategoryItem.css';
import Stack from '@mui/material/Stack';
import { DeleteArrowIcon } from './Buttons';

export const CategoryItem = (props) => {

    async function deleteCategoryItem() {

        if (window.confirm('Are you sure you want to delete this category and all its related data?') === true) {

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
                await fetch('categories', requestOptions);
                props.populateCategories();
                props.populatePurchases();
            }
            catch (error) {
                console.log(error);
            }
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
