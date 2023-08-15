import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import Header from "../compoents/Header";
import Loader from "../compoents/Loading";

function Blogs(props) {
    let { id } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setErrorToken] = useState(null);
    let [blog, setBlogs] = useState([]);
    useEffect(()=>{
        axios.get("http://localhost/api/v1/blogs?user="+sessionStorage.getItem("user")+"&category[eq]="+props.category ).then(res => setBlogs(res.data.data)).catch(err => console.log(err));
    },[]);
    const column1Blogs = [];
    const column2Blogs = [];
    const column3Blogs = [];
    const handleMouseDown = (event) => {
        const blogAuthorElement = event.currentTarget.querySelector("#blog-author");
        const blogInfoElement = event.currentTarget.querySelector("#blog-info");
        if (blogAuthorElement && blogInfoElement) {
            blogAuthorElement.classList.remove("none");
            blogInfoElement.classList.remove("none");
        }
    };

    const handleMouseUp = (event) => {
        const blogAuthorElement = event.currentTarget.querySelector("#blog-author");
        const blogInfoElement = event.currentTarget.querySelector("#blog-info");
        if (blogAuthorElement && blogInfoElement) {
            blogAuthorElement.classList.add("none");
            blogInfoElement.classList.add("none");
        }
    };
    // Distribute blogs into separate columns
    blog.forEach((blog, index) => {
        if (index % 3 === 0) {
            column1Blogs.push(blog);
        } else if (index % 3 === 1) {
            column2Blogs.push(blog);
        } else {
            column3Blogs.push(blog);
        }
    });
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
                <div className="App h-v pad3">
                    <div className="h-v flex blogs-list flex evenly wrap pad2">
                        <div id={`column-1`} className="column flex col gap1">
                            {column1Blogs.map((blog) => (
                                <div className={` rel single-blog`}
                                     onMouseEnter={handleMouseDown}
                                     onMouseLeave={handleMouseUp}
                                     style={{height: `${Math.floor(Math.random() * (45 - 20 + 1)) + 20}rem`}}
                                     key={blog.id}>
                                    <img className={`cover`} src={`http://localhost/storage/${blog.img}`} alt=""/>
                                    <div id={`blog-author`} className=" abs pad1 blog-author-box none center-y">
                                        <div className="flex w-100 gap2 center-y">
                                            <div className="profile-icon green">
                                                <img className={`cover`}
                                                     src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0_8KptY-0dlRaE0h4yxWnwM4z8KdZEOfipg&usqp=CAU"
                                                     alt=""/>
                                            </div>
                                            <h1>James Popppins</h1>
                                        </div>
                                    </div>
                                    <div id={`blog-info`} className=" abs pad1 blog-info-box none center-y">
                                        <div className="flex w-100 gap2 center-y">
                                            <h1>{blog.title}</h1>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div id={`column-2`} className="column  flex col gap1">
                            {column2Blogs.map((blog) => (
                                <div className={` rel single-blog`}
                                     onMouseEnter={handleMouseDown}
                                     onMouseLeave={handleMouseUp}
                                     style={{height: `${Math.floor(Math.random() * (45 - 20 + 1)) + 20}rem`}}
                                     key={blog.id}>
                                    <img className={`cover`} src={`http://localhost/storage/${blog.img}`} alt=""/>
                                    <div id={`blog-author`} className=" abs pad1 blog-author-box none center-y">
                                        <div className="flex w-100 gap2 center-y">
                                            <div className="profile-icon green">
                                                <img className={`cover`}
                                                     src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0_8KptY-0dlRaE0h4yxWnwM4z8KdZEOfipg&usqp=CAU"
                                                     alt=""/>
                                            </div>
                                            <h1>James Popppins</h1>
                                        </div>
                                    </div>
                                    <div id={`blog-info`} className=" abs pad1 blog-info-box none center-y">
                                        <div className="flex w-100 gap2 center-y">
                                            <h1>{blog.title}</h1>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div id={`column-3`} className="column  flex col gap1">
                            {column3Blogs.map((blog) => (
                                <div className={` rel single-blog`}
                                     onMouseEnter={handleMouseDown}
                                     onMouseLeave={handleMouseUp}
                                     style={{height: `${Math.floor(Math.random() * (45 - 20 + 1)) + 20}rem`}}
                                     key={blog.id}>
                                    <img className={`cover`} src={`http://localhost/storage/${blog.img}`} alt=""/>
                                    <div id={`blog-author`} className=" abs pad1 blog-author-box none center-y">
                                        <div className="flex w-100 gap2 center-y">
                                            <div className="profile-icon green">
                                                <img className={`cover`}
                                                     src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0_8KptY-0dlRaE0h4yxWnwM4z8KdZEOfipg&usqp=CAU"
                                                     alt=""/>
                                            </div>
                                            <h1>James Popppins</h1>
                                        </div>
                                    </div>
                                    <div id={`blog-info`} className=" abs pad1 blog-info-box none center-y">
                                        <div className="flex w-100 gap2 center-y">
                                            <h1>{blog.title}</h1>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return null;
}

export default Blogs;
