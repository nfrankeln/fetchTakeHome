import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraProvider, Heading } from '@chakra-ui/react';
import theme from './theme';
import ErrorBoundry from './components/ErrorBoundry';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ErrorBoundry fallback={<Heading>There is an Error in the app</Heading>}>
        <App />
      </ErrorBoundry>
    </ChakraProvider>
  </React.StrictMode>
);
