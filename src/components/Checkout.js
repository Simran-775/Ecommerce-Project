import { useContext, useEffect, useState } from "react"
import {toast} from "react-toastify"
import axios from 'axios';
import { UNSAFE_mapRouteProperties, useNavigate } from "react-router-dom";
import { datacontext } from "../App";
function Checkout(){
    const [addr,setaddr] = useState()
    const [pmode,setpmode] = useState()
    const [hname,sethname] = useState()
    const [cardno,setcardno] = useState()
    const [cvv,setcvv] = useState()
    const [exp,setexp] = useState()
    const navigate = useNavigate()
    const {udata,setudata} = useContext(datacontext);
    async function handleSubmit(e){
        e.preventDefault();
        try{
            const cardetails = {hname,cardno,cvv,exp}
            const apidata = {billamt:sessionStorage.getItem("carttotal"),addr,pmode,cardetails,uname:udata.username}
            const apiresp = await axios.post(`${process.env.REACT_APP_APIURL}/api/saveorder`,apidata)
            if(apiresp.data.success===1){
                 navigate("/ordersummary")                
            }
            else if(apiresp.data.success === 0){
                toast.info("Error while placing order")
            }
            else{
                toast.error("Some error occured try again")
            }
        }
        catch(e)
        {
            toast.error("error while signing up")
        }
    }

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
        		<div className="wrapper"><h1 className="page-width">Checkout</h1></div>
      		</div>
		</div>
        
        <div className="container">
        	<div className="row">
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 main-col offset-md-3">
                	<div className="mb-4">
                       <form action="#" id="CustomerLoginForm" accept-charset="UTF-8" className="contact-form" onSubmit={handleSubmit}>	
                          <div className="row">
                            Your total bill amount is Rs. {sessionStorage.getItem("carttotal")}/-<br/><br/>
                            <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                                <div className="form-group">
                                    <label for="CustomerEmail">Address</label>
                                    <textarea  name="saddr" placeholder="Shipping address" onChange={(e)=>setaddr(e.target.value)}></textarea>

                                </div>
                            </div>
                            <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                                <div className="form-group">Payment Option
                                    <br/>
                                    <label for="cash"><input type="radio" required name="pmode" value="cash on delivery" onChange={(e)=>setpmode(e.target.value)}/>Cash on Delivery</label>&nbsp;&nbsp;
                                    <label for = "card"><input type="radio" required name="pmode" value="card" onChange={(e)=>setpmode(e.target.value)}/>Card</label>                    	
                                                         	
                                </div>
                            </div>
                            {
                                pmode==="card"?
                                <>
                                <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                                <div className="form-group">
                                    <label for="holder">Holder Name</label>                      	
                                    <input type="text" required name="hname" onChange={(e)=>sethname(e.target.value)}/>                      	
                                </div>
                            </div>
                            <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                                <div className="form-group">
                                    <label for="cardno">Card No</label>                      	
                                    <input type="text" required name="cardno" onChange={(e)=>setcardno(e.target.value)}/>                      	
                                </div>
                            </div>
                            <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                                <div className="form-group">
                                    <label for="cvv">CVV</label>                      	
                                    <input type="password" required name="cvv" onChange={(e)=>setcvv(e.target.value)}/>                      	
                                </div>
                            </div>
                            <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                                <div className="form-group">
                                    <label for="exp">Expiry</label>                      	
                                    <input type="text" required name="exp" onChange={(e)=>setexp(e.target.value)}/>                      	
                                </div>
                            </div>
                            </>:null
                            }
                            
                          </div>
                          <div className="row">
                            <div className="text-center col-12 col-sm-12 col-md-12 col-lg-12">
                                <input type="submit" className="btn mb-3" value="Confirm Order"/>
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

export default Checkout;