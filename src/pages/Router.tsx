import React, { Component } from 'react'
import { Router, Route } from 'react-router'
import history from './history'
import Home from './Home'

export default class PageRouter extends Component {
    render() {
        return (
            <Router history={history}>
                <Route path='/'>
                    <Home />
                </Route>
            </Router>
        )
    }
}
