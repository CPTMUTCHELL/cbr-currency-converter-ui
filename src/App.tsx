import React, {useMemo, useState} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {LoginPage} from "./pages/LoginPage/LoginPage";
import {ConvertPage} from "./pages/ConvertPage/ConvertPage";
import {SignUpPage} from "./pages/SignUpPage/SignUpPage";
import {HistoryPage} from "./pages/HistoryPage/HistoryPage";
import {UserContext} from "./functions/UserContext";
import {RequireAuth} from "./components/RequireAuth";
import {Layout} from "./components/Layout";
import {NotFoundPage} from "./pages/SupportPages/NotFoundPage";
import {AdminPage} from "./pages/AdminPage/AdminPage";
import {AboutPage} from "./pages/AboutPage/AboutPage";
import {GreetingsPage} from "./pages/SupportPages/GreetingsPage";


const App: React.FC = () => {

    const [userToken, setUserToken] = useState(Object)
    const value = useMemo(
        () => ({userToken, setUserToken}),
        [userToken]
    );

    return <BrowserRouter>
        <UserContext.Provider value={value}>


            <Routes>
                <Route element={<Layout/>}>
                    <Route element={<GreetingsPage/>} path="/"/>
                    <Route element={<SignUpPage/>} path="/registration"/>
                    <Route element={<LoginPage/>} path="/login"/>
                    <Route element={<AboutPage/>} path="/about"/>
                    <Route element={<RequireAuth allowedRoles={["OWNER","ADMIN", "USER"]}/>}>
                        <Route path="/convert" element={<ConvertPage/>}/>
                        <Route element={<HistoryPage/>} path="/history"/>
                    </Route>
                    <Route element={<RequireAuth allowedRoles={["OWNER","ADMIN"]}/>}>

                        <Route element={<AdminPage/>} path="/users"/>

                    </Route>
                    <Route path="*" element={<NotFoundPage/>}/>

                </Route>
            </Routes>


        </UserContext.Provider>
    </BrowserRouter>
}
export default App