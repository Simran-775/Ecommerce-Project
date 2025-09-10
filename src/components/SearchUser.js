import { useEffect, useState } from "react"
import {toast} from "react-toastify"
import axios from 'axios';
import { useNavigate } from "react-router-dom";
function SearchUser(){
    const navigate = useNavigate()
    const [uname,setuname] = useState()
    const [info,setinfo] = useState({})
    async function handleSubmit(e){
        e.preventDefault();
        try{
            const apiresp = await axios.get(`${process.env.REACT_APP_APIURL}/api/searchuser?em=${uname}`)
            if(apiresp.data.success===1){
                setinfo(apiresp.data.udata)
            }
            else if(apiresp.data.success === 0){
                setinfo({})
                toast.info("Incorrect username")
            }
            else{
                toast.error("Some error occured try again")
                
            }
        }
        catch(e)
        {
            toast.error("Error while signing up")
        }
    }

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
            <div id="page-content">
    	<div className="page section-header text-center">
			<div className="page-title">
        		<div className="wrapper"><h1 className="page-width">Admin Name</h1></div>
      		</div>
		</div>
        
        <div className="container">
        	<div className="row">
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 main-col offset-md-3">
                	<div className="mb-4">
                       <form action="#" id="CustomerLoginForm" accept-charset="UTF-8" className="contact-form" onSubmit={handleSubmit}>	
                          <div className="row">
                            <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                                <div className="form-group">
                                    <label for="CustomerEmail">Email</label>
                                    <input type="email" name="customer[email]" placeholder="" id="CustomerEmail" className="" autocorrect="off" autocapitalize="off" autofocus="" onChange={(e)=>setuname(e.target.value)}/>
                                </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="text-center col-12 col-sm-12 col-md-12 col-lg-12">
                                <input type="submit" className="btn mb-3" value="Sign In"/>
                            </div>
                         </div>
                         {
                            Object.keys(info).length>0?
                            <>
                                <b>Name:-</b> {info.name}<br/>
                                <b>Phone:-</b> {info.phone}<br/>
                            </>:null
                         }
                     </form>
                    </div>
               	</div>
            </div>
        </div>
        
    </div>
        </>
    )
}

export default SearchUser;