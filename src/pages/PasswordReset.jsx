import React, {useEffect, useState} from 'react';
import logo from "../assets/icons/iconizer-logotypes-dots-svgrepo-com.svg";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import axios from "axios";
import LoaderRing from "../compoents/Loader";



const PasswordReset = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(false);
    const [loader,setLoader] = useState(false);
    const [errors, setErrors] = useState({
        password:"",
        confirm_password:"",
    })
    const [confirmPassword, setConfirmPassword] = useState("");
    const { user, token } = useParams();
    const handleForm= async () =>{
        setLoader(true);
        const formData = new FormData();
        formData.append("confirm_password", confirmPassword);
        formData.append("password", password);

        try {
            const response = await axios.post(`http://localhost/api/v1/user/password-reset`, formData,{
                headers:{
                    Authorization:window.localStorage.getItem("user"),
                }
            });
            console.log(response);
            const data = response.data;
            if(response.status === 201){
                console.log(data.status);
                sessionStorage.setItem("user", window.localStorage.getItem("user"));
                window.localStorage.removeItem("user");
                setSuccess(true);
            }
        } catch (error) {
            if(error.response.status == 422){
                setErrors(error.response.data.errors);
            }
        }
        setLoader(false);

    }
    return (
        <div className={"h-v rel"}>
            <div className="password-reset-box flex col center-y gap1 abs pad2 shadow">
                <div className="flex gap1 center-y">
                    <img src={logo} alt=""/>
                    <h1 className="font25">BlogIt</h1>
                </div>
                {success !== true
                    ?
                    <div className="w-100 flex col center-y gap1">
                        <h1 className="font175">Password reset</h1>
                        <div className={`flex  input-box center-y between`}>
                            <div className="flex col center-x">
                                <label className={`font15`}>Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    onChange={(e)=>{setPassword(e.target.value)}}
                                />
                                <p className="err">{errors.password === "" ? '' : errors.password}</p>
                            </div>
                        </div>
                        <div className={`flex  input-box center-y between `}>
                            <div className="flex col center-x">
                                <label className={`font15`}>Confirm password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    onChange={(e)=>{setConfirmPassword(e.target.value)}}
                                />
                                <p className="err">{errors.confirm_password === "" ? '' : errors.confirm_password}</p>
                            </div>
                        </div>
                        <button onClick={handleForm}>{loader?<LoaderRing/>:"Reset"}</button>
                    </div>
                    :
                    <div className="w-100 flex col center-y gap2">
                        <h1 className="font175">Successfully password reset!</h1>
                        <p className="success-text">You can use your new password to login into your account!</p>
                        <button onClick={()=>{navigate("/home")}}>Return</button>
                    </div>
                }
            </div>
        </div>
    );
};

export default PasswordReset;