import {Outlet} from "react-router-dom"
import {Navbar} from "./Navbar/Navbar";
import {Footer} from "./Footer/Footer";
import  "./Layout.css"
export const Layout = () => {

    let scrollHeight = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
    );

    console.log(scrollHeight)
    return <main className="App">
        <div className="container">
            <Navbar/>
            <Outlet/>
           <footer> <Footer/></footer>
        </div>

    </main>

}