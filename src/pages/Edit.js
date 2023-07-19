import {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";

function Edit() {
    let { id } = useParams();

    let [blog, setBlogs] = useState([]);
    useEffect(()=>{
        axios.get("http://localhost/api/v1/blogs?id[eq]="+id).then(res => setBlogs(res.data.data)).catch(err => console.log(err));
    },[]);
    const [title, setTitle] = useState(``);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState();
    const [img, setImg] = useState([]);

    const handleClick = () =>{
        const data = {
            id: id,
            title: title,
            description: description,
            category: category,
        };

        axios.put('http://localhost/api/v1/update/' + data.id, data).then(res => console.log(res)).catch(err => console.log(err));
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

    return (
        <div className="App">
            {blog.map( blog =>(
                <div key={blog.id}>
                    <input
                    type="text"
                    id="title"
                    name="title"
                    onChange={handleTitle}
                    />
                    <input
                        type="text"
                        value={blog.description}
                        id="description"
                        name="description"
                        onChange={handleDescription}
                    />
                    <select name="category" onChange={ event=>setCategory(event.target.value)}>
                        <option value = {blog.category}>{blog.category}</option>
                        <option value="cars">Cars</option>
                        <option value="home">Home</option>
                        <option value="fashion">Fashion</option>
                        <option value="food">Food</option>
                    </select>
                    <input type="file" name="img"  onChange={handleImg} />
                    <button onClick={handleClick} >Value</button>
                </div>
            ))}
        </div>
    );
}

export default Edit;
