import React from "react";

//MUI
import { makeStyles } from "@material-ui/core/styles";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(2),
    },
    "& a ": {
      fontSize: 16,
      color: "black",
      textDecoration: "none",
      padding: 5,
        },
        "& .MuiDivider-root": {
        margin: '20px 0'
    }
  },
}));

export default function Pagination(props) {
  const { resPage, page, setPage, isPreviousData, resTotalPage, totalPageRef } = props;

  const classes = useStyles();

  const nextPage = () => {
    setPage((old) => (resTotalPage > 1 ? old + 1 : old));
  };

  const prevPage = () => {
    setPage((old) => Math.max(old - 1, 0));
  };

  return (
      <div className={classes.root}>
          <Divider />
      <Button variant="contained" onClick={prevPage} disabled={resPage === 1}>
        Prev
      </Button>
      <span>{page}</span>
      <Button
        variant="contained"
        onClick={nextPage}
        disabled={isPreviousData || resTotalPage <= resPage}
      >
        Next
      </Button>       
        <small ref={totalPageRef}>Total Page: {resTotalPage}</small>      
    </div>
  );
}
