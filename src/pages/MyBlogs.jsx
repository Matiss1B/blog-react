import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import Header from "../compoents/Header";
import {GrClose, GrSearch} from "react-icons/gr";
import Loader from "../compoents/Loading";

function MyBlogs() {
    const [data, setData] = useState(null);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setErrorToken] = useState(null);
    const [focus, setFocus] = useState(false);
    let [blog, setBlogs] = useState([]);
    const [column1Blogs, setColumn1Blogs] = useState([]);
    const [column2Blogs, setColumn2Blogs] = useState([]);
    const [column3Blogs, setColumn3Blogs] = useState([]);
    const [column4Blogs, setColumn4Blogs] = useState([]);
    useEffect(()=>{
        const fetchBlogs = async () => {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL_BACKEND}/api/v1/blogs?author=this`, {
                headers: {
                    "Authorization": sessionStorage.getItem("user"),
                }
            });
            setBlogs(response.data);
            setData(response.data);
            console.log(response);
        }
        fetchBlogs();

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
    const handleSearchClose = () =>{
        setSearch("");
        setFocus(false);
        setBlogs(data);
    }
    const handleSearch = (type) =>{
        if(data.length > 0) {
            if(type == "title") {
                const filteredBlogs = data.filter(unit =>
                    unit.title.toLowerCase().includes(search.toLowerCase())
                );
                setBlogs(filteredBlogs);

            }else{
                const filteredBlogs = data.filter(unit =>
                    unit.tags.some(tag => {
                        const tagLowerCase = tag.tag.toLowerCase();
                        const searchTextLowerCase = search.toLowerCase();
                        return tagLowerCase.includes(searchTextLowerCase);
                    })
                );

                setBlogs(filteredBlogs);
            }
            setFocus(false);
        }
    }

    // const handleSearch = event =>{
    //     if(data.length > 0) {
    //         setSearch(event.target.value);
    //         const filteredBlogs = data.filter(unit =>
    //             unit.title.toLowerCase().includes(event.target.value.toLowerCase())
    //         );
    //         setBlogs(filteredBlogs);
    //     }
    // }

    useEffect(() => {
        // Handle column assignments when 'blog' changes
        setColumn1Blogs([]);
        setColumn2Blogs([]);
        setColumn3Blogs([]);
        setColumn4Blogs([]);

        if(blog.length > 0) {
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
        }
    }, [blog]);

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
    const navigate = useNavigate();
    useEffect(() => {
        const data = {
            token: sessionStorage.getItem("user"),
        }
        axios.post(`${process.env.REACT_APP_BASE_URL_BACKEND}/api/v1/checkToken`, data, {
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
            <div className={'flex row-to-col'}>
                <Header/>
                <div className="App h-v pad3">
                    <h1>My blogs</h1>
                    <div className="blog-search-box w-100 flex middle">
                        <div className="search-box flex col">
                            <div className="flex gap1 center-y">
                                <GrSearch className={`icon`}/>
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(event) => {
                                        setSearch(event.target.value)
                                    }}
                                    className={`blog-search-input w-100`}
                                    onFocus={() => setFocus(true)}
                                />
                                <GrClose className={` ${search === "" ? "none" : "flex"} icon close-icon`}
                                         onClick={handleSearchClose}/>
                            </div>
                            {focus && search !== "" ?
                                <div className="search-options flex col gap1">
                                    <div className="flex center-y search-option gap05"
                                         onClick={() => handleSearch("title")}>
                                        <p className="search-title">{search}</p>
                                        <p className="search-category">Search title</p>
                                    </div>
                                    <div className="flex center-y search-option gap05"
                                         onClick={() => handleSearch("tag")}>
                                        <p className="search-title">{search}</p>
                                        <p className="search-category">Search #hashtag</p>
                                    </div>
                                </div>
                                :
                                ""
                            }
                        </div>
                    </div>
                    {Object.keys(blog).length > 0 ?
                        <div className="h-v flex blogs-list flex evenly wrap pad2">
                            <div id={`column-1`} className="column flex col gap1">
                                {column1Blogs.map((blog) => (
                                    <div className={` rel single-blog`}
                                         onMouseEnter={handleMouseDown}
                                         onMouseLeave={handleMouseUp}
                                         onClick={() => editBlog(blog.id)}
                                         style={{height: `20rem`}}
                                         key={blog.id}>
                                        <img className={`cover`}
                                             src={`${process.env.REACT_APP_BASE_URL_BACKEND}/storage/${blog.img}`}
                                             alt=""/>
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
                                                             src={`${process.env.REACT_APP_BASE_URL_BACKEND}/storage/${blog.user.img}`}
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
                                     style={{height: `20rem`}}
                                     key={blog.id}>
                                    <img className={`cover`} src={`${process.env.REACT_APP_BASE_URL_BACKEND}/storage/${blog.img}`} alt=""/>
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
                                                         src={`${process.env.REACT_APP_BASE_URL_BACKEND}/storage/${blog.user.img}`}
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
                                     style={{height: `20rem`}}
                                     key={blog.id}>
                                    <img className={`cover`} src={`${process.env.REACT_APP_BASE_URL_BACKEND}/storage/${blog.img}`} alt=""/>
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
                                                         src={`${process.env.REACT_APP_BASE_URL_BACKEND}/storage/${blog.user.img}`}
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
                                     style={{height: `20rem`}}
                                     key={blog.id}>
                                    <img className={`cover`} src={`${process.env.REACT_APP_BASE_URL_BACKEND}/storage/${blog.img}`} alt=""/>
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
                                                         src={`${process.env.REACT_APP_BASE_URL_BACKEND}/storage/${blog.user.img}`}
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
                        :
                        ""
                    }
                </div>
            </div>
        );
    }
    return null;
}

export default MyBlogs;
