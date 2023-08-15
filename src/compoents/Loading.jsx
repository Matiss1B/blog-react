import "../assets/scss/App.css";
import logo from "../assets/icons/iconizer-logotypes-dots-svgrepo-com.svg";
import React from "react";

function Loader() {
    return (
        <div className="App h-v pad3 middle">
            <div className="loader center-y flex col">
                <div className="flex gap1">
                    <h1 className="font25">BlogIt</h1>
                </div>
                <div className="lds-ellipsis">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
        );
}

export default Loader;