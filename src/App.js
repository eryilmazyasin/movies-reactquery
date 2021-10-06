import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import React from "react";
import Layout from "./Layouts/Layout";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter as Router } from "react-router-dom";
import { GlobalStateProvider } from "../src/providers/GlobalStateProvider";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <GlobalStateProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Layout />
          <ReactQueryDevtools initialIsOpen={false} />
        </Router>
      </QueryClientProvider>
    </GlobalStateProvider>
  );
}

export default App;
