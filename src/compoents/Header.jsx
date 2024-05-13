import {NavLink} from "react-router-dom";
import "../assets/scss/App.css";
import React, {useRef, useState, useEffect} from 'react';
import AOS from 'aos';
import {useNavigate} from "react-router-dom";
import {BiHomeAlt, BiUser, BiPlusCircle, BiLogOut} from "react-icons/bi";
import {BsBookHalf} from "react-icons/bs"
import logo from "../assets/icons/iconizer-logotypes-dots-svgrepo-com.svg";
import axios from "axios";
import {IoMenu} from "react-icons/io5";
import {IoMdClose} from "react-icons/io";
function Header() {
    const[activeNav, setActiveNav] = useState("")
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [menu, setMenu] = useState(false);
    useEffect(() => {
        const pathSegments = window.location.pathname.split('/');
        const desiredSegment = pathSegments[1];
        setActiveNav(desiredSegment);
        AOS.init();
        const fetchCategories = async () =>{
            try {
                const response = await axios.get(
                    `http://localhost/api/v1/categories/get`,
                    {
                        headers: {
                            Authorization: sessionStorage.getItem('user'),
                        },
                    }
                );
                console.log(response.data);
                if(response.data.status == 200){
                    setCategories(response.data.categories);
                }
            } catch (error) {

            }
        }
        fetchCategories();
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

    useEffect(() => {
        if (menu) {
            // Add class to body to disable scroll
            document.body.classList.add("no-scroll");
        } else {
            // Remove class to enable scroll
            document.body.classList.remove("no-scroll");
        }
    }, [menu]);

    const windowWidth = useRef(window.innerWidth);
    return (
        <header className="header sticky shadow-light flex gap1 ">
            {menu
                ?
                    <div className="side-menu" data-aos="fade-left">
                <div className=" gap3 col flex w-100 pad2">
                    <div className="flex w-100 between center-y">
                        <div className="header-logo gap1 center-y flex">
                            <img src={logo} alt=""/>
                            <h1 className="font25">BlogIt</h1>
                        </div>
                        <IoMdClose className="font35" onClick={()=>setMenu(false)}/>
                    </div>
                    <div className="flex col gap2">
                        <div className="nav-link-group">
                            <NavLink to="/home" onClick={handleNavLink} id={"home"}
                                     className={`nav-link flex center-y gap1 ${activeNav === "home" ? "active-nav" : ""}`}>
                                <BiHomeAlt id={"home"} className={"icon"}/>
                                <p id={"home"}>Home</p>
                            </NavLink>
                        </div>
                        <div className="nav-link-group flex col gap1">
                            <NavLink onClick={handleNavLink} id={"blogs"}
                                     className={`nav-link flex center-y gap1 ${activeNav === "blogs" ? "active-nav" : ""}`}>
                                <BsBookHalf id={"blogs"} className={"icon"}/>
                                <p id={"blogs"}> Blogs</p>
                            </NavLink>
                            {activeNav === "blogs" ?
                                <ul className={"nav-list flex col gap1"} data-aos="fade-left">
                                    {categories.map((category) => (
                                        <NavLink key={category.id} className={"flex center-y vertical-line gap1"}
                                                 to={`/blogs/${category.category}`}>
                                            <p>{category.category}</p>
                                        </NavLink>
                                    ))}
                                </ul>
                                :
                                ""
                            }
                        </div>
                        <div className="nav-link-group">
                            <NavLink to="/add" onClick={handleNavLink} id={"add"}
                                     className={`nav-link nav-link-new-blog flex center-y gap1 ${activeNav === "add" ? "active-nav" : ""}`}>
                                <BiPlusCircle id={"add"} className={"icon"}/>
                                <p id={"add"}>New blog</p>
                            </NavLink>
                        </div>
                        <div className="nav-link-group flex col gap1">
                            <NavLink onClick={handleNavLink} id={"profile"}
                                     className={`nav-link flex center-y gap1 ${activeNav === "profile" ? "active-nav" : ""}`}>
                                <BiUser id={"profile"} className={"icon"}/>
                                <p id={"profile"}> My profile</p>
                            </NavLink>
                            {activeNav === "profile" ?
                                <ul data-aos="fade-left" className={"nav-list flex col gap1"}>
                                    <NavLink className={"flex center-y vertical-line gap1"} to="/profile/blogs">
                                        <p>My blogs</p>
                                    </NavLink>
                                    <NavLink className={"flex center-y vertical-line gap1"} to="/profile/saved">
                                        <p>Saved</p>
                                    </NavLink>
                                    <NavLink className={"flex center-y vertical-line gap1"} to="/profile/settings">
                                        <p>Settings</p>
                                    </NavLink>
                                    <li onClick={submitLogout}
                                        className={"pointer flex center-y vertical-line-logout gap1"}>
                                        <p>Logout</p>
                                    </li>
                                </ul>
                                :
                                ""
                            }
                        </div>
                    </div>
                </div>
            </div>
                :
                    ""
            }
            <div className="header-logo gap1 center-y flex">
                <img src={logo} alt=""/>
                <h1 className="font25">BlogIt</h1>
            </div>
            <IoMenu className="hidden-pc font35" onClick={()=>setMenu(true)}/>
            <div className=" gap3 col flex  w-100 hidden-mobile">
                <div className="flex col gap2">
                    <div className="nav-link-group">
                        <NavLink to="/home" onClick={handleNavLink} id={"home"}
                                 className={`nav-link flex center-y gap1 ${activeNav === "home" ? "active-nav" : ""}`}>
                            <BiHomeAlt id={"home"} className={"icon"}/>
                            <p id={"home"}>Home</p>
                        </NavLink>
                    </div>
                    <div className="nav-link-group flex col gap1">
                        <NavLink onClick={handleNavLink} id={"blogs"}
                                 className={`nav-link flex center-y gap1 ${activeNav === "blogs" ? "active-nav" : ""}`}>
                            <BsBookHalf id={"blogs"} className={"icon"}/>
                            <p id={"blogs"}> Blogs</p>
                        </NavLink>
                        {activeNav === "blogs" ?
                            <ul className={"nav-list flex col gap1"} data-aos="fade-left">
                                {categories.map((category) => (
                                    <NavLink key={category.id} className={"flex center-y vertical-line gap1"}
                                             to={`/blogs/${category.category}`}>
                                        <p>{category.category}</p>
                                    </NavLink>
                                ))}
                            </ul>
                            :
                            ""
                        }
                    </div>
                    <div className="nav-link-group">
                        <NavLink to="/add" onClick={handleNavLink} id={"add"}
                                 className={`nav-link nav-link-new-blog flex center-y gap1 ${activeNav === "add" ? "active-nav" : ""}`}>
                            <BiPlusCircle id={"add"} className={"icon"}/>
                            <p id={"add"}>New blog</p>
                        </NavLink>
                    </div>
                    <div className="nav-link-group flex col gap1">
                        <NavLink onClick={handleNavLink} id={"profile"}
                                 className={`nav-link flex center-y gap1 ${activeNav === "profile" ? "active-nav" : ""}`}>
                            <BiUser id={"profile"} className={"icon"}/>
                            <p id={"profile"}> My profile</p>
                        </NavLink>
                        {activeNav === "profile" ?
                            <ul data-aos="fade-left" className={"nav-list flex col gap1"}>
                                <NavLink className={"flex center-y vertical-line gap1"} to="/profile/blogs">
                                    <p>My blogs</p>
                                </NavLink>
                                <NavLink className={"flex center-y vertical-line gap1"} to="/profile/saved">
                                    <p>Saved</p>
                                </NavLink>
                                <NavLink className={"flex center-y vertical-line gap1"} to="/profile/settings">
                                    <p>Settings</p>
                                </NavLink>
                                <li onClick={submitLogout}
                                    className={"pointer flex center-y vertical-line-logout gap1"}>
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