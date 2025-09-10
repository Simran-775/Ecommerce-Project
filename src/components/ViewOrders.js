import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
function ViewOrders() {
    const [uname, setuname] = useState()
    const [pmode, setpmode] = useState("")
    const [ordersdata, setordersdata] = useState([])
    const [orddate, setorddate] = useState();
    const navigate = useNavigate();


    const fetchallorders = async(e) => {
         e.preventDefault();
        try {
            var apiresp = "";
            if(pmode!=="")
            {
                apiresp = await axios.get(`${process.env.REACT_APP_APIURL}/api/getordersbydate?odate=${orddate}&pmode=${pmode}`)
            }
            else{
                apiresp = await axios.get(`${process.env.REACT_APP_APIURL}/api/getordersbydate?odate=${orddate}`)
            }
            
            if (apiresp.data.success === 1) {
                setordersdata(apiresp.data.odata)
                // fetchallorders()
            }
            else if (apiresp.data.success === 0) {
                setordersdata([])
                toast.info("No orders of this date found")
            }
            else {
                toast.error("Some error occured try again")
            }
        }
        catch (e) {
            toast.error("Error Occured: "+e.message)
        }
    }

    async function handleupdate(id) {
        try {
            if (window.confirm("Are you sure that you want to delete?")) {
                const apiresp = await axios.delete(`${process.env.REACT_APP_APIURL}/api/deluser/${id}`)
                if (apiresp.data.success === 1) {
                    toast.info("User deleted successfully")
                    fetchallorders();
                }
                else if (apiresp.data.success === 0) {
                    setordersdata([])
                    toast.info("User not deleted")
                }
                else {
                    toast.error("Some error occured, try again")
                }
            }

        }
        catch (e) {
            toast.error("Error occured" + e.message)
        }
    }

    useEffect(() => {
        if (sessionStorage.getItem("uinfo") === null) {
            toast.info("Please login to access the page")
            navigate("/login")
        }
        else if (sessionStorage.getItem("uinfo") != null) {
            const userdata = JSON.parse(sessionStorage.getItem("uinfo"))
            if (userdata.usertype !== "admin") {
                toast.info("Please login with proper credentials to access the page");
                navigate("/login")
            }
        }
    }, [])

    return (
        <>
            <div id="page-content">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 main-col offset-md-3">
                            <div className="mb-4">
                                <form id="CustomerLoginForm" className="contact-form" onSubmit={fetchallorders}>
                                    <div className="row">
                                        <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                                            <div className="form-group">
                                                <label for="date">Date</label>
                                                <input type="date" value={orddate} name="orderdate" placeholder="Date of Orders" required="" onChange={(e) => setorddate(e.target.value)} />

                                            </div>
                                        </div>
                                        <div className="form-group">
                                                <label for="pmode">Payment Mode</label>
                                                <select name="pmode" value={pmode} onChange={(e) => setpmode(e.target.value)}>
                                                    <option value="">Choose payment mode</option>
                                                    <option value="cash on delivery">Cash on Delivery</option>
                                                    <option value="card">Card</option>
                                                </select>

                                            </div>

                                    </div>
                                    <div className="row">
                                        <div className="text-center col-12 col-sm-12 col-md-12 col-lg-12">
                                            <input type="submit" className="btn mb-3" value="View Orders" />
                                        </div>
                                    </div>
                                </form>
                            </div></div></div></div>
                {
                    ordersdata.length > 0 ?
                        <>
                            <div className="page section-header text-center">
                                <div className="page-title">
                                    <div className="wrapper"><h1 className="page-width">Orders</h1></div>
                                </div>
                            </div>
                            <table className="text-center">
                                <tbody>
                                    <tr>
                                        <th>Order Id</th>
                                        <th>Order Date/Time</th>
                                        <th>Username</th>
                                        <th>Address</th>
                                        <th>Payment Mode</th>
                                        <th>Bill</th>
                                        <th>Status</th>
                                        <th>Update</th>
                                    </tr>
                                    {
                                        ordersdata.map((data, i) => {
                                            const readabledate = new Date(data.orderDate).toLocaleString("en-IN", {
                                                timeZone: "UTC",
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                                second: "2-digit",
                                            })

                                            return <tr key={i}>
                                                <td><Link to={`/orderitems?oid=${data._id}`}>{data._id}</Link></td>
                                                <td>{readabledate}</td>
                                                <td>{data.username}</td>
                                                <td>{data.address}</td>
                                                <td>{data.pmode}</td>
                                                <td>{data.billamt}</td>
                                                <td>{data.status}</td>
                                                <td><button className="btn btn-danger" onClick={() => navigate(`/updatestatus?id=${data._id}&status=${data.status}`)}>Update</button></td>
                                            </tr>
                                        }
                                        )
                                    }
                                    <br></br>
                                    {ordersdata.length} orders found
                                </tbody>
                            </table>
                        </> : null

                }




            </div>
        </>
    )
}

export default ViewOrders;