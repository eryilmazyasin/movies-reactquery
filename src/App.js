import './App.css';
import {QueryClient, QueryClientProvider} from 'react-query'
import React from 'react';
import Layout from './Layout';
import { ReactQueryDevtools } from 'react-query/devtools'
import {BrowserRouter as Router} from "react-router-dom";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    }
  }
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Layout />  
        <ReactQueryDevtools initialIsOpen={false} />
      </Router>
    </QueryClientProvider>

  );
}

export default App;
