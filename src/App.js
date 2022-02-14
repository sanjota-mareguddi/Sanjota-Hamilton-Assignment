
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Footer from './shared/components/Footer/Footer';
import Header from './shared/components/Header/Header';
import MoviesDetail from './module/Movies/list/MoviesDetail/MoviesDetail'
import MovieHomePage from './module/Movies/home/home'
import './App.scss';


function App() {
 return (
    <div className="App">
      <Router>
        <Header></Header>
      <div className="container">
          <Switch>
            <Route path="/" exact component={MovieHomePage} />
            <Route path="/movie/:imdbID" component={MoviesDetail} />
          </Switch>
        </div>
        <Footer />
      </Router>
    </div>

  );
}

export default App;
