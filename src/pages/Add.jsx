import React, {useEffect, useState} from "react";
import axios from "axios";
import {MdTextSnippet, MdEmail} from "react-icons/md";
import {TbCategory2} from "react-icons/tb"
import {FiUpload} from "react-icons/fi"
import { IoClose } from "react-icons/io5";
import {FaRegStickyNote, FaHashtag} from "react-icons/fa";
import {AiFillPlusCircle, AiFillPhone} from "react-icons/ai"
import Header from "../compoents/Header";
import {useNavigate} from "react-router-dom";
import Loader from "../compoents/Loading";
import LoaderRing from "../compoents/Loader";
function App() {
    const [title, setTitle] = useState('');
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setErrorToken] = useState(null);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [doc, setDoc] = useState([]);
    const [activeInput, setActiveInput] = useState(null);
    const [img, setImg] = useState(null);
    const navigate = useNavigate();
    const [loader,setLoader] = useState(false);
    const [token, setCheck] = useState("No");
    //Errors
    const [emailErr, setEmailErr] = useState("");
    const [titleErr, setTitleErr] = useState("");
    const [descErr, setDescErr] = useState("");
    const [categoryErr, setCategoryErr] = useState("");
    const [phoneErr, setPhoneErr] = useState("");
    const [imgErr, setImgErr] = useState("");
    //Message
    const [successMessage, setSuccess] =useState("");

    const handleInputBoxClick = (id) => {
        setActiveInput(id);
        const element = document.getElementById(id);
        if (element) {
            element.focus();
        }
    };
    const [hashtagValue, setHashtagValue] = useState('');
    const [hashtags, setHashtags] = useState([]);

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
    const setError = (key, error) => {
        if(key === "title"){
            setTitleErr(error);
        }
        if(key === "email"){
            setEmailErr(error);
        }
        if(key === "description"){
            setDescErr(error);
        }
        if(key === "phone"){
            setPhoneErr(error);
        }
        if(key === "img"){
            setImgErr(error);
        }
        if(key === "category"){
            setCategoryErr(error);
        }
    }
    const handleClick = () =>{
        if(loader){
            return null
        }
        setLoader(true);
        setSuccess("");
        setTitleErr("");
        setEmailErr("");
        setDescErr("");
        setPhoneErr("");
        setImgErr("");
        setCategoryErr("");
        var formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("phone", phone);
        formData.append("email", email);
        formData.append("category", category);
        formData.append("descriptionfile", doc);
        if(hashtags.length>0){
            formData.append("tags", hashtags.join(","))
        }
        if(img) {
            formData.append("img", img);
        }
        axios.post(`${process.env.REACT_APP_BASE_URL_BACKEND}/api/v1/create`,formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": sessionStorage.getItem("user"),
            },
        }, ).then(res => confirmSubmit(res)).catch(err => handleErrors(err.response.data));
    }
    const handleErrors = (err) => {
        setLoader(false);
        if (Object.keys(err.errors).length>0) {
            const errorData = err.errors;
            const errorMappings = {
                title: setTitleErr,
                email: setEmailErr,
                description: setDescErr,
                phone: setPhoneErr,
                img:setImgErr,
                category:setCategoryErr,
            };

            for (let key in errorData) {
                if (key in errorMappings) {
                    errorMappings[key](errorData[key]);
                }
            }
        }
        console.log(err);
    };

    const confirmSubmit = (results) => {
        setLoader(false);
        if(results.status == 200){
            setSuccess(results.data.message);
            setTitle("");
            setHashtags([]);
            setEmail("");
            setDescription("");
            setPhone("");
            setCategory("");
            changeImg();
            setTimeout(() => {
                const box = document.getElementById('success-pop-up');

                box.style.transform = 'translateX(200%)';
                box.style.transition = '.7s';


            }, 2000)
        }
        console.log(results);
    }
    const handleTitle = event =>{
        setTitle(event.target.value);
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
    const handleDescription = event =>{
        setDescription(event.target.value);
    }
    const handleDocs = event =>{
        setDoc(event.target.files[0]);
        console.log(event.target.files[0]);
    }
    const handleImg = event =>{
        let maxSize = 1.9 * 1024 * 1024
        setImgErr("");
        if(!event.target.files[0]){
            return false
        }
        if(event.target.files[0].size > maxSize){
            setImgErr("Max size 1.9mb");
            return false;
        }
        setImg(event.target.files[0]);
    }
    const changeImg = () =>{
          setImg(null);

    }
    const handleCategoryBlur = () => {
        if (!category) {
            setCategoryErr('Category is required');
        } else {
            setCategoryErr('');
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
                if(error.response.data.status == 401 || error.response.status == 401){
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
                <Header/>
                <div className="App h-100vh w-100 pad3">
                    {successMessage !== ""
                        ?
                        <div id="success-pop-up" className={`success-pop-up flex gap2 center-y pad2`}>
                            <FaRegStickyNote className={'icon'}/>
                            <div className="text-message center-x flex col">
                                <h1>{successMessage}</h1>
                                <p>You can see it in My Profile/My Blogs</p>
                            </div>
                        </div>
                        :
                        ""
                    }

                    <div className="main-add-box flex gap1 col h-100vh w-100 pa2">
                        <div className="title-section flex col gap1">
                            <div className="flex center-y gap1">
                                <h1>Create your own</h1>
                                <h1 className={`accent-color hidden-mobile`}>content</h1>
                            </div>
                            <p className={"flex gap1"}>Pen your journey, inspire hearts, and leave a mark forever</p>
                        </div>
                        <div className="add-wrap-box flex gap2 pad1 w-100">
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
                                                    value={title}
                                                    name="title"
                                                    autoComplete="off"
                                                    onChange={handleTitle}
                                                />
                                                <p className="err">{titleErr === "" ? '' : titleErr}</p>
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
                                                <p className="err">{categoryErr}</p>
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
                                                <p className="err">{phoneErr === "" ? '' : phoneErr}</p>
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
                                                    name="email"
                                                    value={email}
                                                    autoComplete="off"
                                                    onChange={handleEmail}
                                                />
                                                <p className="err">{emailErr === "" ? '' : emailErr}</p>
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
                                                            <IoClose className="icon" onClick={() => handleRemoveItem(index)}/>
                                                        </div>
                                                    ))}
                                                </div>
                                                <p className="err">{phoneErr === "" ? '' : phoneErr}</p>
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
                                                value={description}
                                                autoComplete="off"
                                                onChange={handleDescription}
                                            >
                                        </textarea>
                                            <p className="err">{descErr === "" ? '' : descErr}</p>
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
                                           className={`none`} name={`descriptionFile`} onChange={handleDocs}/>
                                    <p>Upload as file</p>
                                </div>
                                <div className="flex add-buttons w-100 gap2">
                                    <button id={`submit`} className={`w-100`} onClick={handleClick}>{loader ?
                                        <LoaderRing/> : "Submit"}</button>
                                </div>
                            </div>
                            <div className="image-section gap2 flex col w-100 ">
                                <h1 className={"subtitle hidden-mobile"}>Image upload</h1>
                                <p className={"flex required-text gap1 hidden-mobile"}>Upload to see image</p>
                                <p className="err font15">{imgErr === "" ? '' : imgErr}</p>
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
                                        <img src={URL.createObjectURL(img)} className="cover w-100 w-100" alt=""/>
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

export default App;
