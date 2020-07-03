import React from "react"
import {Redirect, Route} from "react-router-dom"


export default function({component:Component, ...props}){
    return props.user 
    ? <Route {...props} render={()=> <Component {...props}/>} />
    : <Redirect to="/"/>
}