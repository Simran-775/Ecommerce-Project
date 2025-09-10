import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { datacontext } from "../App";
function Details() {
    const [params] = useSearchParams()
    const pid = params.get("id")
    const [pinfo, setpinfo] = useState([])
    const [discount, setdiscount] = useState()
    const [remcost, setremcost] = useState()
    const [qty, setqty] = useState()
    const navigate = useNavigate()
    const { udata } = useContext(datacontext)
    const [availqty, setavailqty] = useState([]);
    async function fetchproddetails() {
        try {
            const apiresp = await axios.get(`${process.env.REACT_APP_APIURL}/api/getproddetailsbyid?prodid=${pid}`)
            if (apiresp.data.success === 1) {
                setpinfo(apiresp.data.pdata)
            }
            else if (apiresp.data.success === 0) {
                setpinfo([])
            }
            else {
                toast.error("Some error occured,try again")
            }
        }
        catch (e) {
            toast.error("Error Occured " + e.message)
        }
    }

    useEffect(() => {
        if (pid !== "") {
            fetchproddetails()
        }
    }, [pid])

    useEffect(() => {
        var disc = pinfo.rate * pinfo.discount / 100
        setremcost(pinfo.rate - disc);
        setdiscount(disc)
        var stockarr = []
        if (pinfo.stock > 10) {
            for (var x = 1; x <= 10; x++) {
                stockarr.push(x);
            }
        }
        else {
            for (var x = 1; x <= pinfo.stock; x++) {
                stockarr.push(x);
            }
        }
        setavailqty(stockarr)
    }, [pinfo])

    async function handleSubmit(e) {
        e.preventDefault()
        if (udata !== null) {
            try {
                var tc = remcost * qty
                const apidata = { pid, prodname: pinfo.prodname, remcost, qty, tc, picname: pinfo.picname, uname: udata.username }
                const apiresp = await axios.post(`${process.env.REACT_APP_APIURL}/api/savetocart`, apidata)
                if (apiresp.data.success === 1) {
                    navigate("/showcart")
                }
                else if (apiresp.data.success === 0) {
                    toast.info("Problem while adding product to cart,try again")
                }
                else {
                    toast.error("Some error occured, try again")
                }
            }
            catch (e) {
                toast.error("Error Occured " + e.message)
            }
        }
        else {
            toast.info("Please login to add to cart")
            navigate("/login")
        }
    }

    return (

        <div id="page-content">
            <div id="MainContent" className="main-content" role="main">
                {/* <div className="bredcrumbWrap">
                    <div className="container breadcrumbs">
                        <Link to="/">Home</Link><span aria-hidden="true"></span><span>product</span>
                    </div>
                </div> */}

                <div id="ProductSection-product-template" className="product-template__container prstyle2 container">
                    <div className="product-single product-single-1">
                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                                <div className="product-details-img product-single__photos bottom">
                                    <div className="zoompro-wrap product-zoom-right pl-20">
                                        <div className="zoompro-span prodimagecss">
                                            <img className="blur-up lazyload zoompro" alt="" src={`uploads/${pinfo.picname}`} />
                                        </div>
                                    </div>

                                </div>
                                <div className="prFeatures">
                                    <div className="row">

                                    </div>
                                </div>
                            </div>


                            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                                <br /><br /><br />
                                <div className="product-single__meta">
                                    <h1 className="product-single__title">{pinfo.prodname}</h1>
                                    <div className="product-nav clearfix">
                                        <a href="#" className="next" title="Next"><i className="fa fa-angle-right" aria-hidden="true"></i></a>
                                    </div>

                                    <p className="product-single__price product-single__price-product-template">
                                        <span className="visually-hidden">Regular price</span>
                                        <s id="ComparePrice-product-template"><span className="money">₹{pinfo.rate}</span></s>
                                        <span className="product-price__price product-price__price-product-template product-price__sale product-price__sale--single">
                                            <span id="ProductPrice-product-template"><span className="money">₹{remcost}</span></span>
                                        </span>
                                        <span className="discount-badge"> <span className="devider">|</span>&nbsp;
                                            <span>You Save</span>
                                            <span id="SaveAmount-product-template" className="product-single__save-amount">
                                                <span className="money">₹{discount}</span>
                                            </span>
                                            <span className="off">(<span>{pinfo.discount}</span>%)</span>
                                        </span>
                                    </p>
                                    <div className="product-single__description rte">
                                        <p>{pinfo.description}</p>
                                    </div>
                                    <form method="post" action="http://annimexweb.com/cart/add" id="product_form_10508262282" accept-charset="UTF-8" className="product-form product-form-product-template hidedropdown" enctype="multipart/form-data">
                                        <div className="swatch clearfix swatch-0 option1" data-option-index="0">

                                        </div>
                                        <div className="swatch clearfix swatch-1 option2" data-option-index="1">

                                        </div>
                                        {pinfo.stock > 0 ?

                                            <div className="product-action clearfix">

                                                <div className="form-group">
                                                    <select name="qty" onClick={(e) => setqty(e.target.value)}>
                                                        <option value="">Choose Quantity</option>
                                                        {
                                                            availqty.length > 0 ?
                                                                availqty.map((st, i) =>
                                                                    <option key={i}>{st}</option>
                                                                ) : null
                                                        }
                                                    </select>
                                                </div>



                                                <div className="product-form__item--submit">

                                                    <button type="button" name="add" className="btn product-form__cart-submit" onClick={handleSubmit}>
                                                        <span>Add to cart</span>
                                                    </button>
                                                    


                                                </div>
                                            </div> :<div>
                                                        <h2>Not in stock</h2>
                                                    </div>}
                                    </form>
                                    <div className="display-table shareRow">
                                        <div className="display-table-cell medium-up--one-third">
                                            <div className="wishlist-btn">
                                                <a className="wishlist add-to-wishlist" href="#" title="Add to Wishlist"><i className="icon anm anm-heart-l" aria-hidden="true"></i> <span>Add to Wishlist</span></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default Details