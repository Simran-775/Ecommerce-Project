import { useContext, useEffect, useRef, useState } from "react"
import { toast } from "react-toastify"
import axios from 'axios';
import { datacontext } from "../App";
import { useNavigate } from "react-router-dom";
function ShowCart() {
    const {udata} = useContext(datacontext)
    const [cartdata,setcartdata] = useState([])
    const [gtotal,setgtotal] = useState()
    const navigate = useNavigate()
    async function fetchCart(){
        try{
            const apiresp = await axios.get(`${process.env.REACT_APP_APIURL}/api/getcart?uname=${udata.username}`)
            if(apiresp.data.success===1)
            {
                setcartdata(apiresp.data.cdata)
            }
            else if(apiresp.data.success===0)
            {
                setcartdata([])
                toast.info("No products added in your cart yet")
            }
            else
            {
                toast.error("Some error occured, try again")
            }
        }
        catch(e)
        {
            toast.error("Error Occured " + e.message)
        }    
    }
    useEffect(()=>
    {
        if(udata!==null)
        {
            fetchCart();
        }
    },[udata])

    useEffect(()=>{
        if(sessionStorage.getItem("uinfo")===null){
            toast.info("Please login to access the page")
            navigate("/login")
        }     
    },[])
    
    async function handleDelete(id){
        try{
            if(window.confirm("Are you sure to delete?")){
                const apiresp = await axios.delete(`${process.env.REACT_APP_APIURL}/api/delfromcart/${id}`)
                if (apiresp.data.success === 1){
                    toast.success("Product deleted from cart successfully")
                    fetchCart()                
                }
                else if(apiresp.data.success===0)
                {
                    toast.info("Product not deleted")
                }
                else
                {
                    toast.error("Some error occured, try again")
                }
            }
        }
        catch(e)
        {
            toast.error("Error Occured " + e.message)
        }
    }

    useEffect(()=>{
        var total = 0
        for (var x=0;x<cartdata.length;x++)
        {
            total+=cartdata[x].totalcost
        }
        setgtotal(total)
    },[cartdata])

    function checkout(){
        sessionStorage.setItem("carttotal",gtotal);
        navigate("/checkout")
    }
    return (
        <>
            <div id="page-content">
                <div className="page section-header text-center">
                                <div className="page-title">
                                    <div className="wrapper"><h1 className="page-width">Your Shopping Cart</h1></div>
                                </div>
                            </div>
                {
                    cartdata.length > 0 ?
                        <>
                            
                            <table className="text-center">
                                <tbody>
                                    <tr>
                                        <th>Picture</th>
                                        <th>Name</th>
                                        <th>Rate</th>
                                        <th>Quantity</th>
                                        <th>Total cost</th>
                                        <th>Delete</th>
                                    </tr>
                                    {
                                        cartdata.map((data, i) =>
                                            <tr key={i}>
                                                <td><img src={`uploads/${data.picname}`} height='75' alt="prodspic" /></td>
                                                <td>{data.pname}</td>
                                                <td>{data.rate}</td>
                                                <td>{data.qty}</td>
                                                <td>{data.totalcost}</td>
                                                <td><button className="btn btn-danger" onClick={()=>handleDelete(data._id)}>Delete</button></td>
                                            </tr>

                                        )
                                    }
                                    <br></br>
                                </tbody>
                                <h4>{cartdata.length} products found in cart</h4>
                                <h4>Total Bill: {gtotal}</h4>
                            </table>
                            <div className="row">
                            <div className="text-center col-12 col-sm-12 col-md-12 col-lg-12">
                                <button type="button" className="btn mb-3" onClick={checkout}>Checkout</button>
                            </div>
                         </div>
                        </> : <h4>Your Cart is Empty</h4>

                }

            </div>
        </>
    )
}

export default ShowCart;
