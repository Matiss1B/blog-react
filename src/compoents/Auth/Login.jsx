
import React from "react";
import {MdEmail} from "react-icons/md"
import{AiFillEye} from "react-icons/ai"
import {FaLock} from "react-icons/fa"
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import GoogleLogin from "react-google-login";
// import google from "../../assets/icons/google-color-svgrepo-com.svg";
import facebook from "../../assets/icons/facebook-svgrepo-com (1).svg";
import {gapi} from "gapi-script";

function Login() {
    const [activeInput, setActiveInput] = useState(null);
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [emailErr, setEmailErr] = useState("");
    const [customErr, setCustomErr] = useState("");
    const [passwordErr, setPasswordErr] = useState("");
    const [activeIcon, setActiveIcon] = useState("lock");
    const navigate = useNavigate();

    const responseGoogle = (response) => {
        console.log('Google Sign-In Response:', response);

        if (response.error === "popup_closed_by_user") {
            console.log("Google Sign-In popup closed by the user");
        } else {
            // Handle user data from the response
            console.log('User data:', response.profileObj);
            // You can use the user data as needed, such as sending it to your server for authentication
        }
    };
    const submitLogin = () => {
        setCustomErr("");
        setEmailErr("");
        setPasswordErr("");
        let data = {
            email:email,
            password: password,
        }
        axios
            .post("http://localhost/api/v1/login",data)
            .then(response => checkAuth(response))
            .catch(err => handleErrors(err));
    }
    const checkAuth = (response) =>{
        console.log(response);
        if(response.status === 200) {
            sessionStorage.setItem("user", response.data.user);
            navigate("/"+response.data.link);
        }
    }
    const handleErrors = (err) => {
        if (err.response.status === 422) {
            const errorData = err.response.data.errors;
            const errorMappings = {
                password: setPasswordErr,
                email: setEmailErr,
                invalid: setCustomErr,
            };

            for (let key in errorData) {
                if (key in errorMappings) {
                    errorMappings[key](errorData[key]);
                }
            }
        }
        console.log(err);
    };
    const handleInputBoxClick = (event) => {
        const clickedInputBox = event.target.id;
        setActiveInput(clickedInputBox);
    };
    const handleMouseDown = () => {
        setPasswordVisible(true);
    };
    const handleEmailInput = event =>{
        setEmail(event.target.value);
    }

    const handleMouseUp = () => {
        setPasswordVisible(false);
    };
    const handlePassword = event =>{
        setPassword(event.target.value);
        if(password.length > 0){
            setActiveIcon("eye")
        }else{
            setActiveIcon("lock")
        }
    }
    return (
        <div className="login-form flex col gap5">
            <div className="login-form-titles flex col gap2">
                <p>START RIGHT NOW</p>
                <h1>Jump right into it</h1>
                {customErr === "" ?<div className="flex gap1"> <p>Dont have an account?</p><p><a href="/register">Register</a></p></div> : <p className={"custom-err"}>{customErr}</p>}
            </div>
            <div className="form flex col gap2">
                <div className={`flex  input-box center-y between ${activeInput === 'email' ? 'active' : ''}`}
                     onClick={handleInputBoxClick}>
                    <div className="flex col center-x">
                        <label className={`font15 ${activeInput === 'email' ? 'active-label' : ''}`}>Email</label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            onChange={handleEmailInput}
                        />
                        <p className="err">{emailErr === "" ? '' : emailErr}</p>
                    </div>
                    <div className="icon pad1">
                        <MdEmail className={`auth-icon ${activeInput === 'email' ? 'none' : ''}`}/>
                    </div>
                </div>
                <div className={`flex  input-box center-y between ${activeInput === 'password' ? 'active' : ''}`}
                     onClick={handleInputBoxClick}>
                    <div className="flex col center-x">
                        <label className={`font15 ${activeInput === 'password' ? 'active-label' : ''}`}>Password</label>
                        <input
                            type={isPasswordVisible ? 'text' : 'password'}
                            id="password"
                            name="password"
                            onChange={handlePassword}
                        />
                        <p className="err">{passwordErr === "" ? '' : passwordErr}</p>
                    </div>
                    <div className="icon pad1">
                        {activeIcon === "eye" ?
                            <AiFillEye onMouseDown={handleMouseDown}
                                       onMouseUp={handleMouseUp}
                                       onMouseLeave={handleMouseUp}
                                       className={`auth-icon`}/>
                            :
                            <FaLock onMouseDown={handleMouseDown}
                                    onMouseUp={handleMouseUp}
                                    onMouseLeave={handleMouseUp}
                                    className={`auth-icon ${activeInput === 'password' ? 'none' : ''}`}/>
                        }
                    </div>
                </div>
                <div className={`flex col center-y gap2 `}>
                    <button className={`w-100`} onClick={submitLogin}>Login</button>
                    <div className={`flex center-y gap1 social-box`}>
                        <div className={`auth-icon-box shadow-light`}>
                            <img src={facebook} className={`auth-icon`} alt=""/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login;
