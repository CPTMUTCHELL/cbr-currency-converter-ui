import React, {useContext, useEffect, useState} from 'react'
import {NavLink} from 'react-router-dom'
import {INotificationContext, NotificationContext, UserContext} from "src/functions/Contexts"
import {Logout} from "../Logout";
import "./scss/Navbar.scss"
import logo from "./logo.png"
import {Alert, IconButton} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

export const Navbar: React.FC = () => {

    const {userToken} = useContext(UserContext);
    const {message, show, setShow, alertType} = useContext(NotificationContext) as INotificationContext;
    useEffect(() => {
        const timer = setTimeout(() => setShow(false), 3000)
        return () => clearTimeout(timer)

    }, [show])
    const [openResponsiveBtn, setOpenResponsiveBtn] = useState<boolean>(false);
    return (
        <div className="navbar-container">
            <nav className={openResponsiveBtn ? "open" : ""}>
                <div className="cbr-logo">
                    <h3>Cbr converter</h3>
                    <img src={logo} width="118" height="119"/>
                </div>
                <div onClick={() => setOpenResponsiveBtn(!openResponsiveBtn)} className="invisible"/>
                <div onClick={() => setOpenResponsiveBtn(!openResponsiveBtn)}
                     className={openResponsiveBtn ? "responsive-btn open" : "responsive-btn"}/>

                <div className={openResponsiveBtn ? "pages open" : "pages"}>
                    {userToken.username == undefined || userToken.username === "" ? null :
                        <>
                            <ul>

                                {Math.min(...userToken.roles.map(role => Number(String(role).split("-")[0]))) <= 2 ?
                                    <li><NavLink onClick={() => setOpenResponsiveBtn(false)} to="/users">
                                        Admin Page
                                    </NavLink></li> :
                                    <></>}
                                <li><NavLink onClick={() => setOpenResponsiveBtn(false)}
                                             to="/convert">Converter</NavLink></li>
                                <li><NavLink onClick={() => setOpenResponsiveBtn(false)}
                                             to="/history">History</NavLink></li>

                            </ul>
                            <div className="user-and-logout">

                                <p>Logged as <i>{userToken.username}</i></p>

                                <Logout setOpenResponsiveBtn={setOpenResponsiveBtn} logoutBtn="logoutBtn"/>
                            </div>

                        </>


                    }
                </div>

            </nav>
            <Alert action={
                <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                        setShow(false);
                    }}
                >
                    <CloseIcon fontSize="inherit"/>
                </IconButton>}
                   className={show ? "show" : ""} severity={alertType}>

                {message}
            </Alert>

        </div>
    )
}