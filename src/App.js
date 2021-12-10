import React, { useState, useEffect } from 'react'
import HomePage from './pages/HomePage'
import ListTripsPage from './pages/ListTripsPage';
import ApplicationFormPage from './pages/ApplicationFormPage';
import LoginPage from './pages/LoginPage';
import AdminHomePage from './pages/AdminHomePage';
import CreateTripPage from './pages/CreateTripPage';
import TripDetailsPage from './pages/TripDetailsPage';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import {useHistory} from "react-router-dom"

function App() {

  const [viagens, setviagens] = useState ([])

  const history = useHistory()

  const getTrips = () => {

    axios.get ('https://us-central1-labenu-apis.cloudfunctions.net/labeX/guilherme-amaral-lovelace/trips')

    .then ((res) => {
      setviagens (res.data.trips)
  
    })
    .catch ((err) => {
      alert (err.data)
    })
  }

  useEffect(() => {

    getTrips()

  }, [])


  return (

    <div>
      
      <BrowserRouter>
        <Switch>

          <Route exact path={"/"}>
            <HomePage />
          </Route>

          <Route exact path={"/trips/list"}>
            <ListTripsPage viagens={viagens}/>
          </Route>

          <Route exact path={"/trips/application"}>
            <ApplicationFormPage  viagens={viagens} getTrips={getTrips}/>
          </Route>

          <Route exact path={"/login"}>
            <LoginPage />
          </Route>

          <Route exact path={"/admin/trips/list"}>
            <AdminHomePage viagens={viagens} getTrips={getTrips} />
          </Route>

          <Route exact path={"/admin/trips/create"}>
            <CreateTripPage getTrips={getTrips}/>
          </Route>

          <Route exact path={"/admin/trips/:id"}>
            <TripDetailsPage />
          </Route>

        </Switch>
          
      </BrowserRouter>

    </div>
  );
}

export default App;
