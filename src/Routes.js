import React from "react";
import { Route, Routes as ReactRouters } from "react-router-dom";

import Home from './components/pages/Home'
import Config from "./components/pages/Config";
import KidsArea from "./components/pages/KidsArea";
import History from "./components/pages/History";

const Routes = () => {
    return(
        <ReactRouters>
            <Route element = { <Home/> }  path="/" exact />
            <Route element = { <Config/> }  path="/configurations" exact />
            <Route element = { <KidsArea/> }  path="/kidsarea" exact />
            <Route element = { <History/> }  path="/history" exact />
        </ReactRouters>
    )
 }
 
 export default Routes;