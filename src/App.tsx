import React, {useContext, useEffect, useMemo, useState} from 'react';
import {Navbar} from "./components/Navbar";
import {BrowserRouter, Routes, Route, useLocation, Navigate} from "react-router-dom";
import {LoginPage} from "./pages/LoginPage/LoginPage";
import {ConvertPage} from "./pages/ConvertPage/ConvertPage";
import {SignUpPage} from "./pages/SignUpPage";
import {HistoryPage} from "./pages/HistoryPage/HistoryPage";
import {UserContext} from "./functions/UserContext";
import {useValidate} from "./hooks/useValidate";
import {getUser} from "./functions/JwtToken";
import {RequireAuth} from "./components/RequireAuth";
import {Layout} from "./components/Layout";
import {NotFoundPage} from "./pages/NotFoundPage";


const App: React.FC = () => {

    const [userToken, setUserToken] = useState(Object)
    const value = useMemo(
        () => ({userToken, setUserToken}),
        [userToken]
    );

    return <BrowserRouter>
        <UserContext.Provider value={value}>




                <Routes>

                    <Route path="/" element={<Layout/>}>
                    <Route element={<SignUpPage/>} path="/registration"/>
                    <Route element={<LoginPage/>} path="/login"/>
                    <Route element={<RequireAuth/>}>

                    <Route path="/convert" element={<ConvertPage/>}/>

                    <Route element={<HistoryPage/>} path="/history"/>
                </Route>

                    </Route>
                    <Route path="*" element={<NotFoundPage/>}/>
                </Routes>


        </UserContext.Provider>
    </BrowserRouter>
}
export default App