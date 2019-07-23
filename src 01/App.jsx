import React from 'react'
import {HashRouter, Route, Switch} from 'react-router-dom'
import WrapLogin from './pages/login/login'
import Admin from './pages/admin/admin'
export default class App extends React.Component{
render(){
    return(
        <HashRouter>
        <Switch>
        <Route  path='/login'  component={WrapLogin}></Route>
        <Route  path='/'  component={Admin}></Route>
        </Switch>
        </HashRouter>
     )
    }
}