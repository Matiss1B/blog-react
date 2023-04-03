import {NavLink} from "react-router-dom";
import "../assets/scss/App.css";
import { useRef } from 'react';


function Header() {
    const windowWidth = useRef(window.innerWidth);
    return (
        <header className="header w-100 flex gap1 col shadow-light pad2">
            <div className="title w-100 middle">
                <h1>BlogIt</h1>
            </div>
            <div className="w-100 flex middle">
                <div className="flex gap5">
                    <NavLink className="nav-link" to="/" style={({ isActive }) => ({
                        textDecoration: isActive ? ' underline 4px solid #6b9dde' : '  underline 4px solid white',
                    })} ><p>Home</p></NavLink>
                    <NavLink className="nav-link" to="/food" style={({ isActive }) => ({
                        textDecoration: isActive ? ' underline 4px solid #6b9dde' : '  underline 4px solid white',
                    })}><p>Food</p></NavLink>
                    <NavLink className="nav-link" to="/fashion" style={({ isActive }) => ({
                        textDecoration: isActive ? ' underline 4px solid #6b9dde' : '  underline 4px solid white',
                    })}><p>Fashion</p></NavLink>
                    <NavLink className="nav-link" to="/cars" style={({ isActive }) => ({
                        textDecoration: isActive ? ' underline 4px solid #6b9dde' : '  underline 4px solid white',
                    })}><p>Cars</p></NavLink>
                    <NavLink className="nav-link" to="/add" style={({ isActive }) => ({
                        textDecoration: isActive ? ' underline 4px solid #6b9dde' : '  underline 4px solid white',
                    })}><p>Add blog</p></NavLink>

                </div>
            </div>
        </header>
    );
}

export default Header;