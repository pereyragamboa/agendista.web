import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import './index.css';
import App from './components/app';
import { uri } from './serverData.js';
import * as serviceWorker from './serviceWorker';

const client = new ApolloClient({ uri });

ReactDOM.render(<App client={client} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
