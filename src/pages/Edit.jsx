import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import Header from "../compoents/Header";
import Loader from "../compoents/Loading";
import LoaderRing from "../compoents/Loader";
import {FaHashtag, FaRegStickyNote} from "react-icons/fa";
import {MdEmail, MdTextSnippet} from "react-icons/md";
import {TbCategory2} from "react-icons/tb";
import {AiFillPhone, AiFillPlusCircle} from "react-icons/ai";
import {FiUpload} from "react-icons/fi";
import AOS from "aos";
import {IoClose} from "react-icons/io5";

function Edit() {
    const initialErrors = {
        title:[""],
        email:[""],
        description:[""],
        categoryErr:[""],
        phone:[""],
        img:[""],
    };
    let { id } = useParams();
    let [blog, setBlogs] = useState([]);
    const [data, setData] = useState(null);
    const [successMessage, setSuccess] =useState("");
    const [loading, setLoading] = useState(true);
    const [activeInput, setActiveInput] = useState(null);
    const [errors, setErrors] = useState(initialErrors);
    const [error, setErrorToken] = useState(null);
    const [hashtagValue, setHashtagValue] = useState('');
    const [hashtags, setHashtags] = useState([]);
    const [initialHashtags, setInitialHashtags] = useState([])
    useEffect(() => {
        AOS.init();
        axios.get(`${process.env.REACT_APP_BASE_URL_BACKEND}/api/v1/blog/for/edit?id=`+id,
            {
                headers:{
                    "Authorization": sessionStorage.getItem("user"),
                }
            }).then(res => {
                console.log(res)
            const blogData = res.data[0];
            const tags = blogData.tags.map(tag => tag.tag);
            setHashtags(tags)
            setInitialHashtags(tags);
            setTitle(blogData.title);
            setDescription(blogData.description);
            setCategory(blogData.category);
            setPhone(blogData.phone);
            setEmail(blogData.email);
           setImg(blogData.img);
        }).catch(err => handleErr(err.response.data));
    }, [id]);

    const [title, setTitle] = useState(``);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState();
    const [img, setImg] = useState(null);
    const [loader,setLoader] = useState(false);
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [changedImg, setChangedImg] = useState(false);
    const [deleteConfirmation, setDeleteConfirmation] = useState(false)
    const handleErr = (err) =>{
        if(err.status == 401){
            navigate("/");
        }
        if(err.type && err.type == "owner"){
            navigate("/error");
        }
    }
    const handleInputChange = (e) => {
        setHashtagValue(e.target.value);
    };

    const handleKeyPress = (e) => {
        if ((e.key === ' ' || e.key === 'Enter') && hashtagValue.trim() !== '') {
            setHashtags([...hashtags, hashtagValue.trim()]);
            setHashtagValue('');
        }
    };

    const handleRemoveItem = (index) => {
        const newItems = [...hashtags];
        newItems.splice(index, 1);
        setHashtags(newItems);
    };
    const handleInputBoxClick = (id) => {
        setActiveInput(id);
        const element = document.getElementById(id);
        if (element) {
            element.focus();
        }
    };
    const handleClick = (event) =>{
        setLoader(true);
        setSuccess("");
        setErrors(initialErrors)
        if(changedImg && !img){
            setErrors(prevState => ({
                ...prevState,
                img: ["The img field is required"]
            }));
            setLoader(false);
            return false;
        }
        event.preventDefault();
        const formData = new FormData();
        formData.append('id', id);
        formData.append('title', title);
        formData.append('description', description);
        formData.append('category', category);
        formData.append('img', img);
        if(initialHashtags !== hashtags) {
            formData.append("tags", hashtags);
        }
        axios.post(`${process.env.REACT_APP_BASE_URL_BACKEND}/api/v1/blog/edit`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': sessionStorage.getItem('user'),
            },
        }).then(res => {
            console.log(res);
            setSuccess(res.data.message);
            setTimeout(() => {
                const box = document.getElementById('success-pop-up');

                box.style.transform = 'translateX(200%)';
                box.style.transition = '.7s';


            }, 2000);
        }
        )
            .catch(err => handleErrors(err));
        setLoader(false);

    }
    const handleErrors = (err) => {
        if(err.response.status == 422) {
            setErrors(prevState => ({
                ...prevState,
                ...err.response.data.errors
            }));
            // if (Object.keys(err.response.data.errors).length>0) {
            //     const errorData = err.errors;
            //     const errorMappings = {
            //         title: setTitleErr,
            //         email: setEmailErr,
            //         description: setDescErr,
            //         phone: setPhoneErr,
            //         img:setImgErr,
            //         category:setCategoryErr,
            //     };
            //
            //     for (let key in errorData) {
            //         if (key in errorMappings) {
            //             errorMappings[key](errorData[key]);
            //         }
            //     }
            // }
        }
        console.log(err.response);
    };

    const deleteBlog = () =>{
        setSuccess("");
        setErrors(initialErrors);
        axios.get(`${process.env.REACT_APP_BASE_URL_BACKEND}/api/v1/blog/delete/${id}`, {
            headers: {
                "Authorization": sessionStorage.getItem("user"),
            },
        }, ).then(res => {
                setDeleteConfirmation(false)
                setSuccess(res.data.message);
                setTimeout(() => {
                    const box = document.getElementById('success-pop-up');

                    box.style.transform = 'translateX(200%)';
                    box.style.transition = '.7s';
                    navigate("/profile/blogs")
                }, 2000);
            }
        ).catch(err => console.log(err));
    }

    const handleTitle = event =>{
        setTitle(event.target.value);
    }
    const handleDescription = event =>{
        setDescription(event.target.value);
    }
    const  handleCategory = event =>{
        setCategory(event.target.value);
    }
    const handleEmail = event =>{
        setEmail(event.target.value);
    }
    const  handlePhone = event =>{
        setPhone(event.target.value);
    }
    const handleImg = event =>{
        let maxSize = 1.9 * 1024 * 1024
        setErrors(initialErrors);
        if(!event.target.files[0]){
            return false
        }
        if(event.target.files[0].size > maxSize){
            setErrors(prevState => ({
                ...prevState,
                img: ["Max size is 1.9mb"]
            }));
            return false;
        }
        setImg(event.target.files[0]);
    }
    const changeImg = () =>{
        setChangedImg(true);
        setImg(null);

    }
    const navigate = useNavigate();
    const [token, setCheck] = useState(false)
    const handleCategoryBlur = () => {
        // Add validation logic here if needed
        // For example, you can check if the selected category is valid
        if (!category) {
            setErrors(prevState => ({
                ...prevState,
                category: ["Category is required"]
            }));
        } else {
            setErrors(prevState => ({
                ...prevState,
                category: [""]
            }));
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL_BACKEND}/api/v1/categories/get`,
                    {
                        headers:{
                            Authorization: sessionStorage.getItem("user"),
                        }
                    }
                );
                const status = response.data.status;
                const responseData = response.data;
                if (status === 200) {
                    setLoading(false);
                    setData(responseData.categories);
                }
                if (status === 300) {
                    // Handle status 300
                }
            } catch (error) {
                if(error.response.data.status == 422){
                    navigate("/");
                }
            }
        };

        fetchData(); // Call the fetchData function

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
            <div className={"flex row-to-col h-v"}>
                {deleteConfirmation
                    ?
                    <>
                <div className="overlay"></div>
                <div className="popup between flex col gap3">
                    <div className="flex col">
                        <h2>Are you sure you want do delete blog?</h2>
                        <p>If you agree, it will be deleted permanently</p>
                    </div>
                    <div className="flex w-100 center-y gap2">
                        <button className={"cancel shadow-light"} onClick={()=>{setDeleteConfirmation(false)}}>Cancel</button>
                        <button className={"delete shadow-light"} onClick={deleteBlog}>Delete</button>
                    </div>
                </div>
                </>
                    :
                    ""
                }
                <Header/>
                <div className="App h-100vh w-100 pad3">
                    {successMessage !== ""
                        ?
                        <div id="success-pop-up" className={`success-pop-up flex gap2 center-y pad2`}>
                            <FaRegStickyNote className={'icon'}/>
                            <div className="text-message center-x flex col">
                                <h1>{successMessage}</h1>
                            </div>
                        </div>
                        :
                        ""
                    }

                    <div className="main-add-box flex gap1 col h-100vh w-100 pa2">
                        <div className="title-section flex col gap1">
                            <div className="flex center-y gap1">
                                <h1>Edit your</h1>
                                <h1 className={`accent-color hidden-mobile`}>Blog</h1>
                            </div>
                            <p className={"flex gap1"}>Pen your journey, inspire hearts, and leave a mark forever</p>
                        </div>
                        <div className="add-wrap-box flex   gap3 pad2 w-100">
                            <div className="flex col gap2 w-100 add-input-box ">
                                <h1 className={"subtitle hidden-mobile"}>Blog info</h1>
                                <p className={"flex required-text gap1 hidden-mobile"}>All required fields will be
                                    marked with <p className={`required`}>*</p></p>
                                <div className="input-section flex gap1 w-100">
                                    <div className="width-box w-50">
                                        <div
                                            className={`flex  input-box center-y between ${activeInput === 'title' ? 'active' : ''}`}
                                            onClick={() => {
                                                handleInputBoxClick("title")
                                            }}>
                                            <div className="flex col center-x">
                                                <label
                                                    className={`font15 flex ${activeInput === 'title' ? 'active-label' : ''}`}>Title
                                                    <p className={`${activeInput === 'title' ? 'active-label' : ''} required`}>*</p>
                                                </label>
                                                <input
                                                    type="text"
                                                    id="title"
                                                    name="title"
                                                    value={title}
                                                    autoComplete="off"
                                                    onChange={handleTitle}
                                                />
                                                {errors.title && (
                                                    <p className="err">{errors.title[0]}</p>
                                                )}
                                            </div>
                                            <div className="icon pad1">
                                                <MdTextSnippet className={`icon`}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="width-box w-50">
                                        <div
                                            className={`flex input-box center-y between ${activeInput === 'category' ? 'active' : ''}`}
                                            onClick={() => {
                                                handleInputBoxClick("category")
                                            }}
                                        >
                                            <div className="flex col center-x">
                                                <label
                                                    className={`font15 flex ${activeInput === 'category' ? 'active-label' : ''}`}
                                                >
                                                    Category
                                                    <p className={`${activeInput === 'category' ? 'active-label' : ''} required`}>*</p>
                                                </label>
                                                <select
                                                    id="category"
                                                    name="category"
                                                    value={category}
                                                    autoComplete="off"
                                                    onChange={handleCategory}
                                                    onBlur={handleCategoryBlur}
                                                >
                                                    <option value="" disabled>Select a category</option>
                                                    {data.map((category) => (
                                                        <option value={category.category}>{category.category}</option>
                                                    ))}
                                                </select>
                                                {errors.category && (
                                                    <p className="err">{errors.category[0]}</p>
                                                )}
                                            </div>
                                            <div className="icon pad1">
                                                <TbCategory2 className={`icon`}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="input-section flex gap1 w-100">
                                    <div className="width-box w-50">
                                        <div
                                            className={`flex  input-box center-y between ${activeInput === 'phone' ? 'active' : ''}`}
                                            onClick={() => {
                                                handleInputBoxClick("phone")
                                            }}>
                                            <div className="flex col center-x">
                                                <label
                                                    className={`font15 ${activeInput === 'phone' ? 'active-label' : ''}`}>Phone</label>
                                                <input
                                                    type="number"
                                                    id="phone"
                                                    name="phone"
                                                    value={phone}
                                                    autoComplete="off"
                                                    onChange={handlePhone}
                                                />
                                                {errors.phone && (
                                                    <p className="err">{errors.phone[0]}</p>
                                                )}
                                            </div>
                                            <div className="icon pad1">
                                                <AiFillPhone className={`icon`}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="width-box w-50">
                                        <div
                                            className={`flex  input-box center-y between ${activeInput === 'email' ? 'active' : ''}`}
                                            onClick={() => {
                                                handleInputBoxClick("email")
                                            }}>
                                            <div className="flex col center-x">
                                                <label
                                                    className={`font15 ${activeInput === 'email' ? 'active-label' : ''}`}>Email</label>
                                                <input
                                                    type="text"
                                                    id="email"
                                                    value={email}
                                                    name="email"
                                                    autoComplete="off"
                                                    onChange={handleEmail}
                                                />
                                                {errors.email && (
                                                    <p className="err">{errors.email[0]}</p>
                                                )}
                                            </div>
                                            <div className="icon pad1">
                                                <MdEmail className={`icon`}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="input-section flex gap1 w-100">
                                    <div className="width-box w-100">
                                        <div
                                            className={`flex  input-box center-y between ${activeInput === 'tag' ? 'active' : ''}`}
                                            onClick={() => {
                                                handleInputBoxClick("tag")
                                            }}>
                                            <div className="flex col center-x">
                                                <label
                                                    className={`font15 ${activeInput === 'tag' ? 'active-label' : ''}`}>Add
                                                    hashtags</label>
                                                <input
                                                    id="tag"
                                                    type="text"
                                                    value={hashtagValue}
                                                    onChange={handleInputChange}
                                                    onKeyPress={handleKeyPress}
                                                />
                                                <div className="flex w-100 wrap gap1 center-y pad1">
                                                    {hashtags.map((item, index) => (
                                                        <div className={"flex center-y gap05 hashtag-unit"} key={index}>
                                                            <p>
                                                                #{item}
                                                            </p>
                                                            <IoClose className="icon"
                                                                     onClick={() => handleRemoveItem(index)}/>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="icon pad1">
                                                <FaHashtag className={`icon`}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className={`flex col  textarea-input-box gap1 ${activeInput === 'description' ? 'active' : ''}`}
                                    onClick={() => {
                                        handleInputBoxClick("description")
                                    }}>
                                    <div className="flex between w-100">
                                        <div className="flex col center-x">
                                            <label
                                                className={`font15 flex ${activeInput === 'description' ? 'active-label' : ''}`}>Description
                                                <p className={`${activeInput === 'description' ? 'active-label' : ''} required`}>*</p>
                                            </label>
                                            <textarea
                                                id="description"
                                                name="description"
                                                autoComplete="off"
                                                value={description}

                                                onChange={handleDescription}
                                            >
                                        </textarea>
                                            {errors.description && (
                                                <p className="err">{errors.description[0]}</p>
                                            )}
                                        </div>
                                        <div className="icon pad1">
                                            <MdTextSnippet className={`icon`}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="docs-upload-box flex center-y gap1">

                                    <label htmlFor="descriptionFile">
                                        <FiUpload className={`icon`}/>
                                    </label>
                                    <input id="descriptionFile" type="file" accept=".doc,.docx,.txt,.pdf"
                                           className={`none`} name={`descriptionFile`}/>
                                    <p>Upload as file</p>
                                </div>
                                <div className="flex add-buttons w-100 gap2">
                                    <button id={`clear`} className={`w-100`}
                                            onClick={() => setDeleteConfirmation(true)}>Delete
                                    </button>
                                    <button id={`submit`} className={`w-100`} onClick={handleClick}>{loader ?
                                        <LoaderRing/> : "Submit"}</button>
                                </div>
                            </div>
                            <div className="image-section gap2 flex col w-100 ">
                                <h1 className={"subtitle hidden-mobile"}>Image upload</h1>
                                <p className={"flex required-text gap1 hidden-mobile"}>Upload to see image</p>
                                {errors.img && (
                                    <p className="err font15">{errors.img[0]}</p>
                                )}
                                <div className="image-upload-box middle">
                                    {!img ?
                                        <div id={`img-upload-content`} className="flex col center-y gap1">
                                            <input type="file" id="img" accept=".jpeg,.jpg,.png" className={`none`}
                                                   onChange={handleImg}/>
                                            <label htmlFor="img">
                                                <AiFillPlusCircle className={`icon`}/>
                                            </label>
                                            <p>Upload an image</p>
                                        </div>
                                        :
                                        <img
                                            src={changedImg ? URL.createObjectURL(img) : `${process.env.REACT_APP_BASE_URL_BACKEND}/storage/${img}`}
                                            className="w-100 h-100 cover"
                                        />
                                    }
                                </div>
                                <button onClick={changeImg}>Change Image</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return null;
}

export default Edit;
