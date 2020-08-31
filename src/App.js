import React from 'react';
import logo from './logo.svg';
import './App.css';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
// import Home from './components/Home'
import EmployeeDetails from './components/EmployeeDetails'
import Home from './components/Home'
import { BrowserRouter,Switch,Route } from 'react-router-dom';

function App() {
  
  return (
    <>
    <BrowserRouter>

    <div className="App">
      <Switch>
      <Route path="/" component={Home} exact/>
      <Route path="/employee/:employeeName" component={EmployeeDetails} />

      </Switch>
    </div>
    </BrowserRouter> 
    </>
  );
  
}

export default App;
