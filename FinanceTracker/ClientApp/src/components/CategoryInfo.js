import './CategoryInfo.css';

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
                <h4>You currently have <strong>{props.categories.length}</strong> categories associated with this budget.</h4>
                <div>Create a category by clicking on 'Add Category' above.</div>
            </div>
        );
    }

    //Return a list of the users categories if any are retrieved from the database.
    else
        return (
            <div className="category-info">
                {
                    props.categories.map(category => 
                        <h1 key={category.id}>{category.categoryName}</h1>
                    )
                    //<CategoryItem key={category.id} category={category} />
                }

            </div>
        );

} 
