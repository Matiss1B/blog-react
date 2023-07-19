import {useState} from "react";
import axios from "axios";
function App() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState();
    const [img, setImg] = useState([]);

    const handleClick = () =>{
        var formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("category", category);
        formData.append("img",img);
        console.log(formData);
        axios.post("http://localhost/api/v1/create",formData, {
            headers: { "Content-Type": "multipart/form-data" },
        }, ).then(res => console.log(res)).catch(err => console.log(err));
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
            <input
                type="text"
                placeholder={"Title"}
                id="title"
                name="title"
                onChange={handleTitle}
            />
            <input
                type="text"
                placeholder={"Description"}
                id="description"
                name="description"
                onChange={handleDescription}
            />
            <select name="category" onChange={ event=>setCategory(event.target.value)}>
                <option>Choose</option>
                <option value="cars">Cars</option>
                <option value="home">Home</option>
                <option value="fashion">Fashion</option>
                <option value="food">Food</option>
            </select>
            <input type="file" name="img"  onChange={handleImg} />
            <button onClick={handleClick} >Value</button>
        </div>
    );
}

export default App;
