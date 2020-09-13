import React, {Component} from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import AdminHome from './admin/home'
import UserHome from './user/home'

import QuizSet from './admin/quizSet'
import Results from './user/results'







export default class LoginForm extends Component{
    
    constructor(props) { 
        super(props);
        this.state = {          
            
        }
        
    }


  
    render(){
        return(
            
          <Router>

            <Switch>
              <Route path="/admin" exact>
                <AdminHome />
              </Route>

              {/* <Route path="/admin/quiz-set/:user">
                < QuizSet />
              </Route> */}
              <Route path="/admin/quiz-set">
                < QuizSet />
              </Route>

              <Route path="/" exact>
                <UserHome />
              </Route>

              <Route path="/results" exact>
                <Results />
              </Route>
              
            </Switch>
          </Router>
            
        )

    }
}

