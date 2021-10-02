import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Movies from "../components/MovieDetail";
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
        <Route path="/topRatedMovies/">
          <TopRatedMovies />
        </Route>
        <Route path="/topRatedMovies/:movieId">
          <TopRatedMovies />
        </Route>
      </Switch>
    </>
  );
};
