import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Movies from "../components/MovieDetail";
import Home from "../screens/Home";
import PopularMovies from "../screens/PopularMovies";

export const Routes = () => {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/popularMovies/">
          <PopularMovies />
        </Route>
        <Route path="/popularMovies/:movieId">
          <PopularMovies />
        </Route>
      </Switch>
    </>
  );
};
