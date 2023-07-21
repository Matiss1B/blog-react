import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Header from "../../compoents/Header";

function Food() {
    let [list, setBlogs] = useState([]);
    useEffect(()=>{
        axios.get("http://localhost/api/v1/blogs?category[eq]=food").then(res => setBlogs(res.data.data)).catch(err => console.log(err));
    },[]);
    const navigate = useNavigate();
    const navigateEdit = (event, id) => {
        navigate('/edit/'+id);
    };
    return (
        <div>
            <Header />
        <div className="home flex w-100 middle">
            <div className = "w-1200 flex col pad3 gap2">
                <h1 className="main-title font5">Food</h1>
                <div className="image-list flex gap2 wrap">
                    <div className="flex flex-2">
                        <img src="https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?auto=compress&cs=tinysrgb&w=800" className="cover border-r-2"/>
                    </div>
                    <div className="flex col flex-1 gap2">
                        <div className="flex flex-1">
                            <img src="https://images.pexels.com/photos/3535383/pexels-photo-3535383.jpeg?auto=compress&cs=tinysrgb&w=800" className="cover border-r-2"/>
                        </div>
                        <div className="flex flex-1">
                            <img src="https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=800" className="cover border-r-2"/>
                        </div>
                    </div>
                </div>
                <div className="blog-list">
                    {list.map( blog =>(
                        <div className="blog" onClick={event => navigateEdit(event, `${blog.id}`)}>
                            <div className="blog-info pad1">
                                <h1>{blog.title}</h1>
                                <p>{blog.description}</p>
                            </div>
                            <img className="cover border-r-2" src={`http://localhost/storage/${blog.img}`}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        </div>
    );
}
export default Food;