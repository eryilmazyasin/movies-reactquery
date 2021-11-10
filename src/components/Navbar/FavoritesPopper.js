import React from 'react'
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import Popper from "@mui/material/Popper";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import ClickAwayListener from "@mui/material/ClickAwayListener";

export default function FavoritesPopper({ favorites, setOpenModal, anchorEl, handleClickAway, open }) {
    const location = useLocation();
    const currentPage = location.pathname;

    return (
        <Popper
            open={open}
            anchorEl={anchorEl}
            placement="bottom-end" transition>
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
    )
}
