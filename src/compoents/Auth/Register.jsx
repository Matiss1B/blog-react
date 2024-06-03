
import React from "react";
import {MdEmail} from "react-icons/md"
import{AiFillEye} from "react-icons/ai"
import {FaLock, FaAddressCard} from "react-icons/fa"
import {useState, useEffect} from "react";
import {BsCheckCircleFill} from "react-icons/bs"
import {useNavigate} from "react-router-dom";
import axios from "axios";
import LoaderRing from "../Loader";

function Register() {
    const [activeInput, setActiveInput] = useState(null);
    const [registerCheck, setRegisterCheck] = useState(false);
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [passwordErr, setPasswordErr] = useState("");
    const [emailErr, setEmailErr] = useState("");
    const [nameErr, setNameErr] = useState("");
    const [surnameErr, setSurnameErr] = useState("");
    const [activeIcon, setActiveIcon] = useState("lock");
    const [loader,setLoader] = useState(false);

    const navigate = useNavigate();
    const handleInputBoxClick = (id) => {
        setActiveInput(id);
        const element = document.getElementById(id);
        if (element) {
            element.focus();
        }
    };
    const submitRegister = () => {
        setLoader(true);
        setEmailErr("");
        setNameErr("");
        setSurnameErr("");
        setPasswordErr("");
        let data = {
            name:name,
            surname:surname,
            email:email,
            password: password,
        }
        axios
            .post(`${process.env.REACT_APP_BASE_URL_BACKEND}/api/v1/register`,data)
            .then(response => checkAuth(response))
            .catch(err => handleErrors(err));
    }
    const sumbitLogin = () => {
        setLoader(true);
        let data ={
            email:email,
            password: password,
        }
        axios
            .post(`${process.env.REACT_APP_BASE_URL_BACKEND}/api/v1/login`,data)
            .then(response => fastLogin(response))
            .catch(err => { setLoader(false)});
    }

    const checkAuth = (response) =>{
        setLoader(false);
        if(response.status === 200) {
            setRegisterCheck(true)
        }
    }
    const fastLogin = (response) =>{
        setLoader(false);
        if(response.status === 200) {
            sessionStorage.setItem("user", response.data.user);
            navigate("/home");
        }
    }
    const setError = (key, error) => {
        if(key === "surname"){
            setSurnameErr(error);
        }
        if(key === "name"){
            setNameErr(error);
        }
        if(key === "password"){
            setPasswordErr(error);
        }
        if(key === "email"){
            setEmailErr(error);
        }
    }
    const handleErrors = (err) =>{
        setLoader(false);
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
    const handleMouseDown = () => {
        setPasswordVisible(true);
    };

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
    const handleNameInput = event =>{
        setName(event.target.value);
    }
    const handleSurnameInput = event =>{
        setSurname(event.target.value);
    }
    const handleEmailInput = event =>{
        setEmail(event.target.value);
    }
    return (
        <div className="login-form flex col gap5">
            {registerCheck ?
            <div className="register-success flex col gap2 pad1">
                <div className="flex w-100 gap2 center-y">
                    <h1>Your account is created</h1>
                    <BsCheckCircleFill className={"icon"}/>
                </div>
                <div className="flex gap1">
                    <p>Create another one?</p>
                    <p><a href="/register">Register</a></p>
                </div>
            </div>
            :
            <div className="login-form-titles flex col gap2 pad1">
                <p>FEW STEPS</p>
                <h1>Create an account</h1>
                <div className="flex gap1"> <p>Have an account?</p><p><a href="/">Login</a></p></div>
            </div>
            }
            <div className="form flex col gap2">
                <div className="flex gap2 row-to-col center-y">
                    <div className={`flex  input-box center-y between ${activeInput === 'name' ? 'active' : ''}`}
                         onClick={() => {handleInputBoxClick("name")}}>
                        <div className="flex col center-x">
                            <label className={`font15 ${activeInput === 'name' ? 'active-label' : ''}`}>Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                onChange={handleNameInput}
                            />
                            <p className="err">{nameErr === "" ? '' : nameErr}</p>
                        </div>
                        <div className="icon pad1">
                            <FaAddressCard className={`auth-icon `}/>
                        </div>
                    </div>
                    <div className={`flex  input-box center-y between ${activeInput === 'surname' ? 'active' : ''}`}
                         onClick={() => {handleInputBoxClick("surname")}}>
                        <div className="flex col center-x">
                            <label className={`font15 ${activeInput === 'surname' ? 'active-label' : ''}`}>Surname</label>
                            <input
                                type="text"
                                id="surname"
                                name="surname"
                                onChange={handleSurnameInput}
                            />
                            <p className="err">{surnameErr === "" ? '' : surnameErr}</p>
                        </div>
                        <div className="icon pad1">
                        <FaAddressCard onMouseDown={handleMouseDown}
                                   onMouseUp={handleMouseUp}
                                   onMouseLeave={handleMouseUp}
                                   className={`auth-icon`}/>
                        </div>
                    </div>
                </div>
                <div className={`flex  input-box center-y between ${activeInput === 'email' ? 'active' : ''}`}
                     onClick={() => {handleInputBoxClick("email")}}>
                    <div className="flex col w-100 center-x">
                        <label className={`font15 ${activeInput === 'email' ? 'active-label' : ''}`}>Email</label>
                        <input
                            type="text"
                            id="email"
                            className="w-100"
                            name="email"
                            onChange={handleEmailInput}
                        />
                        <p className="err">{emailErr === "" ? '' : emailErr}</p>
                    </div>
                    <div className="icon pad1">
                        <MdEmail className={`auth-icon `}/>
                    </div>
                </div>
                <div className={`flex  input-box center-y between ${activeInput === 'password' ? 'active' : ''}`}
                     onClick={() => {handleInputBoxClick("password")}}>
                    <div className="flex col w-100 center-x">
                        <label className={`font15`}>Password</label>
                        <input
                            type={isPasswordVisible ? 'text' : 'password'}
                            id="password"
                            className="w-100"
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
                                    className={`auth-icon`}/>
                        }
                    </div>
                </div>
                {registerCheck ?
                    <button onClick={sumbitLogin}>{loader ?
                        <LoaderRing/> : "Login"}</button>
                    :
                    <button onClick={submitRegister}>{loader ?
                        <LoaderRing/> : "Register"}</button>
                }
            </div>
        </div>
    )
}
export default Register;
