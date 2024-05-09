import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import logo from "../assets/icons/iconizer-logotypes-dots-svgrepo-com.svg";
import axios from "axios";
import LoaderRing from "../compoents/Loader";

const PasswordResetMail = () => {
    const [email, setEmail] = useState("");
    const [loader, setLoader] = useState(false);

    const [errors, setErrors] = useState({
        email: "",
    })
    const [success, setSuccess] = useState(false);
    const handleForm= async () =>{
        setLoader(true)
        const formData = new FormData();
        formData.append("email", email);
        formData.append("token", Math.floor(1000000000 + Math.random() * 9000000000).toString());
        try {
            const response = await axios.post(`http://localhost/api/v1/user/password-reset-mail`, formData,{
                headers:{
                    Authorization:sessionStorage.getItem("user"),
                }
            });
           const data = response.data;
            if(data.status === 200){
                window.localStorage.setItem("user",sessionStorage.getItem("user"));
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
                {!success
                    ?
                    <div className="w-100 flex col center-y gap1">
                        <h1 className="font175">Password reset</h1>
                        <p className="success-text font15">Enter email where you want recive password reset link</p>
                        <div className={`flex  input-box center-y between`}>
                            <div className="flex col center-x">
                                <label className={`font15`}>Email</label>
                                <input
                                    type="text"
                                    id="email"
                                    name="email"
                                    onChange={(e)=>{setEmail(e.target.value)}}
                                />
                                <p className="err">{errors.email === "" ? '' : errors.email}</p>
                            </div>
                        </div>
                        <button onClick={handleForm}>{loader? <LoaderRing/>:"Send"}</button>
                    </div>
                    :
                    <div className="w-100 flex col center-y gap2">
                        <h1 className="font175">Email sent to your email!</h1>
                        <p className="success-text">Check your email to continue password reset process</p>
                    </div>
                }
            </div>
        </div>
    );
};

export default PasswordResetMail;