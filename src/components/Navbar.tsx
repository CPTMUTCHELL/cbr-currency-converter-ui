import React, {useContext} from 'react'
import {NavLink} from 'react-router-dom'
import {UserContext} from "../functions/UserContext"
import {Logout} from "./Logout";
export const Navbar:React.FC = () =>{

    const {userToken}  = useContext(UserContext);
    return (

    <nav>
        <div>{userToken.username}</div>
        <div className="nav-wrapper purple darken-2 px1">
            <a href="#" className="brand-logo">Cbr converter</a>
            {userToken.username==undefined || userToken.username==="" ? (
            <ul className="right hide-on-med-and-down">

                <li><NavLink to="/login">Login</NavLink></li>
                <li><NavLink to="/registration">Sign Up</NavLink></li>
            </ul>
            ):



                (  <ul className="right hide-on-med-and-down">
                    <li><Logout/></li>
                    { Math.min(...userToken.roles.map(role=>Number(String(role).split("-")[0])))<=1 ?  <li><NavLink to="/users"><button type="button">Users</button></NavLink></li> :<></>}

            </ul>)
            }
        </div>
    </nav>
)
}