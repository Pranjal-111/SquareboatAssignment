import React from 'react';
import Login from "./Pages/Login";
import {BrowserRouter,Route, Switch} from 'react-router-dom'
import "./App.css";
import PostJobs from './Pages/PostJobs';

function App() {
  return ( 
    <BrowserRouter>
         <Switch>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/postedjob" component={PostJobs}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
