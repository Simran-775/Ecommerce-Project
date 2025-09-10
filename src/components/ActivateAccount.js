import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
function ActivateAccount() {
    const [params] = useSearchParams()
    const code = params.get("code")
    const [msg, setmsg] = useState()
    const navigate = useNavigate()
    async function activateuser() {
        try {
            const apidata = {code}
            console.log(apidata)
            const apiresp = await axios.put(`${process.env.REACT_APP_APIURL}/api/activateaccount`, apidata)
            if (apiresp.data.success === 1) {
                navigate("/login")
                toast.success("Account activated successfully, please login now")
            }
            else if (apiresp.data.success === 0) {
                setmsg("Error while activating account")
            }
            else {
                setmsg("Some error occured,try again")
            }
        }
        catch (e) {
            toast.error("Error Occured " + e.message)
        }
    }

    useEffect(() => {
        if (code !== "") {
            activateuser()
        }
    }, [code])


    return (
<div className="page section-header text-center">
                    <div className="page-title">
                        <div className="wrapper"><h1 className="page-width">{msg}</h1></div>
                    </div>
                </div>
        

    )
}
export default ActivateAccount