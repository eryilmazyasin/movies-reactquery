import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Home from "../screens/Home";
import PopularMovies from "../screens/PopularMovies";
import TopRatedMovies from "../screens/TopRatedMovies";

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
        <Route exact path="/topRatedMovies/">
          <TopRatedMovies />
        </Route>
        <Route path="/topRatedMovies/:movieId">
          <TopRatedMovies />
        </Route>
      </Switch>
    </>
  );
};
