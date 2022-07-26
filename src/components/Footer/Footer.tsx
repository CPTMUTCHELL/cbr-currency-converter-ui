import React from "react";
import {NavLink} from "react-router-dom";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import './Footer.css';
export const Footer: React.FC = () => {
    const curYear = new Date().getFullYear().toString();
    return <>
        <footer>
            <div className="social-media">
                <LinkedInIcon onClick={() => {window.open("https://www.linkedin.com/in/cptmutchell/")}}/>
                <GitHubIcon onClick={() => {window.open("https://github.com/CPTMUTCHELL")}}/>
                <EmailIcon onClick={() => window.location.href = 'mailto:cptmutchell@gmail.com'}/>
            </div>
            <div className="info">
            <span>&copy; {curYear} CPTMUTCHELL</span>
            <NavLink  to="/about">About</NavLink>
            </div>

        </footer>
    </>
}