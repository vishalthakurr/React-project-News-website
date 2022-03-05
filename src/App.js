
import './App.css';

import React, { Component } from 'react'
import Navbar from './component/Navbar';
import News   from './component/News'

import {
  BrowserRouter as Router,
  Switch,
  Route,

} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'
 



export default class App extends Component {

  apikey ="a505232f817d471e8a4a7776c1d652f8"
  
  
  
  state = {
    progress :0  
  }
  
  setProgress =(progress)=>{
    this.setState({progress : progress})
  }
  render() {
    return (
      
      <div>
     
      
      
        <Router>
          <Navbar />
         
          <LoadingBar
          height ={3}
            color='#f11946'
            progress={this.state.progress}
         
          />
          <Switch>
            <Route exact path="/"><News  setProgress={this.setProgress} apikey={this.apikey}  key="general" pagesize={6} country="in" category="general" /></Route>
            <Route exact path="/general"><News  setProgress={this.setProgress} apikey={this.apikey}  key="general" pagesize={6} country="in" category="general" /></Route>
            <Route exact path="/business"><News  setProgress={this.setProgress} apikey={this.apikey}  key="business" pagesize={6} country="in" category="business" /></Route>
            <Route exact path="/entertainment"><News  setProgress={this.setProgress} apikey={this.apikey}  key="entertainment" pagesize={6} country="in" category="entertainment" /></Route>
            <Route exact path="/health"><News  setProgress={this.setProgress} apikey={this.apikey}  key="health" pagesize={6} country="in" category="health" /></Route>
            <Route exact path="/technology"><News  setProgress={this.setProgress} apikey={this.apikey}  key="technology" pagesize={6} country="in" category="technology" /></Route>
            <Route exact path="/sports"><News  setProgress={this.setProgress} apikey={this.apikey}  key="sports" pagesize={6} country="in" category="sports" /></Route>
            <Route exact path="/science"><News  setProgress={this.setProgress} apikey={this.apikey}  key="science" pagesize={6} country="in" category="science" /></Route>

          </Switch>

        </Router>

      </div>
    )
  }
}
