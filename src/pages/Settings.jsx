import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {MdEmail} from "react-icons/md"
import {AiFillPhone} from "react-icons/ai"
import Header from "../compoents/Header";
import{AiFillEye} from "react-icons/ai"
import {FaLock} from "react-icons/fa"
import Loader from "../compoents/Loading";
import {FaAddressCard} from "react-icons/fa";
function Settings() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [img, setImg] = useState('');
    const [updateImg, setUpdateImg] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [activeInput, setActiveInput] = useState(null);
    const [error, setErrorToken] = useState(null);
    const navigate = useNavigate();
    const handleInputBoxClick = (event) => {
        const clickedInputBox = event.target.id;
        setActiveInput(clickedInputBox);
    };
    const handleImg = event =>{
        setUpdateImg(event.target.files[0]);
        let file =  event.target.files[0]
        const src = URL.createObjectURL(file);
        const img = document.createElement('img');
        img.className = 'cover';
        img.src = src;
        img.id = "image"
        const div = document.getElementById('profile-image');
        document.getElementsByClassName("image")[0].remove();
        div.append(img);
        console.log(div);
    }
    const editProfile = () => {
        const formData = new FormData();
        formData.append("_method", "put");
        formData.append("name", name);
        formData.append("surname", surname);
        formData.append("email", email);
        if(password !== undefined) {
            formData.append("password", password);
        }
        if(updateImg !== "") {
            formData.append("img", img);
        }
        axios.post("http://localhost/api/v1/user/edit", formData, {headers:{
            Authorization:sessionStorage.getItem("user"),
            }}).then(
                (res)=>console.log(res)
        ).catch((err)=>console.log(err));
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost/api/v1/user/get", {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": sessionStorage.getItem("user")
                    }
                });

                setData(response.data);
                setName(response.data.name);
                setImg(response.data.img);
                setSurname(response.data.surname);
                setEmail(response.data.email);
                setPassword(response.data.password);
                setLoading(false);
                console.log(response)
            } catch (error) {
                setErrorToken(error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        // Update the corresponding state variable
        if (name === 'name') {
            setName(value);
        } else if (name === 'surname') {
            setSurname(value);
        } else if (name === 'email') {
            setEmail(value);
        } else if (name === 'pass') {
            setPassword(value);
        }
    };
    if (loading) {
        return <Loader/>;
    }
    if (error) {
        return navigate("/");
    }
    if(data) {
        return (
            <div className={'flex'}>
                <Header/>
                <div className="App h-v">
                    <div className="main-settings-box h-100 flex gap5 col center-y evenly">
                        <div className="profile-box flex wrap center-y gap2 w-100 center-x">
                            <div className="flex col center-y gap1">
                                <div id={`profile-image`} className="profile-img">
                                    <img className={`cover image`} src={`http://localhost/storage/${img}`} alt=""/>
                                </div>
                                <input onChange={handleImg} type="file" id={`profileImg`} name={`profileImg`} className={`none`}/>
                                <label htmlFor="profileImg" className={`font15`}>Change profile image</label>
                            </div>
                            <div className="profile-info">
                                <h1>Matiss Balins</h1>
                                <p>matiss@matiss</p>
                            </div>
                        </div>
                        <div className="profile-box gap5 wrap flex w-100 center-x">
                            <div
                                className={`flex input-box center-y between ${activeInput === 'name' ? 'active' : ''}`}
                                onClick={handleInputBoxClick}
                                >
                                <div className="flex col center-x">
                                    <label
                                        className={`font15 flex ${activeInput === 'name' ? 'active-label' : ''}`}>Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={name}
                                        name="name"
                                        autoComplete="off"
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="icon pad1">
                                    <FaAddressCard className={`icon`}/>
                                </div>
                            </div>
                            <div
                                className={`flex  input-box center-y between ${activeInput === 'surname' ? 'active' : ''}`}
                                onClick={handleInputBoxClick}
                            >
                                <div className="flex col center-x">
                                    <label
                                        className={`font15 flex ${activeInput === 'surname' ? 'active-label' : ''}`}>Surname
                                    </label>
                                    <input
                                        type="text"
                                        value={surname}
                                        id="surname"
                                        name="surname"
                                        autoComplete="off"
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="icon pad1">
                                    <FaAddressCard className={`icon`}/>
                                </div>
                            </div>
                        </div>
                        <div className="profile-box gap5 wrap flex w-100 center-x">
                            <div
                                className={`flex input-box center-y between ${activeInput === 'email' ? 'active' : ''}`}
                                onClick={handleInputBoxClick}
                            >
                                <div className="flex col center-x">
                                    <label
                                        className={`font15 flex ${activeInput === 'email' ? 'active-label' : ''}`}>Email
                                    </label>
                                    <input
                                        type="text"
                                        value={email}
                                        id="email"
                                        name="email"
                                        autoComplete="off"
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="icon pad1">
                                    <MdEmail className={`icon`}/>
                                </div>
                            </div>
                            <div
                                className={`flex  input-box center-y between ${activeInput === 'pass' ? 'active' : ''}`}
                            >
                                <div className="flex col center-x">
                                    <label
                                        onClick={()=>{ navigate("/profile/reset-password")}}
                                        className={`font15 flex ${activeInput === 'pass' ? 'active-label' : ''}`}>Password
                                    </label>
                                    <input
                                        type="text"
                                        value={password}
                                        id="pass"
                                        disabled={true}
                                        name="pass"
                                        placeholder={"Click to reset"}
                                        autoComplete="off"
                                        onClick={()=>{ navigate("/profile/reset-password")}}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="icon pad1">
                                    <FaLock className={`icon`}/>
                                </div>
                            </div>
                        </div>
                        <div className="profile-box gap5 wrap flex w-100 center-x">
                           <button className="base-button" onClick={editProfile}>Save Changes</button>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
    return null;
}

export default Settings;
