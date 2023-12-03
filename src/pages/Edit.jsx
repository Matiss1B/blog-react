import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import Header from "../compoents/Header";
import Loader from "../compoents/Loading";
import {FaRegStickyNote} from "react-icons/fa";
import {MdEmail, MdTextSnippet} from "react-icons/md";
import {TbCategory2} from "react-icons/tb";
import {AiFillPhone, AiFillPlusCircle} from "react-icons/ai";
import {FiUpload} from "react-icons/fi";

function Edit() {
    let { id } = useParams();
    let [blog, setBlogs] = useState([]);
    const [data, setData] = useState(null);
    const [successMessage, setSuccess] =useState("");
    const [loading, setLoading] = useState(true);
    const [activeInput, setActiveInput] = useState(null);
    const [emailErr, setEmailErr] = useState("");
    const [titleErr, setTitleErr] = useState("");
    const [descErr, setDescErr] = useState("");
    const [categoryErr, setCategoryErr] = useState("");
    const [phoneErr, setPhoneErr] = useState("");
    const [imgErr, setImgErr] = useState("");
    const [error, setErrorToken] = useState(null);
    useEffect(()=>{
        axios.get("http://localhost/api/v1/blogs?id="+id,
            {
                headers:{
                "Authorization": sessionStorage.getItem("user"),
                }
            }).then(res => {
            const blogData = res.data[0];
            setTitle(blogData.title);
            setDescription(blogData.description);
            setCategory(blogData.category);
            setPhone(blogData.phone);
            setEmail(blogData.email);
            const img = document.createElement('img');
            img.className = 'cover';
            img.src = "http://localhost/storage/"+blogData.img;
            img.id = "blog-image"
            const div = document.getElementsByClassName('image-upload-box')[0];
            document.getElementById('img-upload-content').classList.add("none");
            // Append the image to the div
            div.appendChild(img);
        }).catch(err => handleErr(err.response.data));
    },[]);
    const [title, setTitle] = useState(``);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState();
    const [img, setImg] = useState([]);
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const handleErr = (err) =>{
        if(err.status == 401){
            navigate("/");
        }
    }
    const handleInputBoxClick = (event) => {
        const clickedInputBox = event.target.id;
        setActiveInput(clickedInputBox);
        console.log(activeInput);
    };
    const handleClick = (event) =>{
        event.preventDefault();
        const formData = new FormData();
        formData.append('id', id);
        formData.append('title', title);
        formData.append('description', description);
        formData.append('category', category);
        formData.append('img', img);
        axios.post('http://localhost/api/v1/edit', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': sessionStorage.getItem('user'),
            },
        }).then(res => console.log(res)).catch(err => console.log(err));
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
        setImg(event.target.files[0]);
        let file =  event.target.files[0]
        const src = URL.createObjectURL(file);
        const img = document.createElement('img');
        img.className = 'cover';
        img.src = src;
        img.id = "blog-image"
        const div = document.getElementsByClassName('image-upload-box')[0];
        document.getElementById('img-upload-content').classList.add("none");
        // Append the image to the div
        div.appendChild(img);
        console.log(event.target.files[0]);
    }
    const changeImg = () =>{
        document.getElementById('blog-image').remove();
        document.getElementById('img-upload-content').classList.remove("none");
        setImg([]);

    }
    const navigate = useNavigate();
    const [token, setCheck] = useState(false)
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
            <div className={"flex h-v"}>
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
                                <div className="flex gap2 2-100">
                                    <div
                                        className={`flex  input-box center-y between ${activeInput === 'title' ? 'active' : ''}`}
                                        onClick={handleInputBoxClick}>
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
                                            <p className="err">{titleErr === "" ? '' : titleErr}</p>
                                        </div>
                                        <div className="icon pad1">
                                            <MdTextSnippet className={`icon`}/>
                                        </div>
                                    </div>
                                    <div
                                        className={`flex  input-box center-y between ${activeInput === 'category' ? 'active' : ''}`}
                                        onClick={handleInputBoxClick}>
                                        <div className="flex col center-x">
                                            <label
                                                className={`font15 flex ${activeInput === 'category' ? 'active-label' : ''}`}>Category
                                                <p className={`${activeInput === 'category' ? 'active-label' : ''} required`}>*</p>
                                            </label>
                                            <input
                                                type="text"
                                                id="category"
                                                value={category}
                                                name="category"
                                                autoComplete="off"
                                                onChange={handleCategory}
                                            />
                                            <p className="err">{categoryErr === "" ? '' : categoryErr}</p>
                                        </div>
                                        <div className="icon pad1">
                                            <TbCategory2 className={`icon`}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap2 2-100">
                                    <div
                                        className={`flex  input-box center-y between ${activeInput === 'phone' ? 'active' : ''}`}
                                        onClick={handleInputBoxClick}>
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
                                    <div
                                        className={`flex  input-box center-y between ${activeInput === 'email' ? 'active' : ''}`}
                                        onClick={handleInputBoxClick}>
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
                                            <p className="err">{emailErr === "" ? '' : emailErr}</p>
                                        </div>
                                        <div className="icon pad1">
                                            <MdEmail className={`icon`}/>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className={`flex col  textarea-input-box gap1 ${activeInput === 'description' ? 'active' : ''}`}
                                    onClick={handleInputBoxClick}>
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
                                                onChange={handleDescription}
                                            >
                                                {description}
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
                                           className={`none`} name={`descriptionFile`}/>
                                    <p>Upload as file</p>
                                </div>
                                <div className="flex add-buttons w-100 gap2">
                                    <button id={`clear`} className={`w-100`}>Clear</button>
                                    <button id={`submit`} className={`w-100`} onClick={handleClick}>Submit</button>
                                </div>
                            </div>
                            <div className="image-section gap2 flex col w-100 ">
                                <h1 className={"subtitle hidden-mobile"}>Image upload</h1>
                                <p className={"flex required-text gap1 hidden-mobile"}>Upload to see image</p>
                                <p className="err font15">{imgErr === "" ? '' : imgErr}</p>
                                <div className="image-upload-box middle">
                                    <div id={`img-upload-content`} className="flex col center-y gap1">
                                        <input type="file" id="img" accept="image/*" className={`none`}
                                               onChange={handleImg}/>
                                        <label htmlFor="img">
                                            <AiFillPlusCircle className={`icon`}/>
                                        </label>
                                        <p>Upload an image</p>
                                    </div>
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
