import React, {useMemo, useState} from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {LoginPage} from "./pages/LoginPage/LoginPage";
import {ConvertPage} from "./pages/ConvertPage/ConvertPage";
import {SignUpPage} from "./pages/SignUpPage/SignUpPage";
import {HistoryPage} from "./pages/HistoryPage/HistoryPage";
import {UserContext} from "./functions/UserContext";
import {RequireAuth} from "./components/RequireAuth";
import {Layout} from "./components/Layout";
import {NotFoundPage} from "./pages/NotFoundPage";
import {AdminPage} from "./pages/AdminPage/AdminPage";


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
                    <Route element={<RequireAuth allowedRoles={["1-ADMIN", "2-USER"]}/>}>
                        <Route path="/convert" element={<ConvertPage/>}/>
                        <Route element={<HistoryPage/>} path="/history"/>
                    </Route>
                    <Route element={<RequireAuth allowedRoles={["1-ADMIN"]}/>}>

                        <Route element={<AdminPage/>} path="/users"/>

                    </Route>
                </Route>
                <Route path="*" element={<NotFoundPage/>}/>
            </Routes>


        </UserContext.Provider>
    </BrowserRouter>
}
export default App