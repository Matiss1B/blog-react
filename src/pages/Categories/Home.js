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
        <div className="home flex w-100 middle">
            <container className = "w-1200 flex col pad3 gap1">
                <h1 className="main-title font5">Home</h1>
            <div className="image-list flex gap2">
                <div className="flex flex-2">
                    <img src="https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg?auto=compress&cs=tinysrgb&w=800" className="cover"/>
                </div>
                <div className="flex col flex-1 gap2">
                    <div className="flex flex-1">
                        <img src="https://images.pexels.com/photos/2079246/pexels-photo-2079246.jpeg?auto=compress&cs=tinysrgb&w=800" className="cover"/>
                    </div>
                    <div className="flex flex-1">
                        <img src="https://images.pexels.com/photos/1428348/pexels-photo-1428348.jpeg?auto=compress&cs=tinysrgb&w=800" className="cover"/>
                    </div>
                </div>
            </div>
            </container>
        </div>
    );
}

export default Home;