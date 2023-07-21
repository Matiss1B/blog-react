
import React from "react";
import {MdEmail} from "react-icons/md"
import{AiFillEye} from "react-icons/ai"
import {FaLock, FaAddressCard} from "react-icons/fa"
import {useState, useEffect} from "react";

function Register() {
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
            <div className="login-form-titles flex col gap2 pad1">
                <p>FEW STEPS</p>
                <h1>Create an account</h1>
                <p>Have an account? Login</p>
            </div>
            <div className="form flex col gap2">
                <div className="flex gap2 center-y">
                    <div className={`flex  input-box center-y between ${activeInput === 'name' ? 'active' : ''}`}
                         onClick={handleInputBoxClick}>
                        <div className="flex col center-x">
                            <label className={`font15 ${activeInput === 'name' ? 'active-label' : ''}`}>Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                            />
                        </div>
                        <div className="icon pad1">
                            <FaAddressCard className={`auth-icon `}/>
                        </div>
                    </div>
                    <div className={`flex  input-box center-y between ${activeInput === 'surname' ? 'active' : ''}`}
                         onClick={handleInputBoxClick}>
                        <div className="flex col center-x">
                            <label className={`font15 ${activeInput === 'surname' ? 'active-label' : ''}`}>Surname</label>
                            <input
                                type="text"
                                id="surname"
                                name="surname"
                            />
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
                        <MdEmail className={`auth-icon `}/>
                    </div>
                </div>
                <div className={`flex  input-box center-y between ${activeInput === 'password' ? 'active' : ''}`}
                     onClick={handleInputBoxClick}>
                    <div className="flex col center-x">
                        <label className={`font15`}>Password</label>
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
                                    className={`auth-icon`}/>
                        }
                    </div>
                </div>
                <button>Register</button>
            </div>
        </div>
    )
}
export default Register;
