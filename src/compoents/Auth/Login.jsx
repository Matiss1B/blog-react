
import React from "react";
import {MdEmail} from "react-icons/md"
import{AiFillEye} from "react-icons/ai"
import {FaLock} from "react-icons/fa"
import {useState, useEffect} from "react";

function Login() {
    const [activeInput, setActiveInput] = useState(null);
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const [password, setPassword] = useState("");
    const [activeIcon, setActiveIcon] = useState("lock");
    const handleInputBoxClick = (event) => {
        const clickedInputBox = event.target.id;
        setActiveInput(clickedInputBox);
        console.log(activeInput);
    };
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
    return (
        <div className="login-form flex col gap5">
                            <div className="login-form-titles flex col gap2">
                                <p>START RIGHT NOW</p>
                                <h1>Jump right in</h1>
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
                                        />
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
                                <button>Login</button>
                            </div>
                        </div>
    )
}
export default Login;
