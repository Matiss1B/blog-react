import {NavLink} from "react-router-dom";
import "../assets/scss/App.css";

function Header() {
    return (
        <header className="header w-100 flex gap1 col shadow-light pad2">
            <div className="title w-100 middle">
                <h1>BlogIt</h1>
            </div>
            <div className="w-100 flex middle">
                <div className="flex gap5">
                    <NavLink className="nav-link" to="/" ><p>Home</p></NavLink>
                    <NavLink className="nav-link" to="/food"><p>Food</p></NavLink>
                    <NavLink className="nav-link" to="/fashion"><p>Fashion</p></NavLink>
                    <NavLink className="nav-link" to="/cars"><p>Cars</p></NavLink>
                    <NavLink className="nav-link" to="/add"><p>Add blog</p></NavLink>

                </div>
            </div>
        </header>
    );
}

export default Header;