import { useEffect } from 'react';
import { useState } from 'react';
import './AddBudget.css';

export const AddBudget = (props) => {

    const [formOpen, setFormOpen] = useState(false);

    

    return (
        <>
            <p>Add Budget</p>
            <form className="add-budget-form">
                <label>Budget Name:
                    <input type="text"></input>
                </label>
            </form>
        </>
    );
}
