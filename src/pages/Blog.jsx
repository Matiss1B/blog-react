import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import Header from "../compoents/Header";
import Loader from "../compoents/Loading";
import {TbCategory2, TbBookmark} from "react-icons/tb"
import {FaHashtag} from "react-icons/fa";
import { IoBookmark } from "react-icons/io5";
import { MdSend } from "react-icons/md";

import logo from "../assets/icons/iconizer-logotypes-dots-svgrepo-com.svg";
import {esES} from "@mui/material/locale";

function Blog() {
    let { id } = useParams();
    const [data, setData] = useState(null);
    const [saved, setSaved]=useState(false);
    const [saves, setSaves] = useState(0);
    const [blog, setBlog] = useState(null);
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setErrorToken] = useState(null);
    const [comments, setComments] = useState([]);
    const navigate = useNavigate();
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        console.log(sessionStorage.getItem("user"));
        const fetchData = async () => {
            try {
                const blogResponse = await axios.get(
                    // `${process.env.REACT_APP_BASE_URL_BACKEND}/api/v1/blogs?id=${id}`,
                    `${process.env.REACT_APP_BASE_URL_BACKEND}/api/v1/blog/get/${id}`,

                    {
                        headers: {
                            "Authorization": sessionStorage.getItem('user'),
                        },
                    }
                );
                const tagIds = blogResponse.data.tags.map(tag => tag.id);
                try{
                    const response = await axios.post(`${process.env.REACT_APP_BASE_URL_BACKEND}/api/v1/tags/add`, {tags:tagIds}, {
                        headers:{
                            "Authorization": sessionStorage.getItem("user")
                        }
                    })
                    console.log(response);

                }catch (e){
                    console.log(e)
                }
                blogResponse.data.data.tags =  blogResponse.data.tags;
                setComments(blogResponse.data.data.comments);
                console.log(blogResponse)
                setBlog(blogResponse.data.data);
                setSaves(Object.keys(blogResponse.data.data.saves).length);
                if(Object.keys(blogResponse.data.data.saved_blogs_for_current_user).length>0){
                    setSaved(true);
                }
                setLoading(false);
            } catch (error) {
                if(error.response.status == 500 && error.response.data.message == 'Attempt to read property "id" on null'){
                    navigate("/error");
                }
                setErrorToken(error);
                setLoading(false);
                // Handle other errors if needed
            } finally {
                //console.log(blog);
            }
        };
        const handleView = async () => {
            try {
                const response = await axios.get(
                    // `${process.env.REACT_APP_BASE_URL_BACKEND}/api/v1/blogs?id=${id}`,
                    `${process.env.REACT_APP_BASE_URL_BACKEND}/api/v1/blog/view/${id}`,

                    {
                        headers: {
                            "Authorization": sessionStorage.getItem('user'),
                        },
                    }
                );
            } catch (error) {
                console.log(error);
                setErrorToken(error);
                setLoading(false);
            }
        };

        if (!isMounted) {
            setIsMounted(true)
            handleView();
            fetchData();
        }
    }, [id]);
    const addComment = async () => {
        const formData = new FormData;
        formData.append("comment", comment);
        formData.append("blog_id", id);
        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL_BACKEND}/api/v1/comment/create`,formData, {
                headers: {
                    "Authorization": sessionStorage.getItem("user")
                }
            });
            console.log(response.data);
            if(response.data.status == 200) {
                setComment("");
                comments.unshift(response.data.comment);
            }
        }catch (error){
            console.log(error)
        }
    }
    const handleErr = (err) =>{
        if(err.status == 401){
            navigate("/");
        }
    }
    const handleSave = async () => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_BASE_URL_BACKEND}/api/v1/blog/save`,
                {
                    blog_id:id,
                },
                {
                    headers: {
                        "Authorization": sessionStorage.getItem('user'),
                    },
                }
            );
            if(response.data.status == 200){
                setSaved(!saved);
                if(!saved === true){
                    setSaves(saves+1);
                }else{
                    setSaves(saves-1);
                }
            }
            if(response.data.status == 401){
                navigate("/");
            }
        } catch (error) {
            setLoading(false);
        }
    }
    if (loading) {
        return <Loader/>;
    }
    if (error) {
        if(error.response.data.status == 401){
            navigate("/");
        }
    }
    if(blog) {
        return (
            <div className={'flex row-to-col'}>
                <Header/>
                    <div id="single-blog-page" className="App h-v">
                        <div className="flex col h-100vh max-1200 w-100">
                            <div className="blog-image-section flex middle">
                                <div className="image-box w-100">
                                    <img className={'cover blog-img shadow'} src={`${process.env.REACT_APP_BASE_URL_BACKEND}/storage/${blog.img}`} alt="Not found"/>
                                </div>
                            </div>
                            <div className="blog-text-section rel flex col">
                                <div className="text-box w-100 h-100 flex wrap gap1 center-x ">
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
                                    <div id="blog-info-section-id" className="flex flex-1 col">
                                        <div className="blog-info-section flex col gap1 flex-1">
                                            <h1>Info</h1>
                                            <div className={`info-unit flex center-y gap1 pointer`} onClick={()=>navigate(`/profile/${blog.user.id}`)}>
                                                <div className={`blog-author`}>
                                                    <img className={`cover`}
                                                         src={`${process.env.REACT_APP_BASE_URL_BACKEND}/storage/${blog.user.img}`}
                                                         alt=""/>
                                                </div>
                                                <div className="flex col">
                                                    <p className={`bold`}>Author</p>
                                                    <p>{blog.user.name} {blog.user.surname}</p>
                                                </div>
                                            </div>
                                            <div className={`info-unit flex center-y gap1`}>
                                                <div className={`blog-info-icon flex middle`}>
                                                    <TbCategory2 className={`icon`}/>
                                                </div>
                                                <div className="flex col">
                                                    <p className={`bold pointer`}>Category</p>
                                                    <p className="pointer" onClick={() => {
                                                        navigate(`/blogs/${blog.category}`)
                                                    }}>{blog.category}</p>
                                                </div>
                                            </div>
                                            <div className={`info-unit flex center-y gap1`}>
                                                <div className={`blog-info-icon flex middle`}>
                                                    <FaHashtag className={`icon`}/>
                                                </div>
                                                <div className="flex col">
                                                    <p className={`bold`}>Hashtags</p>
                                                    <p>{Object.values(blog.tags).map(item => item.tag).join(", ")}</p>
                                                </div>
                                            </div>

                                            <div className={`info-unit flex center-y gap1`}>
                                                <div className={`blog-info-icon flex middle`}>
                                                    <TbBookmark className={`icon`}/>
                                                </div>
                                                <div className="flex col">
                                                    <p className={`bold`}>Saves</p>
                                                    <p>{saves}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="comment-section flex col gap1 flex-1">
                                            <div className="add-comment-box flex col w-100 gap1">
                                                <div className="input-box flex w-100 center-x">
                                                    <div className="flex col h-100 w-100">
                                                        <label htmlFor="" className="font15">Comment</label>
                                                        <input type="text" value={comment} onChange={(e) => {
                                                            setComment(e.target.value)
                                                        }}/>
                                                    </div>
                                                    <div className=" h-100 flex middle">
                                                        <MdSend className="icon" onClick={addComment}/>
                                                    </div>
                                                </div>
                                                <div className="comment-list">
                                                    {comments.map(comment => (
                                                        <div key={comment.id} className="unit flex w-100 gap1 pad1">
                                                            <div className="image-box w-100 h-100 pointer" onClick={()=>{navigate(`/profile/${comment.user.id}`)}}>
                                                                <img src={`${process.env.REACT_APP_BASE_URL_BACKEND}/storage/${comment.user.img}`} className="cover" alt="" />
                                                            </div>
                                                            <div className="col w-100 pointer" onClick={()=>{navigate(`/profile/${comment.user.id}`)}}>
                                                                <h1>{comment.user.name}</h1>
                                                                <p>{comment.comment}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
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
