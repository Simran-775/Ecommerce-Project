import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import { toast } from 'react-toastify';

const spanStyle = {
	padding: '20px',
	background: '#efefef',
	color: '#000000'
}

const divStyle = {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	backgroundSize: 'cover',
	height: '400px'
}

const fadeImages = [
	{
		url: 'assets/images/slideshow-banners/home5-banner1.jpg',
	},
	{
		url: 'assets/images/slideshow-banners/home9-banner1.jpg',
	},
];

function Home() {
	const [latestprod, setlatestprod] = useState([])
	const [featprod, setfeatprod] = useState([])
	useEffect(() => {
		fetchlatestprods();
	}, [])
	useEffect(() => {
		fetchfeaturedprods();
	}, [])
	console.log(process.env.REACT_APP_APIURL)
	async function fetchlatestprods() {
		try {
			const apiresp = await axios.get(`${process.env.REACT_APP_APIURL}/api/getlatestprods`)
			if (apiresp.data.success === 1) {
				setlatestprod(apiresp.data.pdata)
			}
			else if (apiresp.data.success === 0) {
				setlatestprod([])
			}
			else {
				toast.error("Some error occured, try again")
			}
		}
		catch (e) {
			toast.error("Error Occured " + e.message)
		}
	}

	async function fetchfeaturedprods() {
		try {
			const apiresp = await axios.get(`${process.env.REACT_APP_APIURL}/api/getfeaturedprods`)
			if (apiresp.data.success === 1) {
		
				setfeatprod(apiresp.data.pdata)
			}
			else if (apiresp.data.success === 0) {
				setfeatprod([])
			}
			else {
				toast.error("Some error occured, try again")
			}
		}
		catch (e) {
			toast.error("Error Occured " + e.message)
		}
	}
	return (

		<div id="page-content">
			<div className="slide-container">
				<Fade>
					{fadeImages.map((fadeImage, index) => (
						<div key={index}>
							<img style={{ width: '100%' }} src={fadeImage.url} />
							<h2>{fadeImage.caption}</h2>
						</div>
					))}
				</Fade>
			</div>

			<div className="tab-slider-product section">
			{
				latestprod.length > 0 ?
					<div className="container">
						<div className="row">
							<div className="col-12 col-sm-12 col-md-12 col-lg-12 main-col">
								<div className="section-header text-center">
									<h2 className="h2">New Arrivals</h2>
									<p>Browse the huge variety of our products</p>
								</div>
								<div className="productList">
									<div className="grid-products grid--view-items">
										<div className="row">
											{
												latestprod.map((data, i) =>

													<div className="col-6 col-sm-6 col-md-4 col-lg-3 item" key={i} >
														<div className="product-image">
															<Link to={`/details?id=${data._id}`}>
																<img className="primary blur-up lazyload" data-src={`uploads/${data.picname}`} src={`uploads/${data.picname}`} alt="image" title="product" />

																<img className="hover blur-up lazyload" data-src={`uploads/${data.picname}`} src={`uploads/${data.picname}`} alt="image" title="product" />

															</Link>
														</div>
														<div className="product-details text-center">
															<div className="product-name">
																<Link to={`/details?id=${data._id}`}>{data.prodname}</Link>
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
					</div> : null}</div>

				<div className="tab-slider-product section">
			{
				featprod.length > 0 ?
					<div className="container">
						<div className="row">
							<div className="col-12 col-sm-12 col-md-12 col-lg-12 main-col">
								<div className="section-header text-center">
                            <h2 className="h2">Featured collection</h2>
                            <p>Our most popular products based on sales</p>
                        </div>
								<div className="productList">
									<div className="grid-products grid--view-items">
										<div className="row">
											{
												featprod.map((data, i) =>

													<div className="col-6 col-sm-6 col-md-4 col-lg-3 item" key={i} >
														<div className="product-image">
															<Link to={`/details?id=${data._id}`}>
																<img className="primary blur-up lazyload" data-src={`uploads/${data.picname}`} src={`uploads/${data.picname}`} alt="image" title="product" />

																<img className="hover blur-up lazyload" data-src={`uploads/${data.picname}`} src={`uploads/${data.picname}`} alt="image" title="product" />

															</Link>
														</div>
														<div className="product-details text-center">
															<div className="product-name">
																<Link to={`/details?id=${data._id}`}>{data.prodname}</Link>
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
					</div> : null}</div>

					<div className="store-feature section">
        	<div className="container">
            	<div className="row">
                	<div className="col-12 col-sm-12 col-md-12 col-lg-12">
                    	<ul className="display-table store-info">
                        	<li className="display-table-cell">
                            	<i className="icon anm anm-truck-l"></i>
                            	<h5>Free Shipping &amp; Return</h5>
                            	<span className="sub-text">Free shipping on all US orders</span>
                            </li>
                          	<li className="display-table-cell">
                            	<i className="icon anm anm-dollar-sign-r"></i>
                                <h5>Money Guarantee</h5>
                                <span className="sub-text">30 days money back guarantee</span>
                          	</li>
                          	<li className="display-table-cell">
                            	<i className="icon anm anm-comments-l"></i>
                                <h5>Online Support</h5>
                                <span className="sub-text">We support online 24/7 on day</span>
                            </li>
                          	<li className="display-table-cell">
                            	<i className="icon anm anm-credit-card-front-r"></i>
                                <h5>Secure Payments</h5>
                                <span className="sub-text">All payment are Secured and trusted.</span>
                        	</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

		</div>

								

	)
}

export default Home