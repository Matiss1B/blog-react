import React, {useEffect, useState} from 'react';
import Header from "../compoents/Header";
import {FaUser, FaEdit} from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { IoIosClose } from "react-icons/io";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import Loading from "../compoents/Loading";

const Profile = () => {
    const [profile, setProfile] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    const [openFollowers, setOpenFollowers] = useState(false);
    const [openFollowing, setOpenFollowing] = useState(false);

    useEffect(()=>{
        const fetchBlogs = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL_BACKEND}/api/v1/user/profile`, {
                    headers: {
                        "Authorization": sessionStorage.getItem("user"),
                    }
                });
                setProfile(response.data.profile);
                setBlogs(response.data.profile.blogs);
                setFollowers(response.data.profile.followers);
                setFollowing(response.data.profile.following)
            }catch (e) {
                console.log(e.response.status);
                if(e.response.status == 401){
                    navigate("/")
                }
            }
        }
        fetchBlogs();
    },[]);
    const navigate = useNavigate();
    const handleMouseUp = (event) => {
        const blogInfoElement = event.currentTarget.querySelector("#blog-info");
        // const blogEditElement = event.currentTarget.querySelector("#edit-section");
        if (blogInfoElement) {
            blogInfoElement.classList.add("none");
            // blogEditElement.classList.add("none");
        }
    };
    const handleMouseDown = (event) => {
        const blogInfoElement = event.currentTarget.querySelector("#blog-info");
        // const blogEditElement = event.currentTarget.querySelector("#edit-section");

        if (blogInfoElement) {
            blogInfoElement.classList.remove("none");
            // blogEditElement.classList.remove("none");

        }
    };
    const toggleFollow = async (id) => {
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

            const updatedFollowing = following.filter(
                (follower) => follower.user_id !== newFollower.user_id
            );
            setFollowing(updatedFollowing);


        } catch (e) {
            if(e.response.status == 401){
                navigate("/")
            }
        }
    };
    const removeFollow = async (id) => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_BASE_URL_BACKEND}/api/v1/follow/remove`,
                { follower_id: id },
                {
                    headers: {
                        "Authorization": sessionStorage.getItem("user"),
                    },
                }
            );

            console.log(response);

            const newFollower = response.data.follower;

            const updatedFollowers = followers.filter(
                (follower) => follower.user_id !== newFollower.user_id
            );
            setFollowers(updatedFollowers);


        } catch (e) {
            if(e.response.status == 401){
                navigate("/")
            }
        }
    };
    if(profile.length<1){
        return (
            <Loading/>
        )
    }

    return (
        <div className={'flex row-to-col'}>
            <Header/>
            <div className="App h-v pad2 flex center-x">
                {openFollowers && (
                    <>
                    <div className="overlay"></div>
                    <div className="popup flex col gap3">
                        <div className="followers-popup">
                            <div className="flex w-100 between center-y">
                                <h1 className="font25">Followers</h1>
                                <IoIosClose className="font45 pointer" onClick={()=>setOpenFollowers(false)}/>
                            </div>
                            <div className="flex w-100 follower-list gap1 col">
                                {followers.map((follower) => (
                                    <div className="follower flex center-y w-100 between" key={follower.user.id}>
                                        <div className="flex gap1 center-y" onClick={()=>navigate(`/profile/${follower.user.id}`)}>
                                            <div className="follower-img">
                                                <img
                                                    className="cover"
                                                    src={`${process.env.REACT_APP_BASE_URL_BACKEND}/storage/${follower.user.img}`}
                                                    alt=""/>
                                            </div>
                                            <p className="bold">
                                                {follower.user.name}
                                            </p>
                                        </div>
                                        <button onClick={()=>removeFollow(follower.user.id)}>Remove</button>
                                    </div>

                                ))}
                            </div>
                        </div>
                    </div>
                    </>

                )}
                {openFollowing && (
                    <>
                        <div className="popup flex col gap3">
                            <div className="followers-popup">
                                <div className="flex w-100 between center-y">
                                    <h1 className="font25">Following</h1>
                                    <IoIosClose className="font45 pointer" onClick={()=>setOpenFollowing(false)}/>
                                </div>
                                <div className="flex w-100 follower-list gap1 col">
                                    {following.map((unit) => (
                                        <div className="follower flex center-y w-100 between" key={unit.account.id}>
                                            <div className="flex gap1 center-y" onClick={()=>navigate(`/profile/${unit.account.id}`)}>
                                                <div className="follower-img">
                                                    <img
                                                        className="cover"
                                                        src={`${process.env.REACT_APP_BASE_URL_BACKEND}/storage/${unit.account.img}`}
                                                        alt=""/>
                                                </div>
                                                <p className="bold">
                                                    {unit.account.name}
                                                </p>
                                            </div>
                                            <button onClick={()=>toggleFollow(unit.account.id)}>Unfollow</button>
                                        </div>

                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="overlay"></div>
                    </>
                )}

                <div className="user-main-container flex col gap5">
                    <div className="flex w-100 center-x">
                        <div className="flex row-to-col center-y gap3 user-profile-info">
                            <div className="flex img-box">
                                {profile.img ?
                                    <img className="cover"
                                         src={`${process.env.REACT_APP_BASE_URL_BACKEND}/storage/${profile.img}`}
                                         alt=""/>
                                    :
                                    <FaUser/>
                                }
                            </div>
                            <div className="flex col center-x gap1">
                                <div className="flex w-100 center-y between">
                                    <p className="font35">{profile.name} {profile.surname}</p>
                                    <FaGear className="font25 pointer" onClick={() => navigate("/profile/settings")}/>
                                </div>
                                <div className="flex col gap1">
                                    <div className="flex gap1 center-y">
                                        <div className="flex center-y gap1">
                                            <p className="bold">{blogs.length}</p>
                                            <p>Posts</p>
                                        </div>
                                        <div className="flex center-y gap1 pointer" onClick={()=>{
                                                if(followers.length>0) {
                                                    setOpenFollowers(true)
                                                }
                                            }
                                        }>
                                            <p className="bold">{followers.length}</p>
                                            <p>Followers</p>
                                        </div>
                                        <div className="flex center-y gap1 pointer"
                                             onClick={()=>{
                                                 if(following.length>0) {
                                                     setOpenFollowing(true)
                                                 }
                                             }
                                             }
                                        >
                                            <p className="bold">{following.length}</p>
                                            <p>Following</p>
                                        </div>
                                    </div>
                                    <button className="follow-button" onClick={() => navigate("/add")}>
                                        Add new
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex col w-100 posts-main-container">
                        <h1 className="font25">Posts</h1>
                        <div className="flex w-100 accent-line"></div>
                        <div className="list pad1">
                            {blogs.map((blog) => (
                                <div className={`rel single-blog`}
                                     onMouseEnter={handleMouseDown}
                                     onMouseLeave={handleMouseUp}
                                     style={{height: '20rem'}}
                                >

                                    <img className={`cover`}
                                         onClick={()=>navigate(`/blog/${blog.id}`)}
                                         src={`${process.env.REACT_APP_BASE_URL_BACKEND}/storage/${blog.img}`}
                                         alt=""/>
                                    <div id={`blog-info`} className=" abs pad1 blog-info-box none center-y">
                                        <div className="flex w-100 between center-y">
                                            <h1 onClick={()=>navigate(`/blog/${blog.id}`)}>{blog.title}</h1>
                                            <div className=" edit-section pad05 center-y">
                                                <div className="flex gap2 center-y edit-icon">
                                                    <FaEdit className="font2 icon" onClick={()=>navigate(`/edit/${blog.id}`)}/>
                                                </div>
                                            </div>
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

export default Profile;