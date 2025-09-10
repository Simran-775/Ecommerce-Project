import { useEffect, useState } from "react"
import {toast} from "react-toastify"
import axios from 'axios';
import { useNavigate, useSearchParams } from "react-router-dom";
function UpdateStatus(){
    const [params] = useSearchParams()
    const orderid = params.get("id");
    const currstatus = params.get("status");
    const [newstatus,setnewstatus] = useState();
    const navigate = useNavigate();
    async function handleSubmit(e){
        e.preventDefault();
        try{
            const apidata = {orderid,newstatus}
            const apiresp = await axios.put(`${process.env.REACT_APP_APIURL}/api/updatestatus`,apidata)
            if(apiresp.data.success===1){
                toast.info("Status Updated Successfully")
                navigate("/vieworders")
            }
            else if(apiresp.data.success === 0){
                toast.info("Status not updated")
            }
            else{
                toast.error("Some error occured try again")  
            }
        }
        catch(e)
        {
            toast.error("Error ocurred" + e.message)
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
        		<div className="wrapper"><h1 className="page-width">Update Status</h1></div>
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
                                    <b>Current status :- </b> {currstatus}
                                </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                                <div className="form-group">
                                    <label for="newstatus">New Status</label>
                                    <select name="newst" onChange={(e)=>setnewstatus(e.target.value)}>
                                        <option value="">Select New Status</option>
                                        <option>Order Placed</option>
                                        <option>Order Confirmed</option>
                                        <option>Processing</option>
                                        <option>Shipped/Dispatched</option>
                                        <option>Out for Delivery</option>
                                        <option>Delivered</option>
                                        <option>Attempted Delivery</option>
                                        <option>Cancelled</option>
                                        <option>Awaiting Pickup</option>
                                        <option>Delayed</option>
                                        <option>Lost</option>
                                    </select>
                                </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="text-center col-12 col-sm-12 col-md-12 col-lg-12">
                                <input type="submit" className="btn mb-3" value="Update"/>
                            </div>
                         </div>
                     </form>
                    </div>
               	</div>
            </div>
        </div>
        
    </div>
        </>
    )
}

export default UpdateStatus;