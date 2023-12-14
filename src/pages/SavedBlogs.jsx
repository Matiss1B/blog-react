import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import Header from "../compoents/Header";
import {GrClose, GrSearch} from "react-icons/gr";
import Loader from "../compoents/Loading";

function SavedBlogs() {
    const [data, setData] = useState(null);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setErrorToken] = useState(null);
    const [column1Blogs, setColumn1Blogs] = useState([]);
    const [column2Blogs, setColumn2Blogs] = useState([]);
    const [column3Blogs, setColumn3Blogs] = useState([]);
    const [column4Blogs, setColumn4Blogs] = useState([]);
    let [blog, setBlogs] = useState([]);
    useEffect(()=>{
        axios.get("http://localhost/api/v1/blog/get/all/saved", {
            headers:{
                "Authorization": sessionStorage.getItem("user"),
            }} ).then(res => {
            setBlogs(res.data)
            setData(res.data);
        }).catch(err => handleErr(err.response.data));
    },[]);
    const handleMouseDown = (event) => {
        const blogAuthorElement = event.currentTarget.querySelector("#blog-author");
        const blogInfoElement = event.currentTarget.querySelector("#blog-info");
        if (blogAuthorElement && blogInfoElement) {
            blogAuthorElement.classList.remove("none");
            blogInfoElement.classList.remove("none");
        }
    };
    const handleErr = (err) =>{
        if(err.status == 401){
            navigate("/");
        }
    }
    const handleSearch = event =>{
        setSearch(event.target.value);
        const filteredBlogs = data.filter(unit =>
            unit.title.toLowerCase().includes(event.target.value.toLowerCase())
        );
        setBlogs(filteredBlogs);
        console.log(filteredBlogs);
    }
    const editBlog = (id) => {
        navigate(`/edit/${id}`);
    }
    const handleMouseUp = (event) => {
        const blogAuthorElement = event.currentTarget.querySelector("#blog-author");
        const blogInfoElement = event.currentTarget.querySelector("#blog-info");
        if (blogAuthorElement && blogInfoElement) {
            blogAuthorElement.classList.add("none");
            blogInfoElement.classList.add("none");
        }
    };
    useEffect(() => {
        // Handle column assignments when 'blog' changes
        setColumn1Blogs([]);
        setColumn2Blogs([]);
        setColumn3Blogs([]);
        setColumn4Blogs([]);

        blog.forEach((blog, index) => {
            if (index % 3 === 0) {
                setColumn1Blogs((prev) => [...prev, blog]);
            } else if (index % 3 === 1) {
                setColumn2Blogs((prev) => [...prev, blog]);
            } else if (index % 4 === 3) {
                setColumn4Blogs((prev) => [...prev, blog]);
            } else {
                setColumn3Blogs((prev) => [...prev, blog]);
            }
        });
    }, [blog]);
    const navigate = useNavigate();
    useEffect(() => {
        const data = {
            token: sessionStorage.getItem("user"),
        }
        axios.post("http://localhost/api/v1/checkToken", data, {
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then(response => {
                console.log(response.data);
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
                    <div className="blog-search-box w-100 flex middle">
                        <div className="search-box flex gap1 center-y">
                            <GrSearch className={` ${search === "" ? "flex" : "none"} icon`}/>
                            <input onChange={handleSearch} type="text" className={`blog-search-input w-100`}/>
                            <GrClose className={` ${search === "" ? "none" : "flex"} icon close-icon`}/>
                        </div>
                    </div>
                    <div className="h-v flex blogs-list flex evenly wrap pad2">
                        <div id={`column-1`} className="column flex col gap1">
                            {column1Blogs.map((blog) => (
                                <div className={` rel single-blog`}
                                     onMouseEnter={handleMouseDown}
                                     onMouseLeave={handleMouseUp}
                                     onClick={() => {
                                         navigate(`/blog/${blog.id}`);

                                     }}
                                     style={{height: `${Math.floor(Math.random() * (45 - 20 + 1)) + 20}rem`}}
                                     key={blog.id}>
                                    <img className={`cover`} src={`http://localhost/storage/${blog.img}`} alt=""/>
                                    <div id={`blog-author`} className=" abs pad1 blog-author-box none center-y">
                                        <div className="flex w-100 gap2 center-y">
                                            <div className="profile-icon green">
                                                {blog.user.img == ""
                                                    ?
                                                    <img className={`cover`}
                                                         src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0_8KptY-0dlRaE0h4yxWnwM4z8KdZEOfipg&usqp=CAU"
                                                         alt=""/>
                                                    :
                                                    <img className={`cover`}
                                                         src={`http://localhost/storage/${blog.user.img}`}
                                                         alt=""/>
                                                }

                                            </div>
                                            <h1>{blog.user.name}</h1>
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
                                     onClick={() => editBlog(blog.id)}
                                     style={{height: `${Math.floor(Math.random() * (45 - 20 + 1)) + 20}rem`}}
                                     key={blog.id}>
                                    <img className={`cover`} src={`http://localhost/storage/${blog.img}`} alt=""/>
                                    <div id={`blog-author`} className=" abs pad1 blog-author-box none center-y">
                                        <div className="flex w-100 gap2 center-y">
                                            <div className="profile-icon green">
                                                {blog.user.img == ""
                                                    ?
                                                    <img className={`cover`}
                                                         src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0_8KptY-0dlRaE0h4yxWnwM4z8KdZEOfipg&usqp=CAU"
                                                         alt=""/>
                                                    :
                                                    <img className={`cover`}
                                                         src={`http://localhost/storage/${blog.user.img}`}
                                                         alt=""/>
                                                }

                                            </div>
                                            <h1>{blog.user.name}</h1>
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
                                     onClick={() => editBlog(blog.id)}
                                     style={{height: `${Math.floor(Math.random() * (45 - 20 + 1)) + 20}rem`}}
                                     key={blog.id}>
                                    <img className={`cover`} src={`http://localhost/storage/${blog.img}`} alt=""/>
                                    <div id={`blog-author`} className=" abs pad1 blog-author-box none center-y">
                                        <div className="flex w-100 gap2 center-y">
                                            <div className="profile-icon green">
                                                {blog.user.img == ""
                                                    ?
                                                    <img className={`cover`}
                                                         src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0_8KptY-0dlRaE0h4yxWnwM4z8KdZEOfipg&usqp=CAU"
                                                         alt=""/>
                                                    :
                                                    <img className={`cover`}
                                                         src={`http://localhost/storage/${blog.user.img}`}
                                                         alt=""/>
                                                }

                                            </div>
                                            <h1>{blog.user.name}</h1>
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
                        <div id={`column-4`} className="column  flex col gap1">
                            {column4Blogs.map((blog) => (
                                <div className={` rel single-blog`}
                                     onMouseEnter={handleMouseDown}
                                     onMouseLeave={handleMouseUp}
                                     onClick={() => editBlog(blog.id)}
                                     style={{height: `${Math.floor(Math.random() * (45 - 20 + 1)) + 20}rem`}}
                                     key={blog.id}>
                                    <img className={`cover`} src={`http://localhost/storage/${blog.img}`} alt=""/>
                                    <div id={`blog-author`} className=" abs pad1 blog-author-box none center-y">
                                        <div className="flex w-100 gap2 center-y">
                                            <div className="profile-icon green">
                                                {blog.user.img == ""
                                                    ?
                                                    <img className={`cover`}
                                                         src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0_8KptY-0dlRaE0h4yxWnwM4z8KdZEOfipg&usqp=CAU"
                                                         alt=""/>
                                                    :
                                                    <img className={`cover`}
                                                         src={`http://localhost/storage/${blog.user.img}`}
                                                         alt=""/>
                                                }

                                            </div>
                                            <h1>{blog.user.name}</h1>
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

export default SavedBlogs;
