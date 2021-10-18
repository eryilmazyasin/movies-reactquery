import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { pages } from "../utils/constants";
import { Helmet } from "react-helmet";

//React Query
import { useTopRatedMovies } from "../services/useTopRatedMovies";
import { getTopRatedMovies } from "../services/methods/getTopRatedMovies";
import { useQueryClient } from "react-query";

//MUI
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';


//Components
import MovieDetail from "../components/MovieDetail";
import Pagination from '../components/Pagination';
import Image from '../components/UI/Image';

import { useGlobalState } from '../providers/GlobalStateProvider';

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
    "& a ": {
      fontSize: 16,
      color: 'black',
      textDecoration: 'none',
      margin: 5,      
    }
  },
  title: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "20px",
  },
  movieBox: {
    display: 'block',
    position: 'relative',    
  },
  movieTitle: {
    position: 'absolute',
    inset: '0 0 0 0',
    color: 'white',
    background: 'rgba(0,0,0, .5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '&:hover': {
      background: 'transparent',
      color: 'white'
  }
  }
}));

export default function TopRatedMovies() {
  const [page, setPage] = useState(1);
  const [listId, setListId] = useState(1);

  const queryClient = useQueryClient();
  const classes = useStyles();

  const { openModal, setOpenModal } = useGlobalState();

  const { status, data, error, isFetching, isPreviousData } = useTopRatedMovies(
    page,
    listId
  );

  const resTotalPage = data?.total_pages;
  const resPage = data?.page;

  const totalPageRef = useRef();

  // Prefetch the next page!
  useEffect(() => {
    if (data?.total_pages > 1) {
      queryClient.prefetchQuery(["getTopRatedMovies", page + 1, listId + 1], () =>
        getTopRatedMovies(page + 1, listId + 1)
      );
    }
  }, [data, page, queryClient, listId]);

  const movieDetailModal = openModal && <MovieDetail open={openModal} setOpen={setOpenModal} />;  

  return (
    <>
      <div className={classes.root}>
        <Helmet>
          <title>{pages[2].title}</title>
        </Helmet>
        <div className={classes.title}>
          {error}
          <h2>{pages[2].title}</h2>
        </div>
        <Divider style={{ marginBottom: 20 }} />
        <Grid container spacing="2">        
        {data?.results.length > 0
            ? data?.results.map((movie, key) => (
            <Grid xs={3} key={key} spacing="2">
                <Link
                  to={`/topRatedMovies/${movie.id}`}
                  onClick={() => setOpenModal(true)}
                  className={classes.movieBox}
                >
                  <Image src={movie.backdrop_path} width="100%"></Image>
                  <h5 className={classes.movieTitle}>{movie.original_title}</h5>
                </Link>                
                </Grid>
            ))
            : <CircularProgress />}
          </Grid>
      </div>

      <Pagination
        resPage={resPage}
        page={page}
        setPage={setPage}
        isPreviousData={isPreviousData}
        resTotalPage={resTotalPage}
        totalPageRef={totalPageRef}      
      />

      {movieDetailModal}
    </>
  );
}
