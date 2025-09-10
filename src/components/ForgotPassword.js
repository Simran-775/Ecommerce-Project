import { useContext, useState } from "react"
import { toast } from "react-toastify"
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { datacontext } from "../App";
function ForgotPassword() {
    const [uname, setuname] = useState()
    const navigate = useNavigate()
    const { setudata } = useContext(datacontext);
    const [loading,setloading] = useState(false)
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const data = { uname }
            setloading(true)
            const apiresp = await axios.get(`${process.env.REACT_APP_APIURL}/api/forgotpassword?un=${uname}`)
            if (apiresp.data.success === 1) {
                toast.success("Mail sent. Please check your email to reset password")
            }
            else if(apiresp.data.success===3)
            {
                toast.info("Invalid Username")
            }
            else
            {
                toast.error("Some error occured try again")
            }
        }
        catch (e) {
            toast.error("error while signing up")
        }
        finally{
            setloading(false)
        }
    }
    return (
        <>
            <div id="page-content">
                <div className="page section-header text-center">
                    <div className="page-title">
                        <div className="wrapper"><h1 className="page-width">Forgot Password</h1></div>
                    </div>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 main-col offset-md-3">
                            <div className="mb-4">
                                <form accept-charset="UTF-8" className="contact-form" onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                                            <div className="form-group">
                                                <label for="CustomerEmail">Email ( Username )</label>
                                                <input type="email" name="customer[email]" placeholder="" id="CustomerEmail" className="" autocorrect="off" autocapitalize="off" autofocus="" onChange={(e) => setuname(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="text-center col-12 col-sm-12 col-md-12 col-lg-12">
                                            <input type="submit" className="btn mb-3" value="Submit" />
                                            {loading?<p><img src="assets/images/ajax-loader.gif" alt="loader"/></p>:null}
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

export default ForgotPassword;