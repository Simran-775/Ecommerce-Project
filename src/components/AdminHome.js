import { Link } from "react-router-dom"

function AdminHome(){
    return(
        <div className="page section-header text-center">
			<div className="page-title">
        		<div className="wrapper"><h1 className="page-width">Welcome Admin</h1></div>
                <Link to="/savecategory">Manage Category</Link><br/>
                <Link to="/addproduct">Manage Product</Link>

      		</div>

		</div>
    )
}

export default AdminHome