import axios from "axios";
import {useState, useEffect} from "react";
function Home() {
    let [list, setBlogs] = useState([]);
    useEffect(()=>{
        axios.get("http://localhost/api/blogs").then(res => setBlogs(res.data)).catch(err => console.log(err));
    },[]);
    const show = ()=>
    {
        console.log(list);
    }

    return (
        <h1 onClick={show}>Home</h1>
    );
}

export default Home;