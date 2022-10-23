import React from 'react';
import "./scss/NotFoundPage.scss"
import {useNavigate} from "react-router-dom";
export const NotFoundPage:React.FC = () =>{
    const navigate = useNavigate();

    return <div className="error-container">
        <h1>Ooops.... The page isn't found :(</h1>
        <h2>Probably you want to visit the login page? It's waiting for you at the navbar or just here <button onClick={()=>navigate("/login")}>Click me</button></h2>
    </div>

}