import { useRef, useState } from "react"
import {toast} from "react-toastify"
import axios from 'axios';
function ManageCategory(){
    const [cname,setcname] = useState()
    const fileInput = useRef(null);
    async function handleSubmit(e){
        e.preventDefault();
        try{
            const formdata = new FormData();
            formdata.append("catname",cname)
            if (fileInput.current.files.length > 0) {
                formdata.append('pic', fileInput.current.files[0]);
            }
            const apiresp = await axios.post('http://localhost:9000/api/savecategory',formdata)
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
                                                <input type="text" name="cname" placeholder="" value={cname} onChange={(e) => setcname(e.target.value)}/>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                                            <div className="form-group">
                                                <label for="CategoryPic">Add Category Pic</label>
                                                <input style={{border:'0px'}} type="file" name="cpic"  ref={fileInput}/>
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

export default ManageCategory;
 