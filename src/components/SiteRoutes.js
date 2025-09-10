import { Routes,Route } from "react-router-dom";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import Thanks from "./Thanks";
import SearchUser from "./SearchUser";
import ListofUsers from "./Listofusers";
import ManageCategory from "./ManageCategory";
import ManageProduct from "./ManageProduct";
import AdminHome from "./AdminHome";
import Categories from "./Categories";
import Products from "./Products";
import Details from "./Details";
import ChangePassword from "./ChangePassword";
import ShowCart from "./ShowCart";
import Checkout from "./Checkout";
import OrderSummary from "./OrderSummary";
import ViewOrders from "./ViewOrders";
import OrderItems from "./OrderItems";
import UpdateStatus from "./UpdateStatus";
import SearchResults from "./SearchResults";
import ManageSubCat from "./ManageSubCat";
import SubCategories from "./SubCategories";
import UserRouterProtector from "./UserRouterProtector";
import Contactus from "./Contactus";
import ActivateAccount from "./ActivateAccount";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";

function SiteRoutes(){
    return(
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/homepage" element={<Home/>}/>
            <Route path="/adminhome" element={<AdminHome/>}/>
            <Route path='/categories' element={<Categories/>}/>
            <Route path='/contactus' element={<Contactus/>}/>
            <Route path='/subcategories' element={<SubCategories/>}/>
            <Route path='/products' element={<Products/>}/>
            <Route path='/details' element={<Details/>}/>
            <Route path='/changepassword' element={<ChangePassword/>}/>
            <Route path='/showcart' element={<ShowCart/>}/>
            <Route path='/checkout' element={<Checkout/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/activateaccount" element={<ActivateAccount/>}/>
            <Route path="/thanks" element={<Thanks/>}/>
            <Route path="/searchuser" element={<SearchUser/>}/>
            <Route path="/listofusers" element={<ListofUsers/>}/>
            <Route path="/savecategory" element={<UserRouterProtector CompName={ManageCategory}/>}/>
            <Route path="/addproduct" element={<ManageProduct/>}/>
            <Route path="/addsubcategory" element={<ManageSubCat/>}/>
            <Route path="/ordersummary" element={<OrderSummary/>}/>
            <Route path="/vieworders" element={<ViewOrders/>}/>
            <Route path="/orderitems" element={<OrderItems/>}/>
            <Route path="/updatestatus" element={<UpdateStatus/>}/>
            <Route path="/search" element={<SearchResults/>}/>
            <Route path="/forgotpassword" element={<ForgotPassword/>}/>
            <Route path="/resetpassword" element={<ResetPassword/>}/>
        </Routes>
    )
}

export default SiteRoutes