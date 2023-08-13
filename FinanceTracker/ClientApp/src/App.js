import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Counter } from './components/Counter';
import { FetchData } from './components/FetchData';
import { Home } from './components/Home';
import { Layout } from './components/Layout';
import './custom.css';
import { Dashboard } from './components/Dashboard';

export default class App extends Component {


  render() {
    return (
      <Layout>
            <Routes>
                <Route element={<Home />} index='true'></Route>
                <Route element={<Dashboard /> } path="/dashboard"></Route>
                <Route element={<Counter />} path='/counter'></Route>
                <Route element={<FetchData />} path='/fetch-data'></Route>
        </Routes>
      </Layout>
    );
  }
}
