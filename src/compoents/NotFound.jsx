import React from 'react';
import { RiEmotionUnhappyLine } from "react-icons/ri";
import logo from "../assets/icons/iconizer-logotypes-dots-svgrepo-com.svg";
import {useNavigate} from "react-router-dom";
const NotFound = () => {
    const naviagte = useNavigate();
    return (
        <div className={`h-v not-found flex middle`}>
            <div className={`main-box flex gap2 center-y wrap`}>
                <div className="flex col">
                    <div className="flex logo center-y gap1 pad1">
                        <img src={logo} alt=""/>
                        <h1 className="font25">BlogIt</h1>
                    </div>
                    <h1 className={"pad1"}>Something's wrong here...</h1>
                    <p className={"pad1"}>We can't find page you're looking for. Check the link or go back to home:(</p>
                    <button onClick={()=>{naviagte("/home")}}>Home</button>
                </div>
                <div className="flex middle hidden-mobile">
                    <RiEmotionUnhappyLine className="icon"/>
                </div>
            </div>
        </div>
    );
};

export default NotFound;