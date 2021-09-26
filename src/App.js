import './App.css';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import Container from '@material-ui/core/Container';
import React from 'react';
import List from './components/List';
import { ReactQueryDevtools } from 'react-query/devtools'

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
      <Container>
        <List></List>
      </Container>
      <ReactQueryDevtools initialIsOpen={false}/>
    </QueryClientProvider>

  );
}

export default App;
