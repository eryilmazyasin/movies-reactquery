import React, { useEffect, useState, useRef } from "react";
import { useList } from '../services/useList';
import { getList } from '../services/methods/getList';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Select from '@material-ui/core/Select';
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { useQueryClient } from 'react-query'
import { makeStyles } from '@material-ui/core/styles';

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
  const [errorMessage, setErrorMessage] = useState('');

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
  }, [data, page, queryClient, listId])

  useEffect(() => {
    alert('did update');
    totalPageRef.current.style.color = 'red';
    return () => {
      alert('will unmount');
      totalPageRef.current.style.color = 'blue';
    }
  }, [])

  const nextPage = () => {
    setPage(old => (data?.total_pages > 1 ? old + 1 : old))
  }

  const prevPage = () => {
    setPage(old => Math.max(old - 1, 0))
  }

  const getRandomList = () => {
    setListId(Math.floor(Math.random() * (99 - 1) + 1))
    setPage(1)

    console.log('listId');
    console.log(listId);
  }

  console.log('gelen data');
  console.log({ status, data, error, isFetching, isPreviousData });

  return (
    <div>
      <div>
        <div className={classes.title}>
          {error}
          <h2>{data?.name}</h2>
          <Button variant="contained" onClick={getRandomList}>
            Get Random List
          </Button>
        </div>
        <Divider />
        {data?.results.length > 0 ? (
          data?.results.map((title, id) => (
            <h5 key={id}>{title.original_title}</h5>
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
      </div>
    </div>
  );
}


// todo:hataları ekrana bas, gelen dataları incele, old data neymiş ona bak
