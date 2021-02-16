import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import {Provider} from "react-redux";

import Main from "./containers/main";
import Register from "./containers/register";
import Login from "./containers/login";
import store from "./redux/store";

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route path="/main" component={Main}/>
                <Route path="/register" component={Register}/>
                <Route path="/login" component={Login}/>
                <Redirect to="/main"/>
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.getElementById("root")
);
