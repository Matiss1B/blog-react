import {NavLink} from "react-router-dom";
import "../assets/scss/App.css";
import React, {useRef, useState, useEffect} from 'react';
import AOS from 'aos';
import {useNavigate} from "react-router-dom";
import {BiHomeAlt, BiUser, BiPlusCircle, BiLogOut} from "react-icons/bi";
import {BsBookHalf} from "react-icons/bs"
import logo from "../assets/icons/iconizer-logotypes-dots-svgrepo-com.svg";
import axios from "axios";
function Header() {
    const[activeNav, setActiveNav] = useState("")
    const navigate = useNavigate();
    useEffect(() => {
        AOS.init();
    }, [])
    const submitLogout = () => {
            let data = {
                user: sessionStorage.getItem("user"),
            }
        axios
            .post("http://localhost/api/v1/logout",data)
            .then(response => checkLogout(response))
            .catch(err => console.log(err));
    }
    const checkLogout = (response) => {
        if(response.status === 200){
            sessionStorage.removeItem("user");
            navigate("/"+response.data.link);
        }
        console.log(response)
    }
    const handleNavLink = (event) => {
        const clickedNavLink = event.target.id;
        setActiveNav(clickedNavLink);
    };
    const windowWidth = useRef(window.innerWidth);
    return (
        <header className="header shadow-light col hidden-mobile flex gap1 center-y pad3">
            <div className="header-logo pad2 gap1 center-y flex">
                <img src={logo} alt=""/>
                <h1 className="font25">BlogIt</h1>
            </div>
            <div className=" gap3 col flex  w-100">
                <div className="flex col gap2">
                    <div className="nav-link-group">
                        <NavLink to ="/home" onClick={handleNavLink} id={"home"} className={`nav-link flex center-y gap1 ${activeNav === "home" ? "active-nav" : ""}`}>
                            <BiHomeAlt id={"home"} className={"icon"} />
                            <p id={"home"}>Home</p>
                        </NavLink>
                    </div>
                    <div className="nav-link-group flex col gap1">
                        <NavLink onClick={handleNavLink} id={"categories"} className={`nav-link flex center-y gap1 ${activeNav === "categories" ? "active-nav" : ""}`}>
                            <BsBookHalf id={"categories"} className={"icon"} />
                            <p id={"categories"}> Blogs</p>
                        </NavLink>
                        {activeNav === "categories" ?
                            <ul className={"nav-list flex col gap1"} data-aos="fade-left">
                                <NavLink  className={"flex center-y vertical-line gap1"} to="/home">
                                    <p>Home</p>
                                </NavLink>
                                <NavLink  className={"flex center-y vertical-line gap1"} to="/blogs/Cars">
                                    <p>Cars</p>
                                </NavLink >
                                <NavLink  className={"flex center-y vertical-line gap1"} to="/food">
                                    <p>Food</p>
                                </NavLink >
                                <NavLink  className={"flex center-y vertical-line gap1"} to="/fashion">
                                    <p>Fashion</p>
                                </NavLink >
                            </ul>
                            :
                            ""
                        }
                    </div>
                    <div className="nav-link-group">
                        <NavLink to = "/add" onClick={handleNavLink} id={"new-blog"} className={`nav-link nav-link-new-blog flex center-y gap1 ${activeNav === "new-blog" ? "active-nav" : ""}`}>
                            <BiPlusCircle id={"new-blog"} className={"icon"} />
                            <p id={"new-blog"}>New blog</p>
                        </NavLink>
                    </div>
                    <div className="nav-link-group flex col gap1">
                        <NavLink onClick={handleNavLink} id={"profile"} className={`nav-link flex center-y gap1 ${activeNav === "profile" ? "active-nav" : ""}`} >
                            <BiUser id={"profile"} className={"icon"} />
                            <p id={"profile"}> My profile</p>
                        </NavLink>
                        {activeNav === "profile" ?
                            <ul data-aos="fade-left" className={"nav-list flex col gap1"}>
                                <li className={"flex center-y vertical-line gap1"}>
                                    <p>My blogs</p>
                                </li>
                                <li className={"flex center-y vertical-line gap1"}>
                                    <p>Settings</p>
                                </li>
                                <li onClick={submitLogout} className={"flex center-y vertical-line-logout gap1"}>
                                    <p>Logout</p>
                                </li>
                            </ul>
                            :
                            ""
                        }
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;