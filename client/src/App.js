import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';
import NavBar from './layout/NavBar';
import PublicLanding from './layout/PublicLanding';

import ChefLandingPage from './chefs/ChefLandingPage';
import IngredientLandingPage from './ingredients/IngredientLandingPage';
import RecipesLandingPage from './recipes/RecipesLandingPage';
import Login from './login/Login';

const App = () => (
  <Router>
    <>
      <NavBar />
      <Route exact path="/" component={PublicLanding} />
      <section>
        <Switch>
          <Route exact path="/chefs" component={ChefLandingPage} />
          <Route exact path="/ingredients" component={IngredientLandingPage} />
          <Route exact path="/recipes" component={RecipesLandingPage} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </section>
    </>
  </Router>
);


export default App;
