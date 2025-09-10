import { useContext, useEffect, useState } from "react"
import { toast } from "react-toastify"
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { datacontext } from "../App";
function ChangePassword() {
    const [uname, setuname] = useState()
    const [cpass, setcpass] = useState()
    const [newpass, setnewpass] = useState()
    const [cnewpass, setcnewpass] = useState()
    const navigate = useNavigate()
    const { udata, setudata } = useContext(datacontext);
    async function handleSubmit(e) {
        e.preventDefault();
        if (newpass === cnewpass && newpass !== cpass) {
            try {
                const apidata = {cpass,newpass,uname:udata.username}
                const apiresp = await axios.put(`${process.env.REACT_APP_APIURL}/api/changepassword`, apidata,{withCredentials:true})
                if (apiresp.data.success === 1) {
                    toast.success("Password changed successfully")
                    setudata(null)
                    sessionStorage.removeItem("uinfo")
                    navigate("/login")
                    toast.info("You have been logged out, login with new password")

                }
                else if (apiresp.data.success === 0) {
                    toast.info("Incorrect current  password")
                }
                else {
                    toast.error("Some error occured try again")
                }
            }
            catch (e) {
                toast.error("error while changing password")
            }
        }
        else{
            toast.info("New password shouldn't be equal to old password and should match with confirm password")
        }

    }

    useEffect(()=>{
        if(sessionStorage.getItem("uinfo")===null){
            toast.info("Please login to access the page")
            navigate("/login")
        }     
    },[])

    return (
        <>
            <div id="page-content">
                <div className="page section-header text-center">
                    <div className="page-title">
                        <div className="wrapper"><h1 className="page-width">Change Password</h1></div>
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
                                                <label> Current Password</label>
                                                <input type="password" required name="currentpassword" id="currentPassword" onChange={(e) => setcpass(e.target.value)} />
                                                <label for="newPassword">New Password</label>
                                                <input type="password" required name="newpassword" id="newPassword" onChange={(e) => setnewpass(e.target.value)} />
                                                <label for="cnewPassword">Confirm New Password</label>
                                                <input type="password" required name="cnewpassword" id="cnewPassword" onChange={(e) => setcnewpass(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="text-center col-12 col-sm-12 col-md-12 col-lg-12">
                                            <input type="submit" className="btn mb-3" value="Sign In" />
                                            {/* <p className="mb-4">
									<a href="#" id="RecoverPassword">Forgot your password?</a> &nbsp; | &nbsp;
								    <a href="register.html" id="customer_register_link">Create account</a>
                                </p> */}
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

export default ChangePassword;