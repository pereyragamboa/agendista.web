import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import './index.css';
import App from './components/app';
import { uri } from './serverData.js';
import * as serviceWorker from './serviceWorker';
// TODO: delete next line
import gql from 'graphql-tag';

const cache = new InMemoryCache();
cache.writeData({
  data: {
    //getAllCustomers: []
  }
});

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.forEach(({ message, location, path}) => {
          console.log(`GQL error: ${message}; location: ${location}; path: ${path}`);
        });
      }
      if (networkError) {
        console.log(`Network error: ${networkError}`);
      }
    }),
    new HttpLink({
      uri: uri,
      credentials: 'same-origin'
    }),
  ]),
  cache,
  resolvers: {
    Query: {
      getCustomer: (root, { clientId }, { cache, getCacheKey }) => {
        console.log(`clientId = ${clientId}`);
        const key = getCacheKey({__typename: "Customer", id: clientId });
        console.log(`key = ${key}`);
        console.log(cache.data);
        return cache.data ? cache.data.get(key) : { id: clientId,
          firstName: "", lastName: "", telephone: "", email: ""
        };
      }
    }
  }
});

ReactDOM.render(<App client={client} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
