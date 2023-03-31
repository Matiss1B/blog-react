import {Routes, Route} from "react-router-dom";
//Pages
import Home from "../pages/Home";
import Add from "../pages/Add";
function Router() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<Add />} />
        </Routes>
    );
}

export default Router;