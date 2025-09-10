import { useState } from "react"
import {toast} from "react-toastify"
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Thanks from "./Thanks";
import { tab } from "@testing-library/user-event/dist/tab";

function Register(){
    const [pname,setpname] = useState()
    const [phone,setphone] = useState()
    const [uname,setuname] = useState()
    const [pass,setpass] = useState()
    const [cpass,setcpass] = useState()
    const [terms,setterms] = useState(false)
    const [loading,setloading] = useState(false)
    const navigate = useNavigate();
    var handleSubmit=async(e)=>
    {
        e.preventDefault();
        if(terms===true)
        {
            if(pass===cpass)
            {
                try
                {
                        const signupdata = {pname,phone,uname,pass}
                        setloading(true)
                        const apiresp=await axios.post(`${process.env.REACT_APP_APIURL}/api/register`,signupdata)
                        if(apiresp.data.success === 1)
                        {
                            navigate("/thanks")
                            toast.success("Signup successful, check your email to activate your account")
                        }
                        else if(apiresp.data.success === 2){
                            navigate("/thanks")
                            toast.success("Signup successful, error while sending activation email")
                        }
                        else{
                            toast.error("Error while signing up, try again")
                        }
                }
                catch(e){
                    toast.error(e.message)
                }
                finally{
            setloading(false)
            clear()
        }
            }
            else{
                toast.warn("Password and confirm password doesn't matches")
            }
        }
        else{
            toast.info("Please accept terms and conditions")
        }
    }
    function clear(){
        setpname("")
        setphone("")
        setuname("")
        setpass("")
        setcpass("")
        setterms("")
    }

    return(
        <div id="page-content">
    	<div className="page section-header text-center">
			<div className="page-title">
        		<div className="wrapper"><h1 className="page-width">Create an Account</h1></div>
      		</div>
		</div>
        
        <div className="container">
        	<div className="row">
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 main-col offset-md-3">
                	<div className="mb-4">
                       <form  action="#" id="CustomerLoginForm" accept-charset="UTF-8" className="contact-form" onSubmit={handleSubmit}>	
                          <div className="row">
	                          <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                                <div className="form-group">
                                    <label for="FirstName">First Name</label>
                                    <input type="text" value={pname} required  name="customer[first_name]" placeholder="" id="FirstName" autofocus="" onChange={(e)=>setpname(e.target.value)}/>
                                </div>
                               </div>
                               <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                                <div className="form-group">
                                    <label for="Phone">Phone Number</label>
                                    <input type="number" value={phone} required  name="phone" placeholder="" id="phone" onChange={(e)=>setphone(e.target.value)}/>
                                </div>
                               </div>
                            <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                                <div className="form-group">
                                    <label for="CustomerEmail">Email (Username)</label>
                                    <input type="email" value={uname} required  name="customer[email]" placeholder="" id="CustomerEmail" className="" autocorrect="off" autocapitalize="off" autofocus="" onChange={(e)=>setuname(e.target.value)}/>
                                </div>
                            </div>
                            <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                                <div className="form-group">
                                    <label for="CustomerPassword">Password</label>
                                    <input type="password" value={pass} required name="customer[password]" id="CustomerPassword" onChange={(e)=>setpass(e.target.value)}/>                      	
                                </div>
                            </div>
                            <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                                <div className="form-group">
                                    <label for="CustomerCPassword">Confirm Password</label>
                                    <input type="password" value={cpass} required name="customer[cpassword]" id="CustomerCPassword" onChange={(e)=>setcpass(e.target.value)}/>                      	
                                </div>
                            </div>
                            <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                                <div className="form-group">
                                    <label><input type="checkbox" value={setterms} name="ch" onChange={(e)=>setterms(e.target.checked)}/>I accept terms and conditions.</label>                     	
                                </div>
                            </div>
                            
                          </div>
                          <div className="row">
                            <div className="text-center col-12 col-sm-12 col-md-12 col-lg-12">
                                <input type="submit" className="btn mb-3" value="Create"/>
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

export default Register