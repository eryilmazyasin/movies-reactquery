import React from 'react'
import Container from '@material-ui/core/Container';
import List from './components/List';
import Movies from './components/Movies';
import { Switch, Route } from 'react-router'

export default function Layout() {
    return (        
        <Container>
            <List></List>
            <Switch>
            <Route exact path="/movie/:movieId">
              <Movies/>
            </Route>
          </Switch>
        </Container>
    )
}
