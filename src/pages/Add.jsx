import React, {useState} from "react";
import axios from "axios";
import {MdTextSnippet, MdEmail} from "react-icons/md";
import {TbCategory2} from "react-icons/tb"
import {AiFillPlusCircle, AiFillPhone} from "react-icons/ai"
import Header from "../compoents/Header";
function App() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [activeInput, setActiveInput] = useState(null);
    const [img, setImg] = useState([]);

    const handleInputBoxClick = (event) => {
        const clickedInputBox = event.target.id;
        setActiveInput(clickedInputBox);
        console.log(activeInput);
    };
    const handleClick = () =>{
        var formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("phone", title);
        formData.append("email", description);
        formData.append("category", category);
        formData.append("img",img);
        axios.post("http://localhost/api/v1/create",formData, {
            headers: { "Content-Type": "multipart/form-data" },
        }, ).then(res => console.log(res)).catch(err => console.log(err));
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
    const handleImg = event =>{
        setImg(event.target.files[0]);
        console.log(event.target.files[0]);
    }

    return (
        <div className={"flex h-v"}>
            <Header />
            <div className="App h-100vh w-100 pad3">
                <div className="main-add-box flex gap3 col h-100vh w-100 pa2">
                    <div className="title-section flex col gap1">
                        <div className="flex center-y gap1">
                            <h1>Create your own</h1>
                            <h1 className={`accent-color`}>content</h1>
                        </div>
                        <p className={"flex gap1"}>Pen your journey, inspire hearts, and leave a mark forever</p>
                    </div>
                    <div className="flex gap3 evenly pad2 w-100">
                        <div className="flex col gap2 w-100 add-input-box ">
                            <h1 className={"subtitle hidden-mobile"}>Blog info</h1>
                            <p className={"flex required-text gap1 hidden-mobile"}>All required fields will be marked with <p className={`required`}>*</p></p>
                            <div className="flex gap2 2-100">
                                <div className={`flex  input-box center-y between ${activeInput === 'title' ? 'active' : ''}`}
                                     onClick={handleInputBoxClick}>
                                    <div className="flex col center-x">
                                        <label className={`font15 flex ${activeInput === 'title' ? 'active-label' : ''}`}>Title<p className={`${activeInput === 'title' ? 'active-label' : ''} required`}>*</p></label>
                                        <input
                                            type="text"
                                            id="title"
                                            name="title"
                                            onChange={handleTitle}
                                        />
                                    </div>
                                    <div className="icon pad1">
                                        <MdTextSnippet className={`icon`}/>
                                    </div>
                                </div>
                                <div className={`flex  input-box center-y between ${activeInput === 'category' ? 'active' : ''}`}
                                     onClick={handleInputBoxClick}>
                                    <div className="flex col center-x">
                                        <label className={`font15 flex ${activeInput === 'category' ? 'active-label' : ''}`}>Category<p className={`${activeInput === 'category' ? 'active-label' : ''} required`}>*</p></label>
                                        <input
                                            type="text"
                                            id="category"
                                            name="category"
                                            onChange={handleCategory}
                                        />
                                    </div>
                                    <div className="icon pad1">
                                        <TbCategory2 className={`icon`}/>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap2 2-100">
                                <div className={`flex  input-box center-y between ${activeInput === 'phone' ? 'active' : ''}`}
                                     onClick={handleInputBoxClick}>
                                    <div className="flex col center-x">
                                        <label className={`font15 ${activeInput === 'phone' ? 'active-label' : ''}`}>Phone</label>
                                        <input
                                            type="number"
                                            id="phone"
                                            name="phone"
                                            onChange={handlePhone}
                                        />
                                    </div>
                                    <div className="icon pad1">
                                        <AiFillPhone className={`icon`}/>
                                    </div>
                                </div>
                                <div className={`flex  input-box center-y between ${activeInput === 'email' ? 'active' : ''}`}
                                     onClick={handleInputBoxClick}>
                                    <div className="flex col center-x">
                                        <label className={`font15 ${activeInput === 'email' ? 'active-label' : ''}`}>Email</label>
                                        <input
                                            type="text"
                                            id="email"
                                            name="email"
                                            onChange={handleEmail}
                                        />
                                    </div>
                                    <div className="icon pad1">
                                        <MdEmail className={`icon`}/>
                                    </div>
                                </div>
                            </div>
                            <div className={`flex  textarea-input-box  between ${activeInput === 'description' ? 'active' : ''}`}
                                 onClick={handleInputBoxClick}>
                                <div className="flex col center-x">
                                    <label className={`font15 flex ${activeInput === 'description' ? 'active-label' : ''}`}>Description<p className={`${activeInput === 'description' ? 'active-label' : ''} required`}>*</p></label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        onChange={handleDescription}
                                    >
                                    </textarea>

                                </div>
                                <div className="icon pad1">
                                    <MdTextSnippet className={`icon`}/>
                                </div>
                            </div>
                            <div className="flex add-buttons w-100 gap2">
                                <button id={`clear`} className={`w-100`}>Clear</button>
                                <button id={`submit`}  className={`w-100`} onClick={handleClick}>Submit</button>
                            </div>
                        </div>
                        <div className="image-section gap2 flex col w-100 ">
                            <h1 className={"subtitle hidden-mobile"}>Image upload</h1>
                            <p className={"flex required-text gap1 hidden-mobile"}>Upload to see image</p>
                            <div className="image-upload-box middle">
                                <div className="flex col center-y gap1">
                                    <input type="file" id="img" className={`none`} onChange={handleImg}/>
                                    <label htmlFor="img">
                                        <AiFillPlusCircle className={`icon`}/>
                                    </label>
                                    <p>Upload an image</p>
                                </div>
                            </div>
                            <button>Change Image</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
