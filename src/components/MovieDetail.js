import { useParams } from "react-router-dom";
import { useMovie } from "../services/useMovie";
import React, { useEffect, useState, useRef } from "react";
import Image from "./UI/Image";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useHistory } from "react-router-dom";

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

export default function Movies({ open, setOpen }) {
  //const [open, setOpen] = React.useState(false);
  const history = useHistory();  

  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  let { movieId } = useParams();

  const { data, isFetching } = useMovie(movieId);

  console.log({history});

  const handleClose = () => {
    setOpen(false);
    history.goBack();
  };

  useEffect(() => {
    setOpen(true);
  }, [data]);

  return (
    <div>
      {open && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {!isFetching ? (
              <>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  {data?.title}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <Image src={data?.backdrop_path} width="100%" />
                  Popularity: {data?.popularity}
                </Typography>
              </>
            ) : (
              "loading..."
            )}
          </Box>
        </Modal>
      )}
    </div>
  );
}
