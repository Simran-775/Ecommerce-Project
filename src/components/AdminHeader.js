import { useContext, useState } from 'react'
import {Link, Links, useNavigate} from 'react-router-dom'
import { datacontext } from '../App'
import { toast } from 'react-toastify'
function AdminHeader(){
  const [stext,setstext] = useState()
  const {udata,setudata} = useContext(datacontext)
  const [showSearch,setShowSearch] = useState(false)
  const navigate = useNavigate()
  function handlelogout(){
    setudata(null)
    navigate("/login")
    toast.info("You have successfully Logged out")
  }
    return(
        <>
    <div className="top-header">
        <div className="container-fluid">
            <div className="row">
            	<div className="col-10 col-sm-8 col-md-5 col-lg-4">
                    
                    <p className="phone-no"><i className="anm anm-phone-s"></i> +440 0(111) 044 833</p>
                </div>
                <div className="col-sm-4 col-md-4 col-lg-4 d-none d-lg-none d-md-block d-lg-block">
                	<div className="text-center"><p className="top-header_middle-text"> 
                    Welcome {udata===null?"Guest":udata.name}
                    </p></div>
                </div>
                <div className="col-2 col-sm-4 col-md-3 col-lg-4 text-right">
                	<span className="user-menu d-block d-lg-none"><i className="anm anm-user-al" aria-hidden="true"></i></span>
                    <ul className="customer-links list-inline">
                      {
                        udata===null?
                        <>
                          <li><Link to="/login">Login</Link></li>
                          <li><Link to="/register">Create Account</Link></li>
                        </>:
                        <>
                          <li><Link to="/changepassword">Change Password</Link></li>
                          <li><button className=' btn-primary' onClick={handlelogout}>Logout</button></li>
                          <li><Link to="/orderhistory">Order History</Link></li>
                        </>
                      }
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div className="header-wrap animated d-flex">
    	<div className="container-fluid">        
            <div className="row align-items-center">
                <div className="logo col-md-2 col-lg-2 d-none d-lg-block">
                    <Link to="/adminhome">
                    	<img src="assets/images/logo.svg" alt="Belle Multipurpose Html Template" title="Belle Multipurpose Html Template" />
                    </Link>
                </div>
                <div className="col-2 col-sm-3 col-md-3 col-lg-8">
                	<nav className="grid__item" id="AccessibleNav" role="navigation">
                        <ul id="siteNav" className="site-nav medium center hidearrow">
                            <li className="lvl1 parent megamenu"><Link to="/adminhome">Home <i className="anm anm-angle-down-l"></i></Link>
                                
                            </li>
                        <li className="lvl1 parent dropdown"><a href="#">Users <i className="anm anm-angle-down-l"></i></a>
                          <ul className="dropdown">
                            <li><Link to="listofusers" className="site-nav">List of Users</Link></li>
                            <li><Link to="searchuser" className="site-nav">Search Users</Link></li>
                          </ul>
                        </li>
                        <li className="lvl1 parent dropdown"><a href="#">Manage <i className="anm anm-angle-down-l"></i></a>
                          <ul className="dropdown">
                            <li><Link to="addproduct" className="site-nav">Manage Products</Link></li>
                            <li><Link to="savecategory" className="site-nav">Manage Categories</Link></li>
                            <li><Link to="addsubcategory" className="site-nav">Manage Sub Categories</Link></li>
                          </ul>
                        </li>
                        <li className="lvl1 parent dropdown"><Link to="vieworders">Orders <i className="anm anm-angle-down-l"></i></Link>
                        </li>
                        
                        
                      </ul>
                    </nav>
                </div>
                <div className="col-4 col-sm-3 col-md-3 col-lg-2">
                	<div className="site-cart">
                    {
                      udata!==null?<Link to="/showcart" className="site-header__cart" title="Cart">
                        	<i className="icon anm anm-bag-l"></i>
                            {/* <span id="CartCount" className="site-header__cart-count" data-cart-render="item_count">2</span> */}
                        </Link>:null
                    }
                    	
                  </div>
                    <div className="site-header__search">
                    	<button type="button" className="search-trigger" onClick={() => setShowSearch(true)}><i className="icon anm anm-search-l"></i></button>
                    </div>
                </div>
        	</div>
        </div>
    </div>
        </>
    )
}

export default AdminHeader