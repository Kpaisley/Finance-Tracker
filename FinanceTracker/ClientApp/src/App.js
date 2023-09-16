import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from './components/Home';
import { Layout } from './components/Layout';
import { useAuth0 } from "@auth0/auth0-react";
import './custom.css';

const App = () => {

    const { isLoading } = useAuth0();


    return (
      <Layout>
            <Routes>
                <Route path="/" index="true" element={<Home /> }></Route>
            </Routes>
      </Layout>
    );
  
}


export default App;