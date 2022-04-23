import React, {useContext} from 'react'
import {NavLink} from 'react-router-dom'
//resolve
import {UserContext} from "../../functions/UserContext"
import {Logout} from "../Logout";
import "./Navbar.css"
import logo from "./logo.png"

export const Navbar: React.FC = () => {

    const {userToken} = useContext(UserContext);
    return (
        <div className="navbar-container">
            <nav>
                <div className="cbr-logo">
                    <h3>Cbr converter</h3>
                    <img src={logo}/>
                </div>

                {userToken.username == undefined || userToken.username === "" ? (
                        <ul>

                            <li><NavLink to="/login">Login</NavLink></li>
                            <li><NavLink to="/registration">Sign Up</NavLink></li>
                        </ul>
                    ) :


                    (<ul>

                        {Math.min(...userToken.roles.map(role => Number(String(role).split("-")[0]))) <= 1 ?
                            <li><NavLink to="/users">
                                Admin Page
                            </NavLink></li> :
                            <></>}
                        <li><NavLink to="/convert">Converter</NavLink></li>
                        <li><NavLink to="/history">History</NavLink></li>
                            <div className="user-and-logout">

                                <p>Logged as <i>{userToken.username}</i></p>

                                <Logout logoutBtn="logoutBtn"/>

                            </div>
                    </ul>

                    )

                }

            </nav>
        </div>
    )
}