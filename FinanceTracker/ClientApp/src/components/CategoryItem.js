import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDeleteLeft, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import ModifyCategoryModal from './ModifyCategoryModal';
import { useState } from 'react';
import './CategoryItem.css';

export const CategoryItem = (props) => {
    
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
            <div className="category-options">
                <FontAwesomeIcon icon={faPenToSquare} className="modify-category-icon" onClick={handleOpen}></FontAwesomeIcon>
                <FontAwesomeIcon icon={faDeleteLeft} className='delete-category-icon' onClick={() => deleteCategoryItem() }></FontAwesomeIcon>
                <span className="delete-icon-bg"></span> {/*Small white background behind the delete button*/}
            </div>

            <ModifyCategoryModal open={open} setOpen={setOpen} handleOpen={handleOpen} handleClose={handleClose} category={props.category} />

        </div>
        
    );


}
