import axios from "axios";
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
function Home() {
    let [list, setBlogs] = useState([]);
    useEffect(()=>{
        axios.get("http://localhost/api/v1/blogs?category[eq]=home").then(res => setBlogs(res.data.data)).catch(err => console.log(err));
    },[]);
    const navigate = useNavigate();
    const navigateEdit = (event, id) => {
        navigate('/edit/'+id);
    };
    return (
        <div className="home col flex w-100 middle">
            <div className = "w-1200 flex gap10 col pad3 gap1">
                <h1 className="main-title font5">Home</h1>
            <div className="image-list flex gap2">
                <div className="flex flex-2">
                    <img src="https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg?auto=compress&cs=tinysrgb&w=800" className="cover border-r-2"/>
                </div>
                <div className="flex col flex-1 gap2">
                    <div className="flex flex-1">
                        <img src="https://images.pexels.com/photos/2079246/pexels-photo-2079246.jpeg?auto=compress&cs=tinysrgb&w=800" className="cover border-r-2"/>
                    </div>
                    <div className="flex flex-1">
                        <img src="https://images.pexels.com/photos/1428348/pexels-photo-1428348.jpeg?auto=compress&cs=tinysrgb&w=800" className="cover border-r-2"/>
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
    );
}

export default Home;