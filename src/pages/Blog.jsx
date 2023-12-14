import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import Header from "../compoents/Header";
import Loader from "../compoents/Loading";
import {TbCategory2, TbBookmark} from "react-icons/tb"
import { IoBookmark } from "react-icons/io5";

import logo from "../assets/icons/iconizer-logotypes-dots-svgrepo-com.svg";

function Blog() {
    let { id } = useParams();
    const [data, setData] = useState(null);
    const [saved, setSaved]=useState(false);
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setErrorToken] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const blogResponse = await axios.get(
                    // `http://localhost/api/v1/blogs?id=${id}`,
                    `http://localhost/api/v1/blog/get/${id}`,

                    {
                        headers: {
                            Authorization: sessionStorage.getItem('user'),
                        },
                    }
                );

                setBlog(blogResponse.data.data);
                if(Object.keys(blogResponse.data.data.saved_blogs_for_current_user).length>0){
                    setSaved(true);
                }
                setLoading(false);
            } catch (error) {
                setErrorToken(error);
                setLoading(false);
                // Handle other errors if needed
            } finally {
                console.log(blog);
            }
        };

        fetchData();
    }, [id]);
    const handleErr = (err) =>{
        if(err.status == 401){
            navigate("/");
        }
    }
    const handleSave = async () => {
        try {
            const response = await axios.post(
                `http://localhost/api/v1/blog/save`,
                {
                    blog_id:id,
                },
                {
                    headers: {
                        Authorization: sessionStorage.getItem('user'),
                    },
                }
            );

            if(response.data.status == 200){
                setSaved(!saved);
            }
        } catch (error) {
            setErrorToken(error);
            setLoading(false);
        }
    }
    if (loading) {
        return <Loader/>;
    }
    if (error) {
        console.log(error);
    }
    if(blog) {
        return (
            <div className={'flex'}>
                <Header/>
                    <div id="single-blog-page" className="App h-v">
                        <div className="flex col h-100vh max-1200">
                            <div className="blog-image-section flex middle">
                                <div className="image-box pad4 w-100">
                                    <img className={'cover blog-img shadow'} src={`http://localhost/storage/${blog.img}`} alt="Not found"/>
                                </div>
                            </div>
                            <div className="blog-text-section rel flex col">
                                <div className="text-box w-100 h-100 flex wrap pad3 gap1 center-x ">
                                    <div className="text-section flex flex-2 gap1 col">
                                        <div className="flex gap2 center-y">
                                            <h1 className={`blog-title`}>{blog.title} </h1>
                                            {saved ?
                                            <div className="saved-blog flex gap1 center-y" onClick={handleSave}>
                                                <p>Saved</p>
                                                <IoBookmark className={`icon`}/>
                                            </div>
                                                :
                                            <div className="save-blog flex gap1 center-y" onClick={handleSave}>
                                                <p>Save</p>
                                            </div>
                                            }
                                        </div>

                                        <div className={`blog-description justified-text`}>{blog.description}</div>
                                    </div>
                                    <div className="blog-info-section flex col gap1 flex-1">
                                        <h1>Info</h1>
                                        <div className={`info-unit flex center-y gap1`}>
                                            <div className={`blog-author`}>
                                                <img className={`cover`} src={`http://localhost/storage/${blog.user.img}`} alt=""/>
                                            </div>
                                            <div className="flex col">
                                                <p className={`bold`}>Author</p>
                                                <p>{blog.user.name}</p>
                                            </div>
                                        </div>
                                        <div className={`info-unit flex center-y gap1`}>
                                            <div className={`blog-info-icon flex middle`}>
                                                <TbCategory2 className={`icon`}/>
                                            </div>
                                            <div className="flex col">
                                                <p className={`bold`}>Category</p>
                                                <p>{blog.category}</p>
                                            </div>
                                        </div>
                                        <div className={`info-unit flex center-y gap1`}>
                                            <div className={`blog-info-icon flex middle`}>
                                                <TbBookmark className={`icon`}/>
                                            </div>
                                            <div className="flex col">
                                                <p className={`bold`}>Saves</p>
                                                <p>14</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        );
    }
    return null;
}

export default Blog;
