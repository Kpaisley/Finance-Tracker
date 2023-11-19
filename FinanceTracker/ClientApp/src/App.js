import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from './components/Home';
import { Layout } from './components/Layout';
import { SelectedBudget } from './components/SelectedBudget';
import { SelectedBudgetRedirect } from './components/SelectedBudgetRedirect';
import './custom.css';

const App = () => {

    return (
      <Layout>
            <Routes>
                <Route path="/" index="true" element={<Home />}></Route>
                <Route path='/user-budget' element={<SelectedBudgetRedirect />}></Route>
            </Routes>
      </Layout>
    );
}

export default App;