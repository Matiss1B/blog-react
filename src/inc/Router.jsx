import {Routes, Route} from "react-router-dom";
//Pages
import Add from "../pages/Add";
import Edit from "../pages/Edit";
import Blogs from "../pages/Blogs";
import Authentification from "../pages/Authentification";
import HomePage from "../pages/HomePage";
import {useParams} from "react-router-dom";
import Blog from "../pages/Blog";
import MyBlogs from "../pages/MyBlogs";
import Settings from "../pages/Settings";
import Profile from "../pages/Profile";
import {useEffect} from "react";
import PasswordReset from "../pages/PasswordReset";
import PasswordResetMail from "../pages/PasswordResetMail";
import UserProfile from "../pages/UserProfile";
//Components
import Loader from "../compoents/Loading";
import NotFound from "../compoents/NotFound";
import SavedBlogs from "../pages/SavedBlogs";
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
            <Route path="/profile" element={<Profile/>} />
            <Route path="/profile/blogs" element={<MyBlogs/>} />
            <Route path="/profile/:id" element={<UserProfile/>} />
            <Route path="/profile/saved" element={<SavedBlogs/>} />
            <Route path="/profile/reset-password" element={<PasswordResetMail/>}/>
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}
const BlogsWrapper = () => {
    const { category } = useParams();
    return <Blogs category={category} />;
};
export default Router;