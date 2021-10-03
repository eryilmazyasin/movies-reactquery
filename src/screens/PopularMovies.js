import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { pages } from "../utils/constants";
import { Helmet } from "react-helmet";

//React Query
import { usePopularMovies } from "../services/usePopularMovies";
import { getPopularMovies } from "../services/methods/getPopularMovies";
import { useQueryClient } from "react-query";

//MUI
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";

//Components
import MovieDetail from "../components/MovieDetail";
import Pagination from '../components/Pagination';

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
    "& a ": {
      fontSize: 16,
      color: "black",
      textDecoration: "none",
      padding: 5,
    },
  },
  title: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "20px",
  },
}));

export default function PopularMovies() {
  const [page, setPage] = useState(1);
  const [listId, setListId] = useState(1);
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();
  const classes = useStyles();

  const { data, error, isPreviousData } = usePopularMovies(
    page,
    listId
  );

  const resTotalPage = data?.total_pages;
  const resPage = data?.page;

  const totalPageRef = useRef();

  // Prefetch the next page!
  useEffect(() => {
    if (resTotalPage > 1) {
      queryClient.prefetchQuery(
        ["getPopularMovies", page + 1, listId + 1],
        () => getPopularMovies(page + 1, listId + 1)
      );
    }
  }, [data, page, queryClient, listId]);

  const movieDetailModal = open && (
    <MovieDetail open={open} setOpen={setOpen} />
  );

  return (
    <>
      <div className={classes.root}>
        <Helmet>
          <title>{pages[1].title}</title>
        </Helmet>
        <div className={classes.title}>
          {error}
          <h2>{pages[1].title}</h2>
        </div>
        <Divider style={{ marginBottom: 20 }} />
        {data?.results.length > 0
          ? data?.results.map((movie, key) => (
              <li key={key}>
                <Link
                  to={`/popularMovies/${movie.id}`}
                  onClick={() => setOpen(true)}
                >
                  {movie.original_title}
                </Link>
              </li>
            ))
          : "This list has no result"}
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
