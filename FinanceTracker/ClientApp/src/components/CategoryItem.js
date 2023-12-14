import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDeleteLeft, faPenToSquare, faSolid } from '@fortawesome/free-solid-svg-icons';
import './CategoryItem.css';

export const CategoryItem = (props) => {

    
    

    return (
        <div className="category-item">
            <div className="category-name">{props.category.categoryName}</div>
            <div className="category-total">${props.category.categoryTotal.toFixed(2)}</div>
            <div className="category-options">
                <FontAwesomeIcon icon={faPenToSquare} className="modify-category-icon"></FontAwesomeIcon>
                <FontAwesomeIcon icon={faDeleteLeft} className='delete-category-icon'></FontAwesomeIcon>
                <span className="delete-icon-bg"></span> {/*Small white background behind the delete button*/}
            </div>
        </div>
    );
    

}
