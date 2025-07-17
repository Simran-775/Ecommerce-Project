import { Routes,Route } from "react-router-dom";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import Thanks from "./Thanks";
import SearchUser from "./SearchUser";
import ListofUsers from "./Listofusers";
import ManageCategory from "./ManageCategory";
import ManageProduct from "./ManageProduct";
function SiteRoutes(){
    return(
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/homepage" element={<Home/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/thanks" element={<Thanks/>}/>
            <Route path="/searchuser" element={<SearchUser/>}/>
            <Route path="/listofusers" element={<ListofUsers/>}/>
            <Route path="/savecategory" element={<ManageCategory/>}/>
            <Route path="/addproduct" element={<ManageProduct/>}/>
        </Routes>
    )
}

export default SiteRoutes