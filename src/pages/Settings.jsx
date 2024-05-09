import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {MdEmail} from "react-icons/md"
import {AiFillPhone} from "react-icons/ai"
import Header from "../compoents/Header";
import{AiFillEye} from "react-icons/ai"
import {FaLock, FaRegStickyNote} from "react-icons/fa"
import Loader from "../compoents/Loading";
import {FaAddressCard} from "react-icons/fa";
import LoaderRing from "../compoents/Loader";
function Settings() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [successMessage, setSuccess] =useState("");
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [staticnName, setStaticName] = useState('');
    const [staticEmail, setStaticEmail] = useState('');
    const [staticnSurname, setStaticSurname] = useState('');
    const [loader, setLoader] = useState(false);
    const [img, setImg] = useState('');
    const [updateImg, setUpdateImg] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [activeInput, setActiveInput] = useState(null);
    const [errors, setErrors] = useState({name:"", surname:"", email:""});
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
        setLoader(true);
        setSuccess("");
        const formData = new FormData();
        formData.append("_method", "put");
        formData.append("name", name);
        formData.append("surname", surname);
        formData.append("email", email);
        if(password !== undefined) {
            formData.append("password", password);
        }
        if(updateImg !== "") {
            formData.append("img", updateImg);
        }
        axios.post("http://localhost/api/v1/user/edit", formData, {headers:{
            Authorization:sessionStorage.getItem("user"),
            }}).then(
                (res)=> {
                    if(res.data.status == 200) {
                        setSuccess(res.data.message);
                        setTimeout(() => {
                            const box = document.getElementById('success-pop-up');

                            box.style.transform = 'translateX(200%)';
                            box.style.transition = '.7s';
                        }, 2000);
                        setStaticName(name);
                        setStaticSurname(surname);
                        setStaticEmail(email);
                        setErrors({name:"", surname:"", email:""})
                    }

                }
        ).catch((err)=> {
            console.log(err.response.data.errors);
            if(err.response.status == 422){
                setErrors(err.response.data.errors);
            }
            if(err.response.status == 401 ||err.response.data.status == 401){
                navigate("/");
            }
        });
        setLoader(false);
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
                setStaticSurname(response.data.surname);
                setStaticName(response.data.name);
                setEmail(response.data.email);
                setStaticEmail(response.data.email);
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
    function hexToRgba(hex, alpha) {
        hex = hex.replace(/^#/, '');

        let bigint = parseInt(hex, 16);
        let r = (bigint >> 16) & 255;
        let g = (bigint >> 8) & 255;
        let b = bigint & 255;

        // Check if the color is lighter than dark gray (i.e., if it's closer to white)
        if (r + g + b > 382) { // 382 is approximately the sum of RGB values of dark gray
            // Replace with dark gray
            r = g = b = 85; // Dark gray color (RGB: 85, 85, 85)
        }

        alpha = parseFloat(alpha);

        if (isNaN(alpha) || alpha < 0 || alpha > 1) {
            alpha = 1;
        }

        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
    function darkenHexColor(hex, percent) {
        hex = hex.replace(/^#/, '');

        let bigint = parseInt(hex, 16);
        let r = (bigint >> 16) & 255;
        let g = (bigint >> 8) & 255;
        let b = bigint & 255;

        let darkenFactor = 1 - percent / 100;

        r = Math.round(r * darkenFactor);
        g = Math.round(g * darkenFactor);
        b = Math.round(b * darkenFactor);

        r = Math.min(255, Math.max(0, r));
        g = Math.min(255, Math.max(0, g));
        b = Math.min(255, Math.max(0, b));

        return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`;
    }

    const changeAccent = (color) =>{
        const root = document.documentElement;
        root.style.setProperty('--accent', color);
        root.style.setProperty('--accent-shadow', hexToRgba(color, 0.7));
        root.style.setProperty('--accent-hover', darkenHexColor(color, 15));

    }
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
            <div className={'flex row-to-col'}>
                <Header/>
                <div className="App h-v">
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
                                <h1 onClick={changeAccent}>{staticnName} {staticnSurname}</h1>
                                <p>{staticEmail}</p>
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
                                    <p className="err">{errors.name == ""? "": errors.name}</p>
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
                                    <p className="err">{errors.surname == ""? "": errors.surname}</p>
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
                                    <p className="err">{errors.email == ""? "": errors.email}</p>
                                </div>
                                <div className="icon pad1">
                                    <MdEmail className={`icon`}/>
                                </div>
                            </div>
                            <div
                                className={`flex  input-box center-y between ${activeInput === 'pass' ? 'active' : ''}`}
                            >
                                <div className="flex col center-x"
                                     onClick={()=>{ navigate("/profile/reset-password")}}
                                >
                                    <label
                                        onClick={()=>{ navigate("/profile/reset-password")}}
                                        className={`font15 flex ${activeInput === 'pass' ? 'active-label' : ''}`}>Password
                                    </label>
                                    <input
                                        type="text"
                                        value={password}
                                        id="pass"
                                        onFocus={()=>{ navigate("/profile/reset-password")}}
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
                        <div className="profile-box gap5 wrap flex w-100 center-x">
                                <div
                                    className={`flex  input-box center-y between ${activeInput === 'pass' ? 'active' : ''}`}
                                >
                                    <div className="flex col center-x center-y">
                                        <label
                                            className={`font15 flex ${activeInput === 'pass' ? 'active-label' : ''}`}>Accent color
                                        </label>
                                        <input
                                            type="color"
                                            defaultValue={"#90EB78"}
                                            className="accent-input"
                                            onChange={(e)=>{changeAccent(e.target.value)}}
                                        />
                                    </div>
                                    <div className="icon pad1">
                                    </div>
                                </div>
                            </div>
                           <button className="base-button" onClick={editProfile}>{loader ? <LoaderRing/>:"Save Changes"}</button>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
    return null;
}

export default Settings;
