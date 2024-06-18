import React, {useEffect, useState} from 'react';
import Header from "../compoents/Header";
import {FaUser} from "react-icons/fa";
import axios from "axios";
import Loading from "../compoents/Loading";
import {useNavigate, useParams} from "react-router-dom";
import LoaderRing from "../compoents/Loader";

const UserProfile = () => {
    const {id} = useParams();
    const [profile, setProfile] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    const [isFollower, setIsFollower] = useState(false);
    const [imageLoading, setImageLoading] = useState({});

    const navigate = useNavigate();
    useEffect(()=>{
        const fetchBlogs = async () => {
            try {
                const response = await axios.post(`${process.env.REACT_APP_BASE_URL_BACKEND}/api/v1/user/account`, {account_id: id}, {
                    headers: {
                        "Authorization": sessionStorage.getItem("user"),
                    }
                });
                if(response.data.user == response.data.profile.id){
                    navigate('/profile');
                }
                setIsFollower(response.data.isFollower);
                setProfile(response.data.profile);
                setBlogs(response.data.profile.blogs);
                setFollowers(response.data.profile.followers);
                setFollowing(response.data.profile.following)
                const loadingState = response.data.profile.blogs.reduce((acc, blog) => {
                    acc[blog.id] = true;
                    return acc;
                }, {});
                setImageLoading(loadingState);
            }catch (e) {
                if(e.response.status == 300 && e.response.data.error){
                    navigate("/error");
                }
                if(e.response.status == 401){
                    navigate("/")
                }
            }
        }
        fetchBlogs();

    },[]);
    const handleImageLoad = (id) => {
        setImageLoading((prevState) => ({ ...prevState, [id]: false }));
    };
    const toggleFollow = async () => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_BASE_URL_BACKEND}/api/v1/follow/toggle`,
                { account_id: id },
                {
                    headers: {
                        "Authorization": sessionStorage.getItem("user"),
                    },
                }
            );

            console.log(response);

            const newFollower = response.data.follower;

            if (!isFollower) {
                setFollowers((prevState) => {
                    return [...prevState, newFollower];
                });
            } else {
                const updatedFollowers = followers.filter(
                    (follower) => follower.user_id !== newFollower.user_id
                );
                setFollowers(updatedFollowers);
            }

            setIsFollower(!isFollower);
        } catch (e) {
            if(e.response.status == 401){
                navigate("/")
            }
        }
    };
    const handleMouseUp = (event) => {
        const blogInfoElement = event.currentTarget.querySelector("#blog-info");
        if (blogInfoElement) {
            blogInfoElement.classList.add("none");
        }
    };
    const handleMouseDown = (event) => {
        const blogInfoElement = event.currentTarget.querySelector("#blog-info");
        if (blogInfoElement) {
            blogInfoElement.classList.remove("none");
        }
    };
    if(profile.length<1){
        return <Loading/>
    }
    return (
        <div className={'flex row-to-col'}>
            <Header/>
            <div className="App h-v pad2 flex center-x">
                <div className="user-main-container flex col gap5">
                    <div className="flex w-100 center-x">
                        <div className="flex row-to-col center-y gap3 user-profile-info">
                            <div className="flex img-box">
                                {profile.img ?
                                <img className="cover" src={`${process.env.REACT_APP_BASE_URL_BACKEND}/storage/${profile.img}`} alt=""/>
                                    :
                                    <FaUser/>
                                }
                            </div>
                            <div className="flex col center-x gap1">
                                <p className="font35">{profile.name} {profile.surname}</p>
                                <div className="flex col gap1">
                                    <div className="flex gap1 center-y">
                                        <div className="flex center-y gap1"><p className="bold">{blogs.length}</p> <p>Posts</p></div>
                                        <div className="flex center-y gap1"><p className="bold">{followers.length}</p> <p>Followers</p></div>
                                        <div className="flex center-y gap1"><p className="bold">{following.length}</p> <p>Following</p></div>
                                    </div>
                                    <button className="follow-button" onClick={toggleFollow}>
                                        {isFollower
                                            ?
                                            "Following"
                                            :
                                            "Follow"
                                        }
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex col w-100 posts-main-container">
                        <h1 className="font25">Posts</h1>
                        <div className="flex w-100 accent-line"></div>
                        <div className="list pad1">
                            {blogs.map((blog)=> (
                                <div className={`rel single-blog`}
                                     key={blog.id}
                                    onMouseEnter={handleMouseDown}
                                    onMouseLeave={handleMouseUp}
                                     onClick={() => navigate(`/blog/${blog.id}`)}
                                     style={{height: '20rem'}}
                                >
                                    {imageLoading[blog.id] === true && (
                                        <div className="img-profile-loader abs flex middle">
                                            <LoaderRing/>
                                        </div>
                                    )}
                                    <img className={`cover`}
                                         src={`${process.env.REACT_APP_BASE_URL_BACKEND}/storage/${blog.img}`}
                                         onLoad={()=>handleImageLoad(blog.id)}
                                         alt=""/>
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

        </div>
    );
};

export default UserProfile;