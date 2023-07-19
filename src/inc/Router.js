import {Routes, Route} from "react-router-dom";
//Pages
import Home from "../pages/Categories/Home";
import Cars from "../pages/Categories/Cars";
import Fashion from "../pages/Categories/Fashion";
import Food from "../pages/Categories/Food";
import Add from "../pages/Add";
import Edit from "../pages/Edit";
function Router() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<Add />} />
            <Route path="/cars" element={<Cars />} />
            <Route path="/fashion" element={<Fashion />} />
            <Route path="/food" element={<Food />} />
            <Route path="/edit/:id" element={<Edit />} />
        </Routes>
    );
}

export default Router;