import React, {useEffect, useState} from "react";
import {TbUsers, TbCards, TbCategory2} from "react-icons/tb"
import Header from "../compoents/Header";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Loader from "../compoents/Loading";
function HomePage() {
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setErrorToken] = useState(null);
    useEffect(() => {
        const data = {
            token: sessionStorage.getItem("user"),
        }
        axios.post("http://localhost/api/v1/checkToken", data, {
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then(response => {
                setData(response.data);
                setLoading(false);
            })
            .catch(error => {
                setErrorToken(error);
                setLoading(false);
            });
    }, []);
    if (loading) {
        return <Loader/>;
    }
    if (error) {
        // Redirect to another page if there's an error
        return navigate("/");
    }
    if(data) {
        return (
            <div className={"flex row-to-col h-v"}>
                <Header/>
                <div className="App w-100">
                    <div className="home-page center-x h-100 w-100 flex col">
                        <div className="flex gap2">
                            <div className="flex col gap2 home-page-welcome-title">
                                <div className="flex col">
                                    <h1>Welcome</h1>
                                    <h1 className={`flex gap2 center-y`}>to <h1 className={`welcome-title`}>BlogIt</h1>
                                    </h1>
                                </div>
                                <p>Exploring the world through captivating stories</p>
                                <button className="intro-button" onClick={()=>{navigate("/add")}}>Get started</button>
                            </div>
                            <div className="image-box hidden-mobile">
                                <div className="circle">
                                    <img
                                        src="https://images.unsplash.com/photo-1530042133068-0296a09adf7b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjV8fEJsb2d8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60"
                                        alt=""/>
                                </div>
                            </div>
                        </div>
                        <div className="stats-box flex gap2 wrap w-100">
                            <div className="stats-unit center-y flex gap1">
                                <div className="icon-box flex middle">
                                    <TbUsers className={`icon`}/>
                                </div>
                                <div className="stats-info flex col">
                                    <p>Users online now</p>
                                    <h1>30432</h1>
                                </div>
                            </div>
                            <div className="stats-unit center-y flex gap1">
                                <div className="icon-box flex middle">
                                    <TbCards className={`icon`}/>
                                </div>
                                <div className="stats-info flex col">
                                    <p>Create content</p>
                                    <h1>10000+ Blogs</h1>
                                </div>
                            </div>
                            <div className="stats-unit center-y flex gap1">
                                <div className="icon-box flex middle">
                                    <TbCategory2 className={`icon`}/>
                                </div>
                                <div className="stats-info flex col">
                                    <p>Different themes</p>
                                    <h1>20+ Themes</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return null;
}

export default HomePage;
