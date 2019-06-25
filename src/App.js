import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Footer from './components/footer';
import Header from './components/header';
import './App.css';

const AppBody = React.lazy(() => import('./appBody'));
const Waiting = () => <h1 className="title">Cargando...</h1>;

function App()
{
  return (
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
  );
}

export default App;
