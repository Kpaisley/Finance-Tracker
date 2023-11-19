import './CategoryItem.css';

export const CategoryItem = (props) => {




    return (
        <div className="category-item">
            <h1>{props.category.categoryName}</h1>
        </div>
    );

}
