import { useEffect, useRef, useState } from "react"
import { toast } from "react-toastify"
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import useCategories from "../hooks/useCategories";
function ManageSubCat() {
    const navigate = useNavigate();
    const {catdata, setcatdata, fetchcategory} = useCategories()
    const [catid, setcatid] = useState("")
    const [subcatname,setsubcatname] = useState();
    const [picfile, setpicfile] = useState()
    // const [imgname, setimgname] = useState()
    const fileInput = useRef(null);
    const [editmode, seteditmode] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const formdata = new FormData();
            formdata.append("cid", catid);
            formdata.append("subcatname", subcatname);
            if (picfile != null) {
                formdata.append("pic", picfile)
            }
            const apiresp = await axios.post(`${process.env.REACT_APP_APIURL}/api/savesubcategory`, formdata)
            if (apiresp.data.success === 1) {
                toast.success("Sub Category added successfully")
                clear();
            }
            else if (apiresp.data.success === 0) {
                toast.error("Sub category not added")
            }
            else {
                toast.error("Some error occured try again")
            }
        }
        catch (e) {
            toast.error("Error Occured " + e.message)
        }
    }

    function clear() {
        setcatid("");
        setpicfile(null)
        fileInput.current.value = "";
    }

    // async function fetchprodsbycat() {
    //     try {
    //         const apiresp = await axios.get(`${process.env.REACT_APP_APIURL}/api/getprodsbycat?cid=${catid}`)
    //         if (apiresp.data.success === 1) {
    //             setprodsdata(apiresp.data.pdata)
    //         }
    //         else if (apiresp.data.success === 0) {
    //             setprodsdata([])
    //             toast.info("No products under this found")
    //         }
    //         else {
    //             toast.error("Some error occured,try again")
    //         }
    //     }
    //     catch (e) {
    //         toast.error("Error Occured " + e.message)
    //     }
    // }

    // useEffect(() => {
    //     if (catid !== "") {
    //         fetchprodsbycat()
    //     }
    // }, [catid])


    // async function handledelete(id) {
    //     try {
    //         if (window.confirm("Are you sure that you want to delete?")) {
    //             const apiresp = await axios.delete(`${process.env.REACT_APP_APIURL}/api/delprod/${id}`)
    //             if (apiresp.data.success === 1) {
    //                 toast.info("Product deleted successfully")
    //                 fetchprodsbycat();
    //             }
    //             else if (apiresp.data.success === 0) {
    //                 setprodsdata([])
    //                 toast.info("Category not deleted")
    //             }
    //             else {
    //                 toast.error("Some error occured, try again")
    //             }
    //         }

    //     }
    //     catch (e) {
    //         toast.error("Error occured" + e.message)
    //     }
    // }


    // function handleupdate(data) {
    //     // setcatdata(data.catid)
    //     setpname(data.prodname)
    //     setrate(data.rate)
    //     setdisc(data.discount)
    //     setstock(data.stock)
    //     setfeat(data.featured)
    //     setdesc(data.description)
    //     setimgname(data.picname)
    //     seteditmode(true)
    //     setpid(data._id)
    // }

    function handlecancel() {
        // seteditmode(false)
        setcatdata("")
        setsubcatname("")
        // setimgname("")
        setpicfile(null)
        fileInput.current.value = "";
    }

    // const updateproduct = async () => {
    //     try {
    //         const formdata = new FormData();
    //         formdata.append("catid", catid)
    //         formdata.append("prodname", pname)
    //         formdata.append("rate", rate)
    //         formdata.append("discount", disc)

    //         formdata.append("stock", stock)
    //         formdata.append("featured", feat)
    //         formdata.append("description", desc)
    //         formdata.append("oldpicname", imgname)
    //         formdata.append("pid", pid)

    //         if (picfile != null) {
    //             formdata.append("pic", picfile)
    //         }
    //         const apiresp = await axios.put("${process.env.REACT_APP_APIURL}/api/updateproduct", formdata)
    //         if (apiresp.data.success === 1) {
    //             toast.success("Product updated successfully")
    //             handlecancel()
    //         }
    //         else if (apiresp.data.success === 0) {
    //             toast.info("Product not updated")
    //         }
    //         else {
    //             toast.error("Some error occured,try again")
    //         }
    //     }
    //     catch (e) {
    //         toast.error("Error occured" + e.message)
    //     }

    // }

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
    
    return (
        <>
            <div id="page-content">
                <div className="page section-header text-center">
                    <div className="page-title">
                        <div className="wrapper"><h1 className="page-width">Add New Sub Category</h1></div>
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
                                                <select name="catname" value={catid} onChange={(e) => setcatid(e.target.value)}>
                                                    <option value="">Choose Category</option>
                                                    {
                                                        catdata.length > 0 ?
                                                            catdata.map((data, i) =>
                                                                <option value={data._id} key={i}>{data.catname}</option>
                                                            ) : null
                                                    }
                                                </select>

                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                                            <div className="form-group">
                                                <label for="SubCategoryName">Sub Category Name</label>
                                                <input type="text" value={subcatname} name="subcatname" placeholder="Sub Category Name" required="" onChange={(e)=>setsubcatname(e.target.value)} />

                                            </div>
                                        </div>

                                        {/* {editmode ? <>&nbsp;&nbsp;<img src={`uploads/${imgname}`} height={75} alt="catpic" /></> : null} */}

                                        <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                                            <div className="form-group">
                                                <label for="picfile">Add Pic</label>
                                                <input style={{ border: '0px' }} type="file" name="cpic" ref={fileInput}
                                                    onChange={(e) => setpicfile(e.target.files[0])} />
                                            </div>
                                        </div>

                                    </div>
                                      <div className="row">
                                                <div className="text-center col-12 col-sm-12 col-md-12 col-lg-12">
                                                    <input type="submit" className="btn mb-3" value="Add Product" />
                                                </div>
                                            </div>          
                                    {/* {
                                    //     editmode ?
                                    //         <>
                                    //             <br /><div align="center"><input type="button" className="btn btn-primary" name="btn" value="Update Category" onClick={updateproduct} /> &nbsp;
                                    //                 <input type="button" className="btn btn-primary" name="btn" value="Cancel" onClick={handlecancel} /></div>
                                    //             <br />
                                    //         </> : <><div className="row">
                                    //             <div className="text-center col-12 col-sm-12 col-md-12 col-lg-12">
                                    //                 <input type="submit" className="btn mb-3" value="Add Product" />
                                    //             </div>
                                    //         </div></>
                                    // } */}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                {/* {
                    prodsdata.length > 0 ?
                        <>
                            <div className="page section-header text-center">
                                <div className="page-title">
                                    <div className="wrapper"><h1 className="page-width">Added Products</h1></div>
                                </div>
                            </div>
                            <table className="text-center">
                                <tbody>
                                    <tr>
                                        <th>Picture</th>
                                        <th>Name</th>
                                        <th>Rate</th>
                                        <th>Update</th>
                                        <th>Delete</th>
                                    </tr>
                                    {
                                        prodsdata.map((data, i) =>
                                            <tr key={i}>
                                                <td><img src={`uploads/${data.picname}`} height='75' alt="prodspic" /></td>
                                                <td>{data.prodname}</td>
                                                <td>{data.rate}</td>
                                                <td><button onClick={() => handleupdate(data)} className="btn btn-primary">Update</button></td>
                                                <td><button className="btn btn-danger" onClick={() => handledelete(data._id)}>Delete</button></td>
                                            </tr>

                                        )
                                    }
                                    <br></br>
                                </tbody>
                            </table>
                        </> : null

                } */}

            </div>
        </>
    )
}

export default ManageSubCat;
