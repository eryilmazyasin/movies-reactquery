import React, { useEffect, useState, useRef } from "react";
import { useList } from '../services/useList';
import { getList } from '../services/methods/getList';
import Movies from './Movies';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { useQueryClient } from 'react-query'
import { makeStyles } from '@material-ui/core/styles';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    }
  },
  title: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '20px'
  }

}))

export default function List() {
  const [page, setPage] = useState(1)
  const [listId, setListId] = useState(1) 
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient()
  const classes = useStyles();

  const { status, data, error, isFetching, isPreviousData } = useList(page, listId)

  const resTotalPage = data?.total_pages;
  const resPage = data?.page; 

  const totalPageRef = useRef();

  // Prefetch the next page!
  useEffect(() => {
    if (data?.total_pages > 1) {
      queryClient.prefetchQuery(['getList', page + 1, listId + 1], () =>
        getList(page + 1, listId + 1)
      )
    }
  }, [data, page, queryClient, listId]);

  const nextPage = () => {
    setPage(old => (data?.total_pages > 1 ? old + 1 : old))
  }

  const prevPage = () => {
    setPage(old => Math.max(old - 1, 0))
  }

  return (
    <Router>
      <div>
        <div className={classes.title}>
          {error}
          <h2>Popular Movies</h2>
        </div>
        <Divider />
        {data?.results.length > 0 ? (
          data?.results.map((movie, key) => (
            <li key={key}> 
              <Link to={`/movie/${movie.id}`} onClick={() => setOpen(true)}>{movie.original_title}</Link>
            </li>
          ))
        ) : 'This list has no result'}
      </div>
      <div className={classes.root}>
        <Button variant="contained" onClick={prevPage} disabled={resPage === 1}>
          Prev
        </Button>
        <span>{page}</span>
        <Button variant="contained" onClick={nextPage} disabled={isPreviousData || resTotalPage <= resPage}>
          Next
        </Button>
        <Divider />
        <div>
          <small ref={totalPageRef}>Total Page: {resTotalPage}</small>
        </div>

        <Switch>
          <Route path="/movie/:movieId">
            <Movies open={open}/>
          </Route>
        </Switch>        
      </div>
    </Router>
  );
}