import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Header from "../compoents/Header";
import Loader from "../compoents/Loading";
function Settings() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setErrorToken] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const data = {
            token: sessionStorage.getItem("user"),
        }
        axios.post("http://localhost/api/v1/checkToken", data, {
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then(response => {
                setData(response.data);
                setLoading(false);
            })
            .catch(error => {
                setErrorToken(error);
                setLoading(false);
            });
    }, []);
    if (loading) {
        return <Loader/>;
    }
    if (error) {
        // Redirect to another page if there's an error
        return navigate("/");
    }
    if(data) {
        return (
            <div className={'flex'}>
                <Header/>
                <div className="App main-settings-box h-v flex col center-y evenly">
                    <div className="profile-box flex center-y gap2">
                        <div className="profile-img">
                            <img className={`cover`} src="https://images.unsplash.com/photo-1692651955510-8b334577cff7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60" alt=""/>
                        </div>
                        <div className="profile-info">
                            <h1>Matiss Balins</h1>
                            <p>matiss@matiss</p>
                        </div>
                    </div>
                    <div className="profile-box">hey</div>
                    <div className="profile-box">hey</div>
                </div>
            </div>
        );
    }
    return null;
}

export default Settings;
