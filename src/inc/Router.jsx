import {Routes, Route} from "react-router-dom";
//Pages
import Add from "../pages/Add";
import Edit from "../pages/Edit";
import Blogs from "../pages/Blogs";
import Authentification from "../pages/Authentification";
import HomePage from "../pages/HomePage";
import {useParams} from "react-router-dom";
import Loader from "../compoents/Loading";
import Blog from "../pages/Blog";
import MyBlogs from "../pages/MyBlogs";
import Settings from "../pages/Settings";
import {useEffect} from "react";
import PasswordReset from "../pages/PasswordReset";
import PasswordResetMail from "../pages/PasswordResetMail";
function Router() {

    return (
        <Routes>
            <Route path="/" element={<Authentification auth={"login"} />} />
            <Route path="/blogs/:category" element={<BlogsWrapper />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/add" element={<Add />} />
            <Route path="/register" element={<Authentification auth={"register"} />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="/blog/:id" element={<Blog/>} />
            <Route path="/loader" element={<Loader/>} />
            <Route path="/password-reset/:token" element={<PasswordReset/>} />
            <Route path="/profile/settings" element={<Settings/>} />
            <Route path="/profile/blogs" element={<MyBlogs/>} />
            <Route path="/profile/reset-password" element={<PasswordResetMail/>}/>
        </Routes>
    );
}
const BlogsWrapper = () => {
    const { category } = useParams(); // This will get the "category" value from the URL paramete
    return <Blogs category={category} />;
};
export default Router;