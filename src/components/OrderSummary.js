import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import { toast } from "react-toastify";
import { datacontext } from "../App";
function OrderSummary() {
    const navigate = useNavigate()
    const {udata} = useContext(datacontext)
    const [oinfo,setoinfo] = useState({})
    async function fetchorderdetails()
    {
        try
        {
            const apiresp = await axios.get(`${process.env.REACT_APP_APIURL}/api/getorderdetails?un=${udata.username}`)
            if(apiresp.data.success===1)
            {
                setoinfo(apiresp.data.odata)
            }
            else if(apiresp.data.success===0)
            {
               toast.error("Some error occured, try again")
            }
            else
            {
               toast.error("Some error occured, try again")
            }
        }
        catch(e)
        {
            toast.error("Error Occured " + e.message)
        }
    }
    useEffect(()=>
    {
        if(udata!==null)
        {
            fetchorderdetails();
        }
    },[udata])

    useEffect(()=>{
        if(sessionStorage.getItem("uinfo")===null){
            toast.info("Please login to access the page")
            navigate("/login")
        }     
    },[])

    return(
        <>
            <div id="page-content">
    	<div className="page section-header text-center">
			<div className="page-title">
        		<div className="wrapper"><h1 className="page-width">Order Summary</h1></div>
      		</div>
		</div>
        
        <div className="container">
        	<div className="row">
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 main-col offset-md-3">
                	<div className="mb-4">
                        Thanks for shopping on our website. Your order number is {oinfo._id}.<br/>
                      Your order will be delivered at {oinfo.address}
                    </div>
               	</div>
            </div>
        </div>
        
    </div>
        </>
    )
}

export default OrderSummary;