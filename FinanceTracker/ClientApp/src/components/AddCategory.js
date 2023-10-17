import './AddCategory.css';

export const AddCategory = () => {

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

        //Reset any current error messages
        const errorMessage = document.querySelector('#category-error-msg');
        errorMessage.innerHTML = '&nbsp;';

    }

    return (
        <div id="add-category">
            <p className="add-category-btn" onClick={(e) => openCategoryForm(e) }>Add Category</p>

            <form className="add-category-form hide" >
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
