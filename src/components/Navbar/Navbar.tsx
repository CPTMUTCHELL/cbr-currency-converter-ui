import React, {useContext, useState} from 'react'
import {NavLink} from 'react-router-dom'
//resolve
import {UserContext} from "../../functions/UserContext"
import {Logout} from "../Logout";
import "./scss/Navbar.scss"
import logo from "./logo.png"

export const Navbar: React.FC = () => {

    const {userToken} = useContext(UserContext);
    const [openResponsiveBtn, setOpenResponsiveBtn] = useState<boolean>(false);
    return (
        <div className="navbar-container">
            <div className="test"></div>

            <nav className={openResponsiveBtn ? "open" : ""}>
                <div className="cbr-logo">
                    <h3>Cbr converter</h3>
                    <img src={logo} width="118" height="119"/>
                </div>
                <div onClick={()=>setOpenResponsiveBtn(!openResponsiveBtn)} className="invisible"/>
                    <div onClick={()=>setOpenResponsiveBtn(!openResponsiveBtn)} className={openResponsiveBtn ? "responsive-btn open" : "responsive-btn"}/>

                <div className={openResponsiveBtn ? "pages open" : "pages"}>
                {userToken.username == undefined || userToken.username === "" ? (
                        <ul>

                            <li><NavLink onClick={()=>setOpenResponsiveBtn(false)} to="/login">Login</NavLink></li>
                            <li><NavLink onClick={()=>setOpenResponsiveBtn(false)} to="/registration">Sign Up</NavLink></li>
                        </ul>
                    ) :


                    (<><ul>

                        {Math.min(...userToken.roles.map(role => Number(String(role).split("-")[0]))) <= 1 ?
                            <li><NavLink onClick={()=>setOpenResponsiveBtn(false)} to="/users">
                                Admin Page
                            </NavLink></li> :
                            <></>}
                        <li><NavLink onClick={()=>setOpenResponsiveBtn(false)} to="/convert">Converter</NavLink></li>
                        <li><NavLink onClick={()=>setOpenResponsiveBtn(false)}  to="/history">History</NavLink></li>

                        </ul>
                            <div className="user-and-logout">

                                <p>Logged as <i>{userToken.username}</i></p>

                                <Logout setOpenResponsiveBtn={setOpenResponsiveBtn} logoutBtn="logoutBtn"/>
                            </div>

                    </>
                    )



                }
                </div>

            </nav>
        </div>
    )
}