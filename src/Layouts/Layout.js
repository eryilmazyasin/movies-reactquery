import React from "react";
import Container from "@material-ui/core/Container";
import Navbar from "../components/partials/Navbar";
import { Routes } from '../routes/Routes';

export default function Layout() {
  return (
    <>      
      <Container style={{ padding: 10 }}>
      <Navbar></Navbar>
        <Routes />
      </Container>
    </>
  );
}
