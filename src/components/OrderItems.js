import { useEffect, useState } from "react"
import {toast} from "react-toastify"
import axios from 'axios';
import { useNavigate, useSearchParams } from "react-router-dom";
function OrderItems(){
    const navigate = useNavigate()
    const [params] = useSearchParams();
    const orderid = params.get("oid")
    const [oitems,setoitems] = useState([])
    async function fetchorderitems(){
        try{
            const apiresp = await axios.get(`${process.env.REACT_APP_APIURL}/api/fetchorderitems?oid=${orderid}`)
            if(apiresp.data.success===1){
                setoitems(apiresp.data.items)
            }
            else if(apiresp.data.success === 0){
                setoitems([])
                toast.info("Incorrect username")
            }
            else{
                toast.error("Some error occured try again")
            }
        }
        catch(e)
        {
            toast.error("Error while signing up")
        }
    }
    

    useEffect(()=>{
        fetchorderitems();
    },[])

    useEffect(()=>{
        if(sessionStorage.getItem("uinfo")===null){
            toast.info("Please login to access the page")
            navigate("/login")
        }     
    },[]) 

    return(
        <>
            <div id="page-content">
                {
                    oitems.length>0?
                    <>
                    <div className="page section-header text-center">
                        <div className="page-title">
                            <div className="wrapper"><h1 className="page-width">List of Order Items</h1></div>
                        </div>
                    </div>
                    <table className="text-center">
                        <tbody>
                            <tr>
                                <th>Picture</th>
                                <th>Name</th>
                                <th>Rate</th>
                                <th>Quantity</th>
                                <th>Total Cost</th>
                            </tr>
                            {
                                oitems.map((data,i)=>
                                    <tr key={i}>
                                        <td><img src={`uploads/${data.picname}`} height='75' alt="pic"/></td>
                                        <td>{data.pname}</td>
                                        <td>{data.rate}</td>
                                        <td>{data.qty}</td>
                                        <td>{data.totalcost}</td>
                                    </tr>
                                        
                                )
                            }
                            <br></br>
                            {oitems.length} items found
                        </tbody>
                    </table>
                    </>:null

                }
                

                

            </div>
        </>
    )
}

export default OrderItems;