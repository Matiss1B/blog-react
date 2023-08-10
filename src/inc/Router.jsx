import {Routes, Route} from "react-router-dom";
//Pages
import Add from "../pages/Add";
import Edit from "../pages/Edit";
import Blogs from "../pages/Blogs";
import Authentification from "../pages/Authentification";
import HomePage from "../pages/HomePage";
import {useParams} from "react-router-dom";
function Router() {
    return (
        <Routes>
            <Route path="/" element={<Authentification auth={"login"} />} />
            <Route path="/blogs/:category" element={<BlogsWrapper />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/add" element={<Add />} />
            <Route path="/register" element={<Authentification auth={"register"} />} />
            <Route path="/edit/:id" element={<Edit />} />
        </Routes>
    );
}
const BlogsWrapper = () => {
    const { category } = useParams(); // This will get the "category" value from the URL parameter

    return <Blogs category={category} />;
};
export default Router;