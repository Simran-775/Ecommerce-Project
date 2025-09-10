import { useContext, useEffect, useState } from "react"
import { toast } from "react-toastify"
import axios from 'axios';
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { datacontext } from "../App";
function ResetPassword() {
    const [params] = useSearchParams()
    const token = params.get("code")
    const [newpass,setnewpass] = useState()
    const [cnewpass,setcnewpass] = useState()
    const [flag,setflag] = useState(false)
    const navigate = useNavigate()
    async function checkToken() {
           try {
            const apiresp = await axios.get(`${process.env.REACT_APP_APIURL}/api/checktoken?token=${token}`)
            if (apiresp.data.success === 1) {
                setflag(true)
            }
            else if (apiresp.data.success === 0) {
                setflag(false)
                toast.info("Either token is wrong or time expired")
            }
            else {
                setflag(false)
                toast.error('Some error occured')
            }
        }
        catch (e) {
            toast.error("Error Occured " + e.message)
        }         
    }

    useEffect(() => {
            checkToken()
    }, [token])

    async function handleSubmit(e){
        e.preventDefault()
        if(newpass === cnewpass)
        {
            try {
            const apidata = {token,newpass}
            const apiresp = await axios.put(`${process.env.REACT_APP_APIURL}/api/resetpassword`,apidata)
            if (apiresp.data.success === 1) {
                toast.success("Password Reset Completely, You can login")
                navigate("/login")
            }
            else if (apiresp.data.success === 0) {
                toast.info("Password couldn't reset properly")
            }
            else {
                toast.error('Some error occured')
            }
        }
        catch (e) {
            toast.error("Error Occured " + e.message)
        }
        }
        else
        {
            toast.info("New password and confirm new password doesn't matches")
        }
        
    }
    return (
        <>
            <div id="page-content">
                <div className="page section-header text-center">
                    <div className="page-title">
                        <div className="wrapper"><h1 className="page-width">Reset Password</h1></div>
                    </div>
                </div>
                {
                    flag?
                    <div className="container">
                    <div className="row">
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 main-col offset-md-3">
                            <div className="mb-4">
                                <form accept-charset="UTF-8" className="contact-form" onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                                            <div className="form-group">
                                                <label for="CustomerPassword">New Password</label>
                                                <input type="password" required name="customer[password]" id="CustomerPassword" onChange={(e) => setnewpass(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                                            <div className="form-group">
                                                <label for="CustomerPassword">Confirm New Password</label>
                                                <input type="password" required name="customer[password]" id="CustomerPassword" onChange={(e) => setcnewpass(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="text-center col-12 col-sm-12 col-md-12 col-lg-12">
                                            <input type="submit" className="btn mb-3" value="Reset Password" />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>:
                <h3 class="text-center">
                    Your link has Expired or is wrong.
                </h3>
                }
                

            </div>
        </>
    )
}

export default ResetPassword;