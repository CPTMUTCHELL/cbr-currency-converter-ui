import {Outlet} from "react-router-dom"
import {Navbar} from "./Navbar/Navbar";
import {Footer} from "./Footer/Footer";
import  "./Layout.css"
export const Layout = () => {

    return <main className="App">
        <div id="container" className="container">
            <Navbar/>
            <Outlet/>
        </div>
        <Footer/>
    </main>

}