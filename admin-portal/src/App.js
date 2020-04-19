import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

// redux
import { Provider } from 'react-redux';
import store from './store';


import Login from './components/auth/Login';
import PrivateRoute from './components/routing/PrivateRoute';
import Dashboard from './components/Dashboard';
import AddChef from './components/chefs/AddChef';
import ChefSelectionMenu from './components/chefs/ChefSelectionMenu';

const  App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path='/' component={Login} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/add-chef" component={AddChef} />
          <PrivateRoute exact path="/chef-selection" component={ChefSelectionMenu} />
        </Switch>
      </Router>
    </Provider>

  );
}

export default App;

{/* <AddIngredient />
        <AllIngredients />
        <AddChef />
        <AllChefs />
        <AddRecipe />
        <AllRecipes /> */}
