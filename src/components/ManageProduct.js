import { useEffect, useRef, useState } from "react"
import {toast} from "react-toastify"
import axios from 'axios';
function ManageProduct(){
    const [catdata,setcatdata] = useState([])

    const [catid,setcatid] = useState()
    const [pname,setpname] = useState()
    const [rate,setrate] = useState("")
    const [disc,setdisc] = useState()
    const [stock,setstock] = useState()
    const [feat,setfeat] = useState()
    const [desc,setdesc] = useState();
    const [picfile,setpicfile] = useState()
    const fileInput = useRef(null);

    async function handleSubmit(e){
        e.preventDefault();
        try{
            const formdata = new FormData();
            formdata.append("cid",catid);
            formdata.append("pname",pname);
            formdata.append("rate",rate);
            formdata.append("disc",disc);
            formdata.append("stock",stock);
            formdata.append("feat",feat);
            formdata.append("description",desc);
            if(picfile!=null)
            {
                formdata.append("pic",picfile)
            }
            // if (fileInput.current.files.length > 0) {
            //     formdata.append('pic', fileInput.current.files[0]);
            // }
            const apiresp = await axios.post('http://localhost:9000/api/saveproduct',formdata)
            if(apiresp.data.success===1){
                toast.success("Product added successfully")
                clear();   
            }
            else if(apiresp.data.success === 0){
                toast.error("Product not added")
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

    function clear(){
        setcatid("");
        setpname('')
        setrate("")
        setdisc("")
        setstock("")
        setfeat("")
        setdesc("")
        setpicfile(null)
        fileInput.current.value = "";
    }

    async function fetchcatagory(){
        try{
            const apiresp = await axios.get("http://localhost:9000/api/getallcat")
            if(apiresp.data.success===1)
            {
                setcatdata(apiresp.data.cdata)
            }
            else if(apiresp.data.success===0)
            {
                setcatdata([])
                toast.info("No categories found")
            }
            else{
                toast.error("Some error occured,try again")
            }
    }
    catch(e)
    {
        toast.error("Error Occured "+e.message)
    }
    }

    useEffect(()=>{
        fetchcatagory()
    },[])

    return(
        <>
            <div id="page-content">
    	<div className="page section-header text-center">
			<div className="page-title">
        		<div className="wrapper"><h1 className="page-width">Add new Product</h1></div>
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
                                                <select name="catname" value={catid} onChange={(e)=>setcatid(e.target.value)}>
                                                    <option value="">Choose Category</option>
                                                    {
                                                        catdata.length>0?
                                                        catdata.map((data,i)=>
                                                            <option value={data._id} key={i}>{data.catname}</option>
                                                        ):null
                                                    }
                                                </select>
                                                
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                                            <div className="form-group">
                                                <label for="Cname">Product Name</label>
                                                <input type="text" name="cname" placeholder=""  value={pname} onChange={(e) => setpname(e.target.value)}/>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                                            <div className="form-group">
                                                <label for="rate">Rate</label>
                                                <input type="text" name="rate" placeholder="" value={rate} onChange={(e) => setrate(e.target.value)}/>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                                            <div className="form-group">
                                                <label for="disc">Discount</label>
                                                <input type="text" name="discount" placeholder="" value={disc} onChange={(e) => setdisc(e.target.value)}/>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                                            <div className="form-group">
                                                <label for="stock">Stock</label>
                                                <input type="text" name="stock" placeholder="" value={stock} onChange={(e) => setstock(e.target.value)}/>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                                            <div className="form-group">
                                        
                                                <label><input type="radio" name="featured" checked={feat === "Yes"} value="Yes" onChange={(e)=>setfeat(e.target.value)}/>Yes</label> &nbsp; &nbsp;
                                                <label><input type="radio" name="featured" value="No" checked={feat === "No"} onChange={(e)=>setfeat(e.target.value)}/>No</label>
                                            </div>
                                        </div>

                                        <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                                            <div className="form-group">
                                                <label>Enter description of your Product</label><textarea value={desc} onChange={(e)=>setdesc(e.target.value)}></textarea>
                                            </div>
                                        </div>
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
                                            <input type="submit" className="btn mb-3" value="Add Category"/>
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

export default ManageProduct;
 