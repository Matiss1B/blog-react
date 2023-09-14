import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import Header from "../compoents/Header";
import Loader from "../compoents/Loading";

function Edit() {
    let { id } = useParams();
    let [blog, setBlogs] = useState([]);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setErrorToken] = useState(null);
    useEffect(()=>{
        axios.post("http://localhost/api/v1/blogs?id[eq]="+1+"&user="+sessionStorage.getItem("user")).then(res => {
            const blogData = res.data.data[0];
            setTitle(blogData.title);
            setDescription(blogData.description);
            setCategory(blogData.category);
        }).catch(err => console.log(err));
        console.log(blog);

    },[]);
    const [title, setTitle] = useState(``);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState();
    const [img, setImg] = useState([]);
    const handleClick = (event) =>{
        event.preventDefault();
        const formData = new FormData();
        formData.append('id', id);
        formData.append('title', title);
        formData.append('description', description);
        formData.append('category', category);
        formData.append('img', img);
        formData.append('user', sessionStorage.getItem("user"));
        axios.post('http://localhost/api/v1/edit', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then(res => console.log(res)).catch(err => console.log(err));
    }
    const handleTitle = event =>{
        setTitle(event.target.value);
    }
    const handleDescription = event =>{
        setDescription(event.target.value);
    }
    const handleImg = event =>{
        setImg(event.target.files[0]);
        console.log(event.target.files[0]);
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
            <div>
                <Header/>
                <div className="App">
                    <form onSubmit={handleClick}>
                        <div>
                            <input
                                type="text"
                                value={title}
                                id="title"
                                name="title"
                                onChange={handleTitle}
                            />
                            <input
                                type="text"
                                value={description}
                                id="description"
                                name="description"
                                onChange={handleDescription}
                            />
                            <select name="category" onChange={event => setCategory(event.target.value)}>
                                <option value={category}>{category}</option>
                                <option value="cars">Cars</option>
                                <option value="home">Home</option>
                                <option value="fashion">Fashion</option>
                                <option value="food">Food</option>
                            </select>
                            <input type="file" name="img" onChange={handleImg}/>
                            <button>Value</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
    return null;
}

export default Edit;
