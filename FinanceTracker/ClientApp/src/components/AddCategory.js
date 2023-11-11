import './AddCategory.css';

export const AddCategory = (props) => {

    //Expand form where a user can add a new Category to their Budget.
    const openCategoryForm = (e) => {

        //Open 'Category Form' when 'Add Category Button' is clicked.
        const form = document.querySelector('.add-category-form');
        form.classList.toggle('hide');

        //Change innerHTML of 'Add Category Button' depending on the 'Category Form' being open or closed.
        const button = e.target;
        (!form.classList.contains('hide'))
            ? button.innerHTML = 'Close'
            : button.innerHTML = 'Add Category';

        //Reset any current values in the input box.
        const inputs = document.querySelectorAll('.form-input');
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].value = '';
        }

        //Reset any current error messages.
        const errorMessage = document.querySelector('#category-error-msg');
        errorMessage.innerHTML = "&nbsp;";

    }


    const closeCategoryForm = () => {
        //Collapse the 'Add Category' form.
        const form = document.querySelector('.add-category-form');
        form.classList.add('hide');

        //Reset innerHTML of 'Add Category' button.
        const button = document.querySelector('.add-category-btn');
        button.innerHTML = "Add Category";
    }






    //Create a Category to the Selected Budget in the Database.
    async function createCategory(e) {
        e.preventDefault();
        const userId = props.budget.userId;
        const budgetId = props.budget.id;
        const categoryName = e.target[0].value;
        const categoryLimit = e.target[1].value;

        const errorMessage = document.querySelector('#category-error-msg');

        if (!categoryLimit || !categoryName) {
            errorMessage.innerHTML = "Ensure all fields are filled out."
        }

        //Reset any error messages and send params to CategoriesController to create a new Category.
        else {
            
            errorMessage.innerHTML = "&nbsp;"

            const categoryToAdd = {
                userId: userId,
                budgetId: budgetId,
                categoryName: categoryName,
                categoryLimit: categoryLimit
            }

            const requestOptions = {
                method: 'Post',
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify(categoryToAdd),
            }

            try {
                const response = await fetch('/categories', requestOptions);
                closeCategoryForm();
                props.populateCategories();
            }
            catch (error) {
                console.log(error.message);
            }
            
            
        }
    }




    

    return (
        <div id="add-category">
            <p className="add-category-btn" onClick={(e) => openCategoryForm(e) }>Add Category</p>

            <form className="add-category-form hide" onSubmit={(e) => createCategory(e) } >
                <label className="form-label">Category Name</label>
                <input className="form-input" type="text" maxLength='25'></input>

                <label className="form-label">Category Limit</label>
                <input className="form-input" type="number" min="0.1" step="0.01" max="99999999.99"></input>

                <input className='submit-btn' type="submit" value="Add Category"></input>
                <p id='category-error-msg'>&nbsp;</p>
            </form>
        </div>

    );

}
