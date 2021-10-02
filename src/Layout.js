import React from 'react'
import Container from '@material-ui/core/Container';
import List from './components/List';
import Movies from './components/Movies';
import Navbar from './components/partials/Navbar';
import { Switch, Route } from 'react-router'

export default function Layout() {
  return (
      <>
      <Container maxWidth={false} disableGutters={true}>
          <Navbar></Navbar>
      </Container>
      <Container>
          <List></List>          
          <Switch>
            <Route exact path="/movie/:movieId">
              <Movies/>
            </Route>
          </Switch>
      </Container>      
      </>
    )
}
