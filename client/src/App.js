import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// redux
import { Provider } from 'react-redux';
import store from './store';

// styling
import './App.scss';


import NavBar from './layout/NavBar';
import PublicLanding from './layout/PublicLanding';

import ChefLandingPage from './chefs/ChefLandingPage';
import IngredientLandingPage from './ingredients/IngredientLandingPage';
import RecipesLandingPage from './recipes/RecipesLandingPage';
import Login from './login/Login';
import ChefProfile from './chefs/ChefProfile';
import IngredientRecipes from './ingredients/IngredientRecipes';

const App = () => (
  <Provider store={store}>
    <Router>
      <>
        <NavBar />
        <Route exact path="/" component={ PublicLanding } />
        <section>
          <Switch>
            <Route exact path="/chefs" component={ ChefLandingPage } />
            <Route exact path="/chefs/:id" component={ ChefProfile } />
            <Route exact path="/ingredients" component={ IngredientLandingPage } />
            <Route exact path="/:ingredientId/recipes" component={ IngredientRecipes } />
            <Route exact path="/recipes" component={ RecipesLandingPage } />
            <Route exact path="/login" component={ Login } />
          </Switch>
        </section>
      </>
    </Router>
  </Provider>
);


export default App;
