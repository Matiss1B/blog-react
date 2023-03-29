import './App.css';
import {useState} from "react";
import axios from "axios";
function App() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [img, setImg] = useState('');

    const handleClick = () =>{
        let data = {
            title:title,
            description:description,
            img:img,
        }
        fetch("http://localhost/api/test",{
            method:"POST",
            body:data,
        }).then(res => console.log(res.json())).catch(err => console.log(err));
    }
    const handleTitle = event =>{
        setTitle(event.target.value);
    }
    const handleDescription = event =>{
        setDescription(event.target.value);
    }
    const handleImg = event =>{
        setImg(event.target.value);
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
        <input type="text" name="img"  onChange={handleImg} />

        <button onClick={handleClick} >Value</button>
    </div>
  );
}

export default App;
