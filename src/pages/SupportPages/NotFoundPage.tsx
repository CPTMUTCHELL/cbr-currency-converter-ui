import React from 'react';
import "./scss/SupportPageStyles.scss"
import {useNavigate} from "react-router-dom";

export const NotFoundPage:React.FC = () =>{
    const navigate = useNavigate();

    return <div className="support-page-container">
        <h1>Ooops.... The page isn't found :(</h1>
        <h2>Probably you want to visit the login page? <button onClick={()=>navigate("/")}>Click me</button></h2>
    </div>

}