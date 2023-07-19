import {useEffect, useState} from "react";
import axios from "axios";
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import {useNavigate} from "react-router-dom";

function Cars() {
    const navigate = useNavigate();
    const navigateEdit = (event, id) => {
        navigate('/edit/'+id);
    };
    let [list, setBlogs] = useState([]);
    useEffect(()=>{
        axios.get("http://localhost/api/v1/blogs?category[eq]=cars").then(res => setBlogs(res.data.data)).catch(err => console.log(err));
    },[]);
    return (
        <div className="home col flex w-100 middle">
            <div className = "w-1200 flex col pad3 gap2">
                <h1 className="main-title font5">Cars</h1>
                <div className="image-list flex gap2">
                    <div className="flex flex-2">
                        <img src="https://images.pexels.com/photos/1035108/pexels-photo-1035108.jpeg?auto=compress&cs=tinysrgb&w=800" className="cover border-r-2"/>
                    </div>
                    <div className="flex col flex-1 gap2">
                        <div className="flex flex-1">
                            <img src="https://images.pexels.com/photos/757185/pexels-photo-757185.jpeg?auto=compress&cs=tinysrgb&w=800" className="cover border-r-2"/>
                        </div>
                        <div className="flex flex-1">
                            <img src="https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg?auto=compress&cs=tinysrgb&w=800" className="cover border-r-2"/>
                        </div>
                    </div>
                </div>
                <div className="blog-list">
                {list.map( blog =>(
                    <div className="blog" onClick={event => navigateEdit(event, `${blog.id}`)}>
                        <div className="blog-info pad1 flex center-y between">
                            <div>
                            <h1>{blog.title}</h1>
                            <p>{blog.description}</p>
                            </div>
                            <div className="flex center-y gap1">
                                <ReadMoreIcon fontSize="large"/>
                            </div>
                        </div>
                        <img className="cover border-r-2" src={`http://localhost/storage/${blog.img}`}/>
                    </div>
                ))}
               </div>
            </div>
        </div>
    );
}
export default Cars;
