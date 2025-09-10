import { useContext, useState } from "react"
import { toast } from "react-toastify"
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { datacontext } from "../App";
function Login() {
    const [uname, setuname] = useState()
    const [pass, setpass] = useState()
    const navigate = useNavigate()
    const { setudata } = useContext(datacontext);
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const data = { uname, pass }
            const apiresp = await axios.post(`${process.env.REACT_APP_APIURL}/api/login`, data, {withCredentials:true})
            sessionStorage.setItem("uinfo", JSON.stringify(apiresp.data.udata))
            if (apiresp.data.success === 1) {
                if (apiresp.data.udata.actStatus === true) {
                    setudata(apiresp.data.udata)
                    if (apiresp.data.udata.usertype === "admin") {
                        navigate("/adminhome")
                    }
                    else {
                        navigate("/homepage")
                    }
                }
            }
            else if (apiresp.data.success === 0) {
                toast.info("Incorrect username/password")
            }
            else {
                toast.error("Some error occured try again")
            }
        }
        catch (e) {
            console.log(e.message)
            toast.error("error while signing up")
        }
    }
    return (
        <>
            <div id="page-content">
                <div className="page section-header text-center">
                    <div className="page-title">
                        <div className="wrapper"><h1 className="page-width">Login</h1></div>
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
                                                <input type="email" name="customer[email]" placeholder="" id="CustomerEmail" className="" autocorrect="off" autocapitalize="off" autofocus="" onChange={(e) => setuname(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                                            <div className="form-group">
                                                <label for="CustomerPassword">Password</label>
                                                <input type="password" required name="customer[password]" id="CustomerPassword" onChange={(e) => setpass(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="text-center col-12 col-sm-12 col-md-12 col-lg-12">
                                            <input type="submit" className="btn mb-3" value="Sign In" />
                                            <p className="mb-4">
									<Link to="/forgotpassword" id="RecoverPassword">Forgot your password?</Link> &nbsp; | &nbsp;
								    <Link to="/register" id="customer_register_link">Create account</Link>
                                </p>
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

export default Login;