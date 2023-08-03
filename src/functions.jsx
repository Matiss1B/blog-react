import {useEffect, useState} from "react";
import axios from "axios";

    const data = {
        token: sessionStorage.getItem("user"),
    }
    axios.post("http://localhost/api/v1/checkToken",data, {
        headers: { "Content-Type": "multipart/form-data" },
    }, ).then(res => checkToken(res)).catch(err => checkToken(err));
},[])
useEffect(() => {
    if (!token) {
        navigate("/");
    }
}, [token]);