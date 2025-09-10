import { useEffect, useState } from "react"
import {toast} from "react-toastify"
import axios from 'axios';
import { useNavigate } from "react-router-dom";
function ListofUsers(){
    const [uname,setuname] = useState()
    const [allinfo,setallinfo] = useState([])
    const navigate = useNavigate();
    async function fetchallusers(){
        try{
            const apiresp = await axios.get(`${process.env.REACT_APP_APIURL}/api/listofusers`,{headers: {authorization:sessionStorage.getItem('jtoken')}})
            if(apiresp.data.success===1){
                setallinfo(apiresp.data.udata)
            }
            else if(apiresp.data.success === 0){
                setallinfo([])
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
    async function handleSubmit(id){
        try{
            if(window.confirm("Are you sure that you want to delete?")){
                const apiresp = await axios.delete(`${process.env.REACT_APP_APIURL}/api/deluser/${id}`)
                if (apiresp.data.success === 1) {
                    toast.info("User deleted successfully")
                    fetchallusers();
                }
                else if (apiresp.data.success === 0) {
                    setallinfo([])
                    toast.info("User not deleted")
                }
                else {
                    toast.error("Some error occured, try again")
                }
            }
            
        }
        catch(e)
        {
            toast.error("Error occured" + e.message)
        }
    }

    useEffect(()=>{
        fetchallusers();
    },[])

    useEffect(()=>{
        if(sessionStorage.getItem("uinfo")===null){
            toast.info("Please login to access the page")
            navigate("/login")
        }
        else if(sessionStorage.getItem("uinfo")!=null){
            const userdata = JSON.parse(sessionStorage.getItem("uinfo"))
            if(userdata.usertype!=="admin"){
                toast.info("Please login with proper credentials to access the page");
                navigate("/login")
            }
        }
    },[])

    return(
        <>
            <div id="page-content">
                {
                    allinfo.length>0?
                    <>
                    <div className="page section-header text-center">
                        <div className="page-title">
                            <div className="wrapper"><h1 className="page-width">List of Users</h1></div>
                        </div>
                    </div>
                    <table className="text-center">
                        <tbody>
                            <tr>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Username</th>
                                <th>Delete</th>
                            </tr>
                            {
                                allinfo.map((data,i)=>
                                    <tr key={i}>
                                        <td>{data.name}</td>
                                        <td>{data.phone}</td>
                                        <td>{data.username}</td>
                                        <td><button className="btn btn-danger" onClick={()=>handleSubmit(data._id)}>Delete</button></td>
                                    </tr>
                                        
                                )
                            }
                            <br></br>
                            {allinfo.length} users found
                        </tbody>
                    </table>
                    </>:null

                }
                

                

            </div>
        </>
    )
}

export default ListofUsers;