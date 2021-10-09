import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useMovie } from "../services/useMovie";

import { makeStyles } from "@material-ui/core/styles";
import Modal from "@mui/material/Modal";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { CDN } from "../utils/constants";

import { useGlobalState } from "../../src/providers/GlobalStateProvider";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiPaper-root": {
      maxHeight: "calc(100vh - 150px)",
    },
    "& .MuiCollapse-root": {
      maxHeight: "180px",
      overflowY: "scroll",
    },
  },
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Movies({ open, setOpen }) {
  const [expanded, setExpanded] = useState(false);
  const [isFav, setIsFav] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const history = useHistory();
  const classes = useStyles();

  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  let { movieId } = useParams();

  const { data, isFetching } = useMovie(movieId);

  const { favorites, setFavorites } = useGlobalState();

  const handleAddFavorite = () => {
    const newObject = {
      id: movieId,
      title: data?.title,
      image: CDN + data?.backdrop_path,
    };

    if (!isFav) {
      favorites.unshift(newObject);
      setIsFav(true);
    } else {
      favorites.shift(newObject);
      setIsFav(false);
    }

    console.log({ favorites });
  };  

  const favorited = () => {
    const isFav = favorites.some(movie => movie.id === movieId);
    isFav && setIsFav(true);
  }

  const handleClose = () => {
    setOpen(false);
    history.goBack();
  };

  const renderTitleCapitalize = () => {
    const title = data?.title;
    return title?.charAt(0).toUpperCase();
  };

  const renderGenres = () => {
    // First 3 element showing
    const genres = data?.genres
      .map((genre) => genre.name)
      .slice(0, 3)
      .join(", ");
    return genres;
  };

  useEffect(() => {
    setOpen(true);
    favorited();    
  }, [data]);

  return (
    <div>
      {open && !isFetching && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className={classes.root}
        >
          <Card sx={({ maxWidth: 345 }, style)}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  {renderTitleCapitalize()}
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={data?.title}
              subheader={renderGenres()}
            />
            <CardMedia
              component="img"
              height="194"
              image={CDN + data?.backdrop_path}
              alt="Paella dish"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {data?.overview}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton
                aria-label="add to favorites"
                onClick={handleAddFavorite}
              >
                <FavoriteIcon sx={isFav && { color: red[500] }} />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                {data?.tagline && (
                  <Typography
                    variant="subtitle1"
                    component="div"
                    gutterBottom={true}
                  >
                    <strong>Tagline</strong> <br></br>
                    {data?.tagline}
                  </Typography>
                )}
                {data?.popularity && (
                  <Typography variant="subtitle1" component="div">
                    <strong>Popularity</strong> <br></br>
                    {data?.popularity}
                  </Typography>
                )}
                {data?.release_date && (
                  <Typography variant="subtitle1" component="div">
                    <strong>Relase Date</strong> <br></br>
                    {data?.release_date}
                  </Typography>
                )}
                {data?.original_language && (
                  <Typography variant="subtitle1" component="div">
                    <strong>Language</strong> <br></br>
                    {/* Dil seçeneklerini fonksiyona çevirip Türkçeleştir */}
                    {data?.original_language === "en"
                      ? "English"
                      : data?.original_language}
                  </Typography>
                )}
              </CardContent>
            </Collapse>
          </Card>
        </Modal>
      )}
    </div>
  );
}
