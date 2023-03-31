import {NavLink} from "react-router-dom";
import "../assets/scss/App.css";

function Header() {
    return (
        <header className="header">
            <NavLink to="/" >Home</NavLink>
            <NavLink to="/add">Add blog</NavLink>
        </header>
    );
}

export default Header;