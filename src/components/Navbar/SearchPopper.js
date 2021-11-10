import React from 'react'
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import Popper from "@mui/material/Popper";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import ClickAwayListener from "@mui/material/ClickAwayListener";

import Image from "../UI/Image";


export default function SearchPopper({ searchResult, setOpenModal, anchorEl, handleClickAway, open, isFetching }) {
    const location = useLocation();
    const currentPage = location.pathname;

    return (
        <Popper
            open={open}
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
                            {isFetching && <CircularProgress sx={{ margin: '0 auto', display: 'inherit' }} />}
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
    )
}
