import { useRef, useState, useEffect } from "react"
import {toast} from "react-toastify"
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import useCategories from "../hooks/useCategories";
function ManageCategory(){
    const navigate = useNavigate();
    const [cname,setcname] = useState()
    const [editmode,seteditmode] = useState(false)
    const [imgname,setimgname] = useState()
    const [picfile,setpicfile] = useState(null)
    const [catid,setcatid] = useState()
    const fileInput = useRef(null);
    const { catdata, setcatdata, fetchcategory} = useCategories()
    async function handleSubmit(e){
        e.preventDefault();
        try{
            const formdata = new FormData();
            formdata.append("catname",cname)
            if (fileInput.current.files.length > 0) {
                formdata.append('pic', fileInput.current.files[0]);
            }
            const apiresp = await axios.post(`${process.env.REACT_APP_APIURL}/api/savecategory`,formdata)
            if(apiresp.data.success===1){
                toast.success("Category added successfully")
                fileInput.current.value = null;
                setcname("");
            }
            else if(apiresp.data.success === 0){
                toast.error("Category not added")
            }
            else{
                toast.error("Some error occured try again")
            }
        }
        catch(e)
        {
            toast.error("Error Occured "+e.message)
        }
    }


    async function handledelete(id){
        try{
            if(window.confirm("Are you sure that you want to delete?")){
                const apiresp = await axios.delete(`${process.env.REACT_APP_APIURL}/api/delcategory/${id}`)
                if (apiresp.data.success === 1) {
                    toast.info("Category deleted successfully")
                    fetchcategory();
                }
                else if (apiresp.data.success === 0) {
                    setcatdata([])
                    toast.info("Category not deleted")
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

    async function handleupdate(catinfo){
        seteditmode(true)
        setcname(catinfo.catname)
        setimgname(catinfo.picname)
        setcatid(catinfo._id)
    }

    async function handlecancel(){
        seteditmode(false)
        setcname("")
        setimgname("")
        setpicfile(null)
        fileInput.current.value = "";
    }

    const updatecategory = async()=>{
        try{
            const formdata = new FormData();
            formdata.append("catname",cname)
            formdata.append("cid",catid)
            formdata.append("oldpicname",imgname)
            if(picfile!=null){
                formdata.append("pic",picfile)
            }
            const apiresp = await axios.put(`${process.env.REACT_APP_APIURL}/api/updatecategory`,formdata)
            if(apiresp.data.success===1)
            {
                toast.success("Category updated successfully")
                handlecancel()
                fetchcategory();
            }
            else if(apiresp.data.success===0)
            {
                toast.info("Category not updated")
            }
            else{
                toast.error("Some error occured,try again")
            }
        }
        catch(e)
        {
            toast.error("Error occured" + e.message)
        }

    }

    // useEffect(()=>{
    //     if(sessionStorage.getItem("uinfo")===null){
    //         toast.info("Please login to access the page")
    //         navigate("/login")
    //     }
    //     else if(sessionStorage.getItem("uinfo")!=null){
    //         const userdata = JSON.parse(sessionStorage.getItem("uinfo"))
    //         if(userdata.usertype!=="admin"){
    //             toast.info("Please login with proper credentials to access the page");
    //             navigate("/login")
    //         }
    //     }
    // },[])

    return(
        <>
            <div id="page-content">
                <div className="page section-header text-center">
                    <div className="page-title">
                        <div className="wrapper"><h1 className="page-width">Manage Category</h1></div>
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
                                                <label for="CategoryName">Category Name</label>
                                                <input type="text" name="cname" placeholder="" value={cname} onChange={(e) => setcname(e.target.value)} />
                                            </div>
                                        </div>

                                        {editmode?<>&nbsp;&nbsp;<img src = {`uploads/${imgname}`} height={75} alt ="catpic"/></>:null}
                                        <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                                            <div className="form-group">
                                                <label for="CategoryPic">Add Category Pic</label>
                                                <input style={{ border: '0px' }} type="file" name="cpic" ref={fileInput} onChange={(e)=>setpicfile(e.target.files[0])}/>
                                            </div>
                                        </div>
                                    </div>

                                    {
                                        editmode?
                                        <>
                                            <br/><div align="center"><input type="button" className="btn btn-primary" name="btn" value="Update Category" onClick={updatecategory}/> &nbsp;
                                            <input type="button" className="btn btn-primary" name="btn" value="Cancel" onClick={handlecancel} /></div>
                                             <br/>
                                        </>:<><div className="row">
                                            <div className="text-center col-12 col-sm-12 col-md-12 col-lg-12">
                                                <input type="submit" className="btn mb-3" value="Add Category" />
                                            </div>
                                            </div></>
                                    }
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                {
                    catdata.length>0?
                    <>
                    <div className="page section-header text-center">
                        <div className="page-title">
                            <div className="wrapper"><h1 className="page-width">Added Categories</h1></div>
                        </div>
                    </div>
                    <table className="text-center">
                        <tbody>
                            <tr>
                                <th>Pictures</th>
                                <th>Name</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                            {
                                catdata.map((data,i)=>
                                    <tr key={i}>
                                        <td><img src={`uploads/${data.picname}`} height='75' alt="catpic" /></td>
                                        <td>{data.catname}</td>
                                        <td><button onClick={()=>handleupdate(data)} className="btn btn-primary">Update</button></td>
                                        <td><button className="btn btn-danger" onClick={()=>handledelete(data._id)}>Delete</button></td>
                                    </tr>
                                        
                                )
                            }
                            <br></br>
                            {catdata.length} users found
                        </tbody>
                    </table>
                    </>:null

                }

            </div>
        </>
    )
}

export default ManageCategory;
 