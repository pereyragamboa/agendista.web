import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import Footer from './footer';
import Header from './header';
import './app.css';

const AppBody = React.lazy(() => import('./appBody'));
const Waiting = () => <h1 className="title">Cargando...</h1>;

class App extends React.Component
{
  render(){
    return (
        <ApolloProvider client={this.props.client}>
          <BrowserRouter>
            <div className="App hero is-fullheight">
              <Header/>
              <div className="hero-body">
                <div className="container">
                  <React.Suspense fallback={Waiting()}>
                    <AppBody/>
                  </React.Suspense>
                </div>
              </div>
              <Footer/>
            </div>
          </BrowserRouter>
        </ApolloProvider>
    );
  }
}

export default App;
