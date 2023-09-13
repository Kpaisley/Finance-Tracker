import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from './components/Home';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { useAuth0 } from "@auth0/auth0-react";
import './custom.css';

const App = () => {

    const { isLoading } = useAuth0();


    return (
      <Layout>
            <Home />
      </Layout>
    );
  
}


export default App;