import { useContext, useState } from 'react'
import {Link, Links, useNavigate} from 'react-router-dom'
import { datacontext } from '../App'
import { toast } from 'react-toastify'
function Header(){
  const [stext,setstext] = useState()
  const {udata,setudata} = useContext(datacontext)
  const [showSearch,setShowSearch] = useState(false)
  const [Show,setShow] = useState(false)
  const navigate = useNavigate()
  function handlelogout(){
    setudata(null)
    navigate("/login")
    toast.info("You have successfully Logged out")
  }
  function handlesubmit(){
    navigate("/search?s")
  }
    return(
        <>
        {showSearch?
        <div className="searche">
        <div className="search-form">
            <form className="search-bar__form" onSubmit={handlesubmit}>
                <button className="gobtn search-button" type="submit"><i className="icon anm anm-search-l"></i></button>
                <input className="search-input" type="search" name="q" placeholder="Search entire store..." onChange={(e)=>setstext(e.target.value)}/>
            </form>
            <button type="button" className="search-trigger clos-btn" onClick={()=>setShowSearch(false)}><i className="anm anm-times-l"></i></button>
        </div>
    </div>:null}
    <div className="top-header">
        <div className="container-fluid">
            <div className="row">
            	<div className="col-10 col-sm-8 col-md-5 col-lg-4">
                    <div className="currency-picker">
                        <span className="selected-currency">USD</span>
                        <ul id="currencies">
                            <li data-currency="INR" className="">INR</li>
                            <li data-currency="GBP" className="">GBP</li>
                            <li data-currency="CAD" className="">CAD</li>
                            <li data-currency="USD" className="selected">USD</li>
                            <li data-currency="AUD" className="">AUD</li>
                            <li data-currency="EUR" className="">EUR</li>
                            <li data-currency="JPY" className="">JPY</li>
                        </ul>
                    </div>
                    <div className="language-dropdown">
                        <span className="language-dd">English</span>
                        <ul id="language">
                            <li className="">German</li>
                            <li className="">French</li>
                        </ul>
                    </div>
                    <p className="phone-no"><i className="anm anm-phone-s"></i> +440 0(111) 044 833</p>
                </div>
                <div className="col-sm-4 col-md-4 col-lg-4 d-none d-lg-none d-md-block d-lg-block">
                	<div className="text-center"><p className="top-header_middle-text"> 
                    Welcome {udata===null?"Guest":udata.name}
                    </p></div>
                </div>
                <div className="col-2 col-sm-4 col-md-3 col-lg-4 text-right">
                	<span className="user-menu d-block d-lg-none"><i className="anm anm-user-al"></i></span>
                  
                  
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
                        </>
                      }
                        
                        <li><a href="wishlist.html">Wishlist</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div className="header-wrap animated d-flex">
    	<div className="container-fluid">        
            <div className="row align-items-center">
                <div className="logo col-md-2 col-lg-2 d-none d-lg-block">
                    <Link to="/homepage">
                    	<img src="assets/images/logo.svg" alt="Belle Multipurpose Html Template" title="Belle Multipurpose Html Template" />
                    </Link>
                </div>
                <div className="col-2 col-sm-3 col-md-3 col-lg-8">
                  <div className="d-block d-lg-none">
                        <button type="button" className="btn--link site-header__menu js-mobile-nav-toggle mobile-nav--open">
                        	<i className="icon anm anm-times-l"></i>
                            <i className="anm anm-bars-r"></i>
                        </button>
                    </div>
                	<nav className="grid__item" id="AccessibleNav" role="navigation">
                        <ul id="siteNav" className="site-nav medium center hidearrow">
                            <li className="lvl1 parent megamenu"><Link to="/homepage">Home <i className="anm anm-angle-down-l"></i></Link>
                                
                            </li>
                            <li className="lvl1 parent megamenu"><Link to="/categories">Shop <i className="anm anm-angle-down-l"></i></Link>                       </li>
                        <li className="lvl1 parent megamenu"><Link to="/contactus">Contact Us <i className="anm anm-angle-down-l"></i></Link>
                        	
                        </li>
                        
                      </ul>
                    </nav>
                </div>
                <div className="col-6 col-sm-6 col-md-6 col-lg-2 d-block d-lg-none mobile-logo">
                    <div className="logo">
                        <Link to="/homepage">
                            <img src="assets/images/logo.svg" alt="Belle Multipurpose Html Template" title="Belle Multipurpose Html Template" />
                        </Link>
                    </div>
                </div>
                <div className="col-4 col-sm-3 col-md-3 col-lg-2">
                	<div className="site-cart">
                    {
                      udata!==null?<Link to="/showcart" className="site-header__cart" title="Cart">
                        	<i className="icon anm anm-bag-l"></i>
                            <span id="CartCount" className="site-header__cart-count" data-cart-render="item_count">2</span>
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

    {/* <div className="mobile-nav-wrapper" role="navigation">
		<div className="closemobileMenu"><i className="icon anm anm-times-l pull-right"></i> Close Menu</div>
        <ul id="MobileNav" className="mobile-nav">
        	<li className="lvl1 parent megamenu"><Link to="/homepage">Home <i className="anm anm-plus-l"></i></Link>
        </li>
        	<li className="lvl1 parent megamenu"><a href="#">Shop <i className="anm anm-plus-l"></i></a></li>
        	<li className="lvl1 parent megamenu"><a href="product-layout-1.html">Product <i className="anm anm-plus-l"></i></a></li>
        	<li className="lvl1 parent megamenu"><a href="about-us.html">Pages <i className="anm anm-plus-l"></i></a>
            </li>
        	<li className="lvl1 parent megamenu"><a href="blog-left-sidebar.html">Blog <i className="anm anm-plus-l"></i></a>
        </li>
        	<li className="lvl1"><a href="#"><b>Buy Now!</b></a>
        </li>
      </ul>
	</div> */}
        </>
    )
}

export default Header


{/* <div className="megamenu style1">
                                    <ul className="grid mmWrapper">
                                        <li className="grid__item large-up--one-whole">
                                            <ul className="grid">
                                                <li className="grid__item lvl-1 col-md-3 col-lg-3"><a href="#" className="site-nav lvl-1">Category 1</a>
                                                    <ul className="subLinks">
                                                      <li className="lvl-2"><a href="index.html" className="site-nav lvl-2">Classic</a></li>
                                                      <li className="lvl-2"><a href="home2-default.html" className="site-nav lvl-2">Default</a></li>
                                                      <li className="lvl-2"><a href="home15-funiture.html" className="site-nav lvl-2">Furniture <span className="lbl nm_label1">New</span></a></li>
                                                      <li className="lvl-2"><a href="home5-cosmetic.html" className="site-nav lvl-2">Cosmetic</a></li>
                                                      <li className="lvl-2"><a href="home6-modern.html" className="site-nav lvl-2">Modern</a></li>
                                                      <li className="lvl-2"><a href="home7-shoes.html" className="site-nav lvl-2">Shoes</a></li>
                                                    </ul>
                                                  </li>
                                                <li className="grid__item lvl-1 col-md-3 col-lg-3"><a href="#" className="site-nav lvl-1">Group 2</a>
                                                    <ul className="subLinks">
                                                        <li className="lvl-2"><a href="home8-jewellery.html" className="site-nav lvl-2">Jewellery</a></li>
                                                        <li className="lvl-2"><a href="home9-parallax.html" className="site-nav lvl-2">Parallax</a></li>
                                                        <li className="lvl-2"><a href="home11-grid.html" className="site-nav lvl-2">Grid</a></li>
                                                        <li className="lvl-2"><a href="home12-category.html" className="site-nav lvl-2"> Category</a></li>
                                                        <li className="lvl-2"><a href="home14-bags.html" className="site-nav lvl-2">Bags <span className="lbl nm_label1">New</span></a></li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div> */}


{/* <li className="lvl1 parent dropdown"><a href="#">Pages <i className="anm anm-angle-down-l"></i></a>
                          <ul className="dropdown">
                            <li><a href="contact-us.html" className="site-nav">Contact Us</a></li>
                            <li><a href="faqs.html" className="site-nav">FAQs</a></li>
                            <li><a href="lookbook1.html" className="site-nav">Lookbook<i className="anm anm-angle-right-l"></i></a></li>
                            <li><a href="404.html" className="site-nav">404</a></li>
                          </ul>
                        </li> */}
                        {/* <li className="lvl1 parent dropdown"><a href="#">Blog <i className="anm anm-angle-down-l"></i></a></li> */}