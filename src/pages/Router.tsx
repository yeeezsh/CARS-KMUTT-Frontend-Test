import React, { Component } from 'react'
import { Router, Route } from 'react-router'
import history from './history'
import Home from './Home'
import Page from './Page'
import { Category as SportCategory } from './Sport'

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

                <Route path='/reserve/sport/category'>
                    <SportCategory />
                </Route>
            </Router>
        )
    }
}
