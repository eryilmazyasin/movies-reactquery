import React, { useState, useEffect } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import FavoriteIcon from "@mui/icons-material/Favorite";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import Popper from "@mui/material/Popper";
import Fade from "@mui/material/Fade";
import ClickAwayListener from '@mui/material/ClickAwayListener';

import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import { pages } from "../../utils/constants";

import { useGlobalState } from "../../../src/providers/GlobalStateProvider";

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
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const classes = useStyles();

  const { favorites } = useGlobalState();

  console.log({ favorites });
  console.log({ anchorEl });

  const handlePopperClick = (e) => {    
    setAnchorEl(e.currentTarget);
    setOpen(!open);
  }

  const handleClickAway = () => {    
    setOpen(false);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const renderMenuItems = pages.map((item, id) => (
    <MenuItem key={id}>
      <LinkItem to={`${item.to}`}>{item.title}</LinkItem>
    </MenuItem>
  ));

  const menuId = "primary-search-account-menu";

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={favorites.length} color="error">
            <FavoriteIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
    </Menu>
  );

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
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Movies API
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search movie.."
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          {renderMenuItems}
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show favorites"
              color="inherit"
            >
              <Badge badgeContent={favorites.length} color="error" max={99} onClick={handlePopperClick}>
                <FavoriteIcon />
              </Badge>
            </IconButton>            
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}      

      <Popper id="test" open={open && favorites.length > 0} anchorEl={anchorEl} placement="bottom-start" transition>
        {({ TransitionProps }) => (
          <ClickAwayListener onClickAway={handleClickAway}>
          <Fade {...TransitionProps}>
            <Box
              sx={{
                boxShadow: 3,
                p: 1,
                bgcolor: "background.paper",
                maxWidth: "300px",
                maxHeight: "350px",
                overflow: "hidden",
                overflowY: "auto",
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3>Favorites</h3>
              <small >{favorites.length} item</small>
              </Box>              
              {favorites.map((item) => (
                <Box
                  key={item.id}
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    background: "#f3f3f3",
                  }}
                  my={1}
                >
                  <img src={item.image} alt={item.id} width="100"></img>
                  <h5 style={{ marginLeft: "5px" }}>{item.title}</h5>
                </Box>
              ))}
            </Box>
            </Fade>
            </ClickAwayListener>
        )}
        </Popper>        
    </Box>
  );
}
