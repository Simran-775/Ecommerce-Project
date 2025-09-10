import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import useCategories from "../hooks/useCategories";
function Categories() {
    const { catdata, setcatdata, fetchcategories} = useCategories()
    return (
        <div className="page-content">
            <div className="collection-header">
                <div className="collection-hero">
                    <div className="collection-hero__image"><img className="blur-up lazyload" data-src="assets/images/cat-women.jpg" src="assets/images/cat-women.jpg" alt="Women" title="Women" /></div>
                    <div className="collection-hero__title-wrapper"><h1 className="collection-hero__title page-width">Product Categories</h1></div>
                </div>
            </div>
            <br/><br/>
            {
                catdata.length > 0 ?

                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-sm-12 col-md-12 col-lg-12 main-col">
                                <div className="productList">
                                    <div className="grid-products grid--view-items">
                                        <div className="row categoryrow">
                                            {
                                                catdata.map((data, i) =>
                                                    <div className="col-6 col-sm-6 col-md-4 col-lg-3 item" key={i}>
                                                        <div className="product-image imageofproduct">
                                                            <Link to={`/subcategories?id=${data._id}`}>
                                                                <img className="primary blur-up lazyload category-image" data-src={`uploads/${data.picname}`} src={`uploads/${data.picname}`} alt="image" title="product" />
                                                                <img className="hover blur-up lazyload" data-src={`uploads/${data.picname}`} src={`uploads/${data.picname}`} alt="image" title="product" />

                                                            </Link>
                                                        </div>
                                                        <div className="product-details text-center">
                                                            <div className="product-name">
                                                                <Link to={`/products?id=${data._id}`}>{data.catname}</Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> : null}
        </div>
    )
}

export default Categories;