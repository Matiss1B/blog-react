
import React from "react";
import {MdEmail} from "react-icons/md"
import{AiFillEye} from "react-icons/ai"
import {FaLock} from "react-icons/fa"
import {useState, useEffect} from "react";
import axios from "axios";

function Login() {
    const [activeInput, setActiveInput] = useState(null);
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [emailErr, setEmailErr] = useState("");
    const [passwordErr, setPasswordErr] = useState("");
    const [activeIcon, setActiveIcon] = useState("lock");
    const submitLogin = () => {
        setEmailErr("");
        setPasswordErr("");
        let data = {
            email:email,
            password: password,
        }
        axios
            .post("http://localhost/api/v1/register",data)
            .then(response => checkAuth(response))
            .catch(err => handleErrors(err));
    }
    const checkAuth = (response) =>{
        if(response.status === 200) {
            sessionStorage.setItem("user", response.data.user);
        }
    }
    const setError = (key, error) => {
        if(key === "password"){
            setPasswordErr(error);
        }
        if(key === "email"){
            setEmailErr(error);
        }
    }
    const handleErrors = (err) =>{
        if(err.response.status === 422) {
            let errors = err.response.data.errors;
            for (let key in errors) {
                setError(key, errors[key]);
            }
        }
        if(err.response.status === 300){

        }
        console.log(err);
    }
    const handleInputBoxClick = (event) => {
        const clickedInputBox = event.target.id;
        setActiveInput(clickedInputBox);
        console.log(activeInput);
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
                <p>Dont have an account? Register</p>
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
                <button onClick={submitLogin}>Login</button>
            </div>
        </div>
    )
}
export default Login;
