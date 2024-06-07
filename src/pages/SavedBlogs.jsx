import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../compoents/Header";
import { GrClose, GrSearch } from "react-icons/gr";
import { FaUser } from "react-icons/fa";
import Loader from "../compoents/Loading";
import { FaRegArrowAltCircleLeft, FaRegArrowAltCircleRight } from "react-icons/fa";
import {IoMdInformationCircleOutline} from "react-icons/io";
import LoaderRing from "../compoents/Loader";


function SavedBlogs() {
    const [data, setData] = useState(null);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setErrorToken] = useState(null);
    const [focus, setFocus] = useState(false);
    const [blog, setBlogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [imageLoading, setImageLoading] = useState({});
    const blogsPerPage = 9;
    const navigate = useNavigate();


    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL_BACKEND}/api/v1/blog/get/all/saved`, {
            headers: {
                "Authorization": sessionStorage.getItem("user"),
            }
        }).then(res => {
            setBlogs(res.data);
            setData(res.data);
            setLoading(false);
            const loadingState = res.data.reduce((acc, blog) => {
                acc[blog.id] = true;
                return acc;
            }, {});
            setImageLoading(loadingState);
        }).catch(err => handleErr(err.response.data));
    }, []);

    const handleMouseDown = (event) => {
        const blogAuthorElement = event.currentTarget.querySelector("#blog-author");
        const blogInfoElement = event.currentTarget.querySelector("#blog-info");
        if (blogAuthorElement && blogInfoElement) {
            blogAuthorElement.classList.remove("none");
            blogInfoElement.classList.remove("none");
        }
    };

    const handleErr = (err) => {
        if (err.status === 401) {
            navigate("/");
        }
    };

    const handleSearchClose = () => {
        setSearch("");
        setFocus(false);
        setBlogs(data);
    };

    const handleSearch = (type) => {
        if (data.length > 0) {
            let filteredBlogs = [];
            if (type === "title") {
                filteredBlogs = data.filter(unit =>
                    unit.title.toLowerCase().includes(search.toLowerCase())
                );
            } else {
                filteredBlogs = data.filter(unit =>
                    unit.tags.some(tag => {
                        const tagLowerCase = tag.tag.toLowerCase();
                        const searchTextLowerCase = search.toLowerCase();
                        return tagLowerCase.includes(searchTextLowerCase);
                    })
                );
            }
            setBlogs(filteredBlogs); // Update the original blog state
            setCurrentPage(1); // Reset the current page to the first page
        }
    };
    const handleImageLoad = (id) => {
        setImageLoading((prevState) => ({ ...prevState, [id]: false }));
    };

    const openBlog = (id) => {
        navigate(`/blog/${id}`);
    };

    const handleMouseUp = (event) => {
        const blogAuthorElement = event.currentTarget.querySelector("#blog-author");
        const blogInfoElement = event.currentTarget.querySelector("#blog-info");
        if (blogAuthorElement && blogInfoElement) {
            blogAuthorElement.classList.add("none");
            blogInfoElement.classList.add("none");
        }
    };

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

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const paginate = (blogs) => {
        const startIndex = (currentPage - 1) * blogsPerPage;
        const endIndex = startIndex + blogsPerPage;
        return blogs.slice(startIndex, endIndex);
    };

    if (loading) {
        return <Loader />;
    }
    if (error) {
        // Redirect to another page if there's an error
        return navigate("/");
    }
    const paginatedBlogs = paginate(blog);

    return (
        <div className={'flex row-to-col'}>
            <Header />
            <div className="App h-v pad3">
                <h1>Saved</h1>
                <div className="blog-search-box flex col middle">
                    <div className="search-box flex col">
                        <div className="flex gap1 center-y">
                            <GrSearch className={`icon`} />
                            <input
                                type="text"
                                value={search}
                                onChange={(event) => {
                                    if (event.target.value === "") {
                                        setBlogs(data);
                                    }
                                    setSearch(event.target.value);
                                }}
                                className={`blog-search-input w-100`}
                                onFocus={() => setFocus(true)}
                            />
                            <GrClose className={` ${search === "" ? "none" : "flex"} icon close-icon`}
                                     onClick={handleSearchClose} />
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
                            : ""
                        }
                    </div>
                </div>
                {paginatedBlogs.length<1
                    ?
                    <div className="no-results flex center-y gap2">
                        <IoMdInformationCircleOutline className={"icon"}/>
                        <p>There is not saved blogs</p>
                    </div>
                    :
                    <div className="blogs-list-parent w-100">
                        <div className="blogs-list">
                        {
                            paginatedBlogs.map((blog) => (
                                <div className={`rel single-blog`}
                                     onMouseEnter={handleMouseDown}
                                     onMouseLeave={handleMouseUp}
                                     onClick={() => openBlog(blog.id)}
                                     style={{ height: '20rem' }}
                                     key={blog.id}
                                >
                                    {imageLoading[blog.id] === true && (
                                        <div className="img-loader abs flex middle">
                                            <LoaderRing/>
                                        </div>
                                    )}
                                    <img className={`cover`}
                                         onLoad={()=>{handleImageLoad(blog.id)}}
                                         src={`${process.env.REACT_APP_BASE_URL_BACKEND}/storage/${blog.img}`} alt=""
                                    />
                                    <div id={`blog-author`} className="abs pad1 blog-author-box none center-y pointer" onClick={()=>{navigate(`/profile/${blog.user.id}`)}}>
                                        <div className="flex w-100 gap2 center-y">
                                            <div className="profile-icon green flex center-y center-x">
                                                {blog.user.img === ""
                                                    ? <FaUser />
                                                    : <img className={`cover`}
                                                           src={`${process.env.REACT_APP_BASE_URL_BACKEND}/storage/${blog.user.img}`}
                                                           alt="" />
                                                }
                                            </div>
                                            <h1>{blog.user.name}</h1>
                                        </div>
                                    </div>
                                    <div id={`blog-info`} className="abs pad1 blog-info-box none center-y">
                                        <div className="flex w-100 gap2 center-y">
                                            <h1>{blog.title}</h1>
                                        </div>
                                    </div>
                                </div>
                            ))

                        }
                    </div>
                    </div>
                }
                {paginatedBlogs.length>0 && (
                    <div className="pagination flex center">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            className={`pagination-btn ${currentPage === 1 ? 'disabled' : ''}`}
                            disabled={currentPage === 1}
                        >
                            <FaRegArrowAltCircleLeft
                                className={currentPage === Math.ceil(blog.length / blogsPerPage) ? 'font25' : 'icon'}/>
                        </button>
                        {Array.from({length: Math.ceil(blog.length / blogsPerPage)}, (_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => handlePageChange(index + 1)}
                                className={`pagination-btn ${currentPage === index + 1 ? 'active' : ''}`}
                            >
                                <p className="number">{index + 1}</p>
                            </button>
                        ))}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            className={`pagination-btn ${currentPage === Math.ceil(blog.length / blogsPerPage) ? 'disabled' : ''}`}
                            disabled={currentPage === Math.ceil(blog.length / blogsPerPage)}
                        >
                            <FaRegArrowAltCircleRight
                                className={currentPage === Math.ceil(blog.length / blogsPerPage) ? 'font25' : 'icon'}/>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SavedBlogs;
