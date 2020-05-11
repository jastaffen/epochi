import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

// redux
import { Provider } from 'react-redux';
import store from './store';


import Login from './components/auth/Login';
import PrivateRoute from './components/routing/PrivateRoute';
import Dashboard from './components/Dashboard';
import AddOrUpdateChef from './components/chefs/AddOrUpdateChef';
import ChefSelectionMenu from './components/chefs/ChefSelectionMenu';
import UpdateChef from './components/chefs/UpdateChef';
import AddOrUpdateIngredient from './components/ingredients/AddOrUpdateIngredient';
import UpdateIngredient from './components/ingredients/UpdateIngredient';

const  App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path='/' component={Login} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />

          {/* chef routes */}
          <PrivateRoute exact path="/add-chef" component={AddOrUpdateChef} />
          <PrivateRoute exact path="/edit-chef/:chef_id" component={UpdateChef} />
          <PrivateRoute exact path="/chef-selection" component={ChefSelectionMenu} />

          {/* ingredient routes */}
          <PrivateRoute exact path="/add-ingredient" component={AddOrUpdateIngredient} />
          <PrivateRoute exact path="/edit-ingredient/:ingredient_id" component={UpdateIngredient} />
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
