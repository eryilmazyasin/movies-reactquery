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
import Popper from "@mui/material/Popper";
import Fade from "@mui/material/Fade";
import CircularProgress from "@mui/material/CircularProgress";
import ClickAwayListener from "@mui/material/ClickAwayListener";

import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import { pages } from "../../utils/constants";
import Image from "../UI/Image";

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
      setMovie(e.target.value);
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

      <Popper open={open} anchorEl={anchorEl} placement="bottom-end" transition>
        {({ TransitionProps }) => (
          <ClickAwayListener onClickAway={handleClickAway}>
            <Fade {...TransitionProps}>
              <Box
                sx={{
                  boxShadow: 3,
                  p: 1,
                  bgcolor: "background.paper",
                  width: "300px",
                  maxHeight: "350px",
                  overflow: "hidden",
                  overflowY: "auto",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <h3>Favorites</h3>
                  <small>{favorites.length} item</small>
                </Box>
                {favorites.map((item) => (
                  <Link
                    key={item.id}
                    to={`${currentPage}/${item.id}`}
                    onClick={() => setOpenModal(true)}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        background: "#f3f3f3",
                      }}
                      my={1}
                    >
                      <img src={item.image} alt={item.id} width="100"></img>
                      <h5 style={{ margin: "0 5px", fontWeight: "500" }}>
                        {item.title}
                      </h5>
                    </Box>
                  </Link>
                ))}
              </Box>
            </Fade>
          </ClickAwayListener>
        )}
      </Popper>

      <Popper
        open={searchPopper}
        anchorEl={anchorEl}
        placement="bottom-end"
        transition
      >
        {({ TransitionProps }) => (
          <ClickAwayListener onClickAway={handleClickAway}>
            <Fade {...TransitionProps}>
              <Box
                sx={{
                  boxShadow: 3,
                  p: 1,
                  bgcolor: "background.paper",
                  width: "350px",
                  maxHeight: "400px",
                  overflow: "hidden",
                  overflowY: "auto",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <h3>Search Results</h3>
                  <small>{searchResult?.results.length} item</small>
                </Box>
                {isFetching && <CircularProgress />}
                {searchResult?.results?.map((item) => (
                  <Link
                    key={item.id}
                    to={`${currentPage}/${item.id}`}
                    onClick={() => setOpenModal(true)}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        background: "#f3f3f3",
                        minHeight: "30px",
                      }}
                      my={1}
                    >
                      {item.backdrop_path ? (
                        <Image
                          src={item.backdrop_path}
                          alt={item.title}
                          width="100"
                        ></Image>
                      ) : (
                        <Box
                          sx={{
                            minWidth: "100px",
                            height: "50px",
                            background: "black",
                            color: "white",
                            textAlign: "center",
                          }}
                        >
                          not found
                        </Box>
                      )}
                      <h5 style={{ margin: "0 5px", fontWeight: "500" }}>
                        {item.title}
                      </h5>
                    </Box>
                  </Link>
                ))}

                {!searchResult?.results.length && !isFetching && (
                  <Box sx={{ textAlign: "center", padding: "20px" }}>
                    no result
                  </Box>
                )}
              </Box>
            </Fade>
          </ClickAwayListener>
        )}
      </Popper>
    </Box>
  );
}
