import { useState } from "react"
import {toast} from "react-toastify"
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Thanks from "./Thanks";

function Contactus(){
    const [name,setname] = useState()
    const [phone,setphone] = useState()
    const [email,setemail] = useState()
    const [msg,setmsg] = useState()
    const [loading,setloading] = useState(false)
    const navigate = useNavigate();
    async function handleSubmit(e){
        e.preventDefault();
        try{
            const data = {name,phone,email,msg}
            setloading(true)
            const apiresp = await axios.post(`${process.env.REACT_APP_APIURL}/api/contactus`,data)
            if(apiresp.data.success===1){
                toast.success("Message Sent Successfully")
            }
            else if(apiresp.data.success === 0){
                toast.info("Message not Sent Successfully")
            }
            else{
                toast.error("Some error occured try again")
            }
        }
        catch(e)
        {
            toast.error("Error Occured "+e.message)
        }
        finally{
            setloading(false)
            clear()
        }
    }

    function clear(){
        setname("")
        setphone("")
        setemail("")
        setmsg("")
    }

    return(
        <div id="page-content">
    	<div className="page section-header text-center">
			<div className="page-title">
        		<div className="wrapper"><h1 className="page-width">Contact Us</h1></div>
      		</div>
		</div>
        
        <div className="container">
        	<div className="row">
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 main-col offset-md-3">
                	<div className="mb-4">
                       <form   id="CustomerLoginForm" accept-charset="UTF-8" className="contact-form" onSubmit={handleSubmit}>	
                          <div className="row">
	                          <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                                <div className="form-group">
                                    {/* <label for="Name">Name</label> */}
                                    <input type="text" required value={name} name="customer[name]" placeholder="Enter your name" id="Name" autofocus="" onChange={(e)=>setname(e.target.value)}/>
                                </div>
                               </div>
                               <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                                <div className="form-group">
                                    {/* <label for="Phone">Phone Number</label> */}
                                    <input type="number" value={phone} required  name="phone" placeholder="Enter your phone" id="phone" onChange={(e)=>setphone(e.target.value)}/>
                                </div>
                               </div>
                            <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                                <div className="form-group">
                                    {/* <label for="CustomerEmail">Email</label> */}
                                    <input type="email" required value={email}  name="customer[email]" placeholder="Enter your email" id="CustomerEmail" className="" autocorrect="off" autocapitalize="off" autofocus="" onChange={(e)=>setemail(e.target.value)}/>
                                </div>
                            </div>
                            <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                                <div className="form-group">
                                    {/* <label>Message</label>  */}
                                    <textarea value={msg} placeholder="Enter your message" onChange={(e)=>setmsg(e.target.value)} rows={1}></textarea>                   	
                                </div>
                            </div>
                            
                          </div>
                          <div className="row">
                            <div className="text-center col-12 col-sm-12 col-md-12 col-lg-12">
                                <input type="submit" className="btn mb-3" value="Send"/>
                                {loading?<p><img src="assets/images/ajax-loader.gif" alt="loader"/></p>:null}
                            </div>
                            
                         </div>
                     </form>
                    </div>
               	</div>
            </div>
        </div>
        
    </div>
    )
 }

export default Contactus