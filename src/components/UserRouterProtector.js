import { useNavigate } from "react-router-dom";
import { datacontext } from "../App";
import { useContext, useEffect } from "react";
import { toast } from "react-toastify";

function UserRouterProtector(props){
    const udata = useContext(datacontext)
    const navigate = useNavigate();
    useEffect(()=>{
            if(sessionStorage.getItem("uinfo")===null){
                toast.info("Please login to access the page")
                navigate("/login")
            }
            else if(sessionStorage.getItem("uinfo")!=null){
                const userdata = JSON.parse(sessionStorage.getItem("uinfo"))
                if(userdata.usertype!=="admin"){
                    toast.info("Please login with proper credentials to access the page");
                    navigate("/login")
                }
            }
        },[])

    return(
        <>
            <props.CompName/>
        </>
    )
}

export default UserRouterProtector;