import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import Header from "../compoents/Header";
import Loader from "../compoents/Loading";
import logo from "../assets/icons/iconizer-logotypes-dots-svgrepo-com.svg";

function Blog() {
    let { id } = useParams();
    const [data, setData] = useState(null);
    const [blog, setBlog] = useState([]);
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
            axios.get("http://localhost/api/v1/blogs?user="+sessionStorage.getItem("user")+"&id[eq]="+id ).then(res => setBlog(res.data.data)).catch(err => console.log(err));
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
                {blog.map((blog) => (
                    <div id="single-blog-page" className="App h-v">
                        <div className="flex col h-100vh max-1200">
                            <div className="blog-image-section flex middle">
                                <div className="image-box pad4 w-100">
                                    <img className={'cover'} src={`http://localhost/storage/${blog.img}`} alt="Not found"/>
                                </div>
                            </div>
                            <div className="blog-text-section rel flex col">
                                <div className="blog-icon abs flex center-y pad2 shadow-mid hidden-mobile gap1 middle">
                                    <img src={logo} alt=""/>
                                </div>
                                <div className="text-box w-100 h-100 flex pad3 col gap1 center-x ">
                                    <h1 className={`blog-title`}>{blog.title}</h1>
                                    <div className={`blog-description`}>{blog.description}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
    return null;
}

export default Blog;
