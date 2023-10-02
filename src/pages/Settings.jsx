import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {MdEmail} from "react-icons/md"
import {AiFillPhone} from "react-icons/ai"
import Header from "../compoents/Header";
import{AiFillEye} from "react-icons/ai"
import {FaLock} from "react-icons/fa"
import Loader from "../compoents/Loading";
import {FaAddressCard} from "react-icons/fa";
function Settings() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeInput, setActiveInput] = useState(null);
    const [error, setErrorToken] = useState(null);
    const navigate = useNavigate();
    const handleInputBoxClick = (event) => {
        const clickedInputBox = event.target.id;
        setActiveInput(clickedInputBox);
    };
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
            <div className={'flex'}>
                <Header/>
                <div className="App h-v">
                    <div className="main-settings-box h-100 flex gap5 col center-y evenly">
                        <div className="profile-box flex wrap center-y gap2 w-100 center-x">
                            <div className="profile-img">
                                <img className={`cover`} src="https://images.unsplash.com/photo-1692651955510-8b334577cff7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60" alt=""/>
                            </div>
                            <div className="profile-info">
                                <h1>Matiss Balins</h1>
                                <p>matiss@matiss</p>
                            </div>
                        </div>
                        <div className="profile-box gap5 wrap flex w-100 center-x">
                            <div
                                className={`flex input-box center-y between ${activeInput === 'name' ? 'active' : ''}`}
                                onClick={handleInputBoxClick}
                                >
                                <div className="flex col center-x">
                                    <label
                                        className={`font15 flex ${activeInput === 'name' ? 'active-label' : ''}`}>Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        autoComplete="off"
                                    />
                                </div>
                                <div className="icon pad1">
                                    <FaAddressCard className={`icon`}/>
                                </div>
                            </div>
                            <div
                                className={`flex  input-box center-y between ${activeInput === 'surname' ? 'active' : ''}`}
                                onClick={handleInputBoxClick}
                            >
                                <div className="flex col center-x">
                                    <label
                                        className={`font15 flex ${activeInput === 'surname' ? 'active-label' : ''}`}>Surname
                                    </label>
                                    <input
                                        type="text"
                                        id="surname"
                                        name="surname"
                                        autoComplete="off"
                                    />
                                </div>
                                <div className="icon pad1">
                                    <FaAddressCard className={`icon`}/>
                                </div>
                            </div>
                        </div>
                        <div className="profile-box gap5 wrap flex w-100 center-x">
                            <div
                                className={`flex input-box center-y between ${activeInput === 'email' ? 'active' : ''}`}
                                onClick={handleInputBoxClick}
                            >
                                <div className="flex col center-x">
                                    <label
                                        className={`font15 flex ${activeInput === 'email' ? 'active-label' : ''}`}>Email
                                    </label>
                                    <input
                                        type="text"
                                        id="email"
                                        name="email"
                                        autoComplete="off"
                                    />
                                </div>
                                <div className="icon pad1">
                                    <MdEmail className={`icon`}/>
                                </div>
                            </div>
                            <div
                                className={`flex  input-box center-y between ${activeInput === 'pass' ? 'active' : ''}`}
                                onClick={handleInputBoxClick}
                            >
                                <div className="flex col center-x">
                                    <label
                                        className={`font15 flex ${activeInput === 'pass' ? 'active-label' : ''}`}>Password
                                    </label>
                                    <input
                                        type="text"
                                        id="pass"
                                        name="pass"
                                        autoComplete="off"
                                    />
                                </div>
                                <div className="icon pad1">
                                    <FaLock className={`icon`}/>
                                </div>
                            </div>
                        </div>
                        <div className="profile-box gap5 wrap flex w-100 center-x">
                           <button className="base-button">Save Changes</button>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
    return null;
}

export default Settings;
