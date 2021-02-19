import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {Provider} from "react-redux";

import Main from "./containers/main";
import Register from "./containers/register";
import Login from "./containers/login";
import store from "./redux/store";

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route path="/register" component={Register}/>
                <Route path="/login" component={Login}/>
                <Route component={Main}/>
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.getElementById("root")
);
