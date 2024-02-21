import { PrimaryButton } from './Buttons';
import './CategoryInfo.css';
import { CategoryItem } from './CategoryItem';

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
                <div>Create a category by clicking on 'Add Category' above.</div>
            </div>
        );
    }

    //Return a list of the users categories if any are retrieved from the database.
    else
        return (
            <div className="category-info">
                <h2>Modify your Categories Below!</h2>
                <div>
                    <PrimaryButton text="Add Category" />
                </div>
                <br />
                {
                    props.categories.map(category =>
                        <CategoryItem key={category.id} userId={props.userId} category={category} populateCategories={props.populateCategories} />
                    )
                }
            </div>
        );

} 
