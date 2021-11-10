import React, { useState, useEffect } from "react";
import { useQueryClient } from "react-query";
import { useLocation } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";


import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import { pages } from "../../utils/constants";
import FavoritesPopper from '../Navbar/FavoritesPopper';
import SearchPopper from '../Navbar/SearchPopper';

import { useGlobalState } from "../../../src/providers/GlobalStateProvider";
import { useSearchMovie } from "../../services/useSearchMovie";

const useStyles = makeStyles((theme) => ({
  root: {
    "& a": {
      color: "black",
      textDecoration: "none",
      "&:active": {
        color: "#5a4444",
      },
    },
  },
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const LinkItem = styled(Link)(({ theme }) => ({
  paddingBlockStart: "1em",
  paddingBlockEnd: "1em",
  paddingInlineStart: "0px",
  paddingInlineEnd: "0px",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [movie, setMovie] = useState(null);
  const [searchPopper, setSearchPopper] = useState(false);

  const classes = useStyles();
  const location = useLocation();
  const queryClient = useQueryClient();

  const timer = React.useRef();

  const currentPage = location.pathname;

  const { favorites, setOpenModal } = useGlobalState();

  const {
    status,
    data: searchResult,
    error,
    isFetching,
  } = useSearchMovie(movie);

  const handlePopperClick = (e) => {
    if (favorites.length > 0) {
      setAnchorEl(e.currentTarget);
      setOpen(!open);
    }
  };

  const handleClickAway = () => {
    setOpen(false);
    setSearchPopper(false);
  };

  const handleOnChangeInput = (e) => {
    setAnchorEl(e.currentTarget);

    if (e.target.value) {
      if (timer.current) {
        clearTimeout(timer.current)
      }

      if (e.target.value.length <= 2) {
        setMovie(e.target.value);
      } else {
        timer.current = setTimeout(() => {
          setMovie(e.target.value);
        }, 900)
      }

      setSearchPopper(true);
    } else {
      setSearchPopper(false);
    }
  };

  const renderMenuItems = pages.map((item, id) => (
    <MenuItem key={id}>
      <LinkItem to={`${item.to}`}>{item.title}</LinkItem>
    </MenuItem>
  ));

  return (
    <Box sx={{ flexGrow: 1 }} className={classes.root}>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" }, mr: "25px" }}
          >
            Movies API
          </Typography>
          {renderMenuItems}
          <Box sx={{ flexGrow: 1 }} />
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search movie.."
              inputProps={{ "aria-label": "search" }}
              onChange={handleOnChangeInput}
              onClick={handleOnChangeInput}
            />
          </Search>
          <Box sx={{ display: { xs: "flex", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show favorites"
              color="inherit"
              onClick={handlePopperClick}
            >
              <Badge badgeContent={favorites.length} color="error" max={99}>
                <FavoriteIcon />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <FavoritesPopper favorites={favorites} setOpenModal={setOpenModal} anchorEl={anchorEl} handleClickAway={handleClickAway} open={open} />
      <SearchPopper searchResult={searchResult} isFetching={isFetching} setOpenModal={setOpenModal} anchorEl={anchorEl} handleClickAway={handleClickAway} open={searchPopper} />
    </Box>
  );
}
