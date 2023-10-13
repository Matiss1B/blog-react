import logo from "../assets/icons/iconizer-logotypes-dots-svgrepo-com.svg";
import loginImg from "../assets/images/auth/hendrik-cornelissen--qrcOR33ErA-unsplash.jpg";
import React, {useEffect, useState} from "react";
import Login from "../compoents/Auth/Login";
import Register from "../compoents/Auth/Register";

function Authentification(props) {
    const [authType, setAuthType] = useState("");
    useEffect(()=>{
        setAuthType(props.auth);
    },[])
    return (
        <div className={"App"}>
            <div className="main-login-box flex h-v w-100">
                <div className="flex col flex-1 login-content w-100">
                    <div className="login-navbar pad2 gap1 center-y flex">
                        <img src={logo} alt=""/>
                        <h1 className="font25">BlogIt</h1>
                    </div>
                    <div className="h-100 w-100 flex middle">
                        {authType === "login" ? <Login/> : <Register/>}
                    </div>
                </div>
                <div className="flex flex-1 login-image-container hidden-mobile green w-100">
                    <img src={loginImg} alt="" className="cover"/>
                </div>
            </div>
        </div>
    );
}

export default Authentification;
