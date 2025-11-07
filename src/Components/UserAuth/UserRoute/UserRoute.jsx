import React from 'react'
import { Navigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

export default function UserRoute(props) {

    let cookie = new Cookies()
    let token = cookie.get("userToken")

    if (!token) {
        return <Navigate to={"/login"} />
    }
    else {
        return props.children;
    }
}