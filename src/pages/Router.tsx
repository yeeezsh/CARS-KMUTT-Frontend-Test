import React, { Component } from 'react'
import { Router, Route } from 'react-router'
import history from './history'
import Home from './Home'
import Page from './Page'

export default class PageRouter extends Component {
    render() {
        return (
            <Router history={history}>
                <Route exact={true} path='/'>
                    <Home />
                </Route>
                <Route path='/page'>
                    <Page />
                </Route>
            </Router>
        )
    }
}
