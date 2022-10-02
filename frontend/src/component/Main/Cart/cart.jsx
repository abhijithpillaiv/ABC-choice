import React, { useContext, useEffect, useState } from 'react'
import './cart.css'
import axios from 'axios'
import { motion } from 'framer-motion'
import PaypalPage from './paypal'
import Alert from '../alert'
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { port } from '../../../context/collection'
import { useHistory } from "react-router";
import { LoginContext } from '../../../context/loginContext'


function cart() {

	const history = useHistory()

	const { User } = useContext(LoginContext)

	// Animation
	const containerVarients = {
		visible: {
			x: '0vw',
			y: '0vw',
			opacity: 1,
			transition: { delay: 0, duration: 1 }
		},
		exit: {
			x: '100vw',
			transition: { ease: 'easeInOut', duration: 1 },
		},
		initial: {
			opacity: 0,
			x: '40vw',
			y: '-18vw'
		}
	}
	const paymentAnimation = {
		visible: {
			opacity: 1,
			transition: { duration: 1 }
		},
		initial: {
			opacity: 0
		}
	}

	// state
	const [Product, setProduct] = useState(null)
	const [confirm, setconfirm] = useState({ isOpen: false })
	const [lodr, setlodr] = useState(false)
	const [Price, setPrice] = useState(0)
	const [count, setcount] = useState(0)
	var flag = true

	useEffect(() => {
		if (User) {
			if (User.logstatus) {
				try {
					axios.get(port + 'api/cart/' + User._id).then((resolve) => {
						setProduct(resolve.data)
						setcount(resolve.data.length)
						console.log(resolve.data);
						let p = 0
						resolve.data.map((obj) => p = p + parseFloat(obj.products[0].price * obj.quantity, 10))
						setPrice(p)
					})
				} catch (error) {
				}
			}

		}
	}, [lodr])

	useEffect(() => {
		if (User || flag === false) { }
		else { history.push('/login'); flag = false }
	}, [])

	const deleteHandler = (cartid, prdtid) => {
		axios.get(port + 'api/deletePrdt/' + cartid + '/' + prdtid).then(() => { setconfirm({ ...confirm, isOpen: false }); setlodr(!lodr) })
	}
	const quantityHandler = (cartid, prdtid, val, inc) => {
		let count = val + inc
		axios.post(port + 'api/changePrdtQuantity', { cartid: cartid, prdtid: prdtid, count: count }).then(setlodr(!lodr))
	}

	return User ? <motion.div className="container" variants={containerVarients} initial='initial' animate='visible' exit='exit'>
		<div className="row">
			<div className="privac abou background2" >
				<h3 style={{ "textDecoration": "underline" }}>Chec<span>kout</span></h3>

				<div className="row2 checkout-right">
					<h4 className="check">Your shopping cart contains: <span>{count} Products</span></h4>
				</div>
				<div className="row">
					<main className="col-md-8">
						<div className="card">

							<table className="table table-borderless table-shopping-cart">
								<thead className="text-muted">
									<tr className="small text-uppercase">
										<th scope="col" width="120" >Product</th>
										<th scope="col" width="120">Quantity</th>
										<th scope="col" width="100">Price</th>
										<th scope="col" className="text-right" width="10">Remove</th>
									</tr>
								</thead>
								<tbody>
									{Product ? Product.map((obj, index) =>
										<tr key={index}>
											<td>
												<figure className="itemside">
													<div className="aside"><img src={port + 'image/' + obj.products[0].image} alt='' className="img-sm" /></div>
													<figcaption className="info">
														<span className="title text-dark">{obj.products[0].name}</span>
														<p className="text-muted small">{obj.products[0].des}</p>
													</figcaption>
												</figure>
											</td>
											<td>
												{obj.quantity !== 1 ? <RemoveIcon onClick={() => quantityHandler(obj._id, obj.products[0]._id, obj.quantity, -1)} /> : null}
												<span style={{ fontSize: '20px', fontWeight: '800' }}> {obj.quantity} </span>
												<AddIcon onClick={() => quantityHandler(obj._id, obj.products[0]._id, obj.quantity, 1)} />

											</td>
											<td>
												<div className="price-wrap">
													<var className="price">$ {obj.products[0].price}</var>
												</div>
											</td>
											<td className="text-right">
												<button className="btn btn-danger" onClick={() => { setconfirm({ isOpen: true, title: "Remove", color: 'red', info: false, subtitle: "Are You sure you want to remove the item ?", onConfirm: () => deleteHandler(obj._id, obj.products[0]._id) }) }} >X</button>
											</td>
										</tr>) : null}
								</tbody>
							</table>

						</div>

					</main>
					<aside className="col-md-4">

						<div className="card">
							<div className="card-body">
								<h4>Order Summary</h4>
								<br />
								{Product ? Product.map((obj, index) =>
									<dl key={index} className="dlist-align">
										<dt>{index + 1}.  {obj.products[0].name}</dt>
										<dd className="text-right">$ {parseFloat(obj.products[0].price, 10) * obj.quantity}</dd>
									</dl>) : null}
								<hr />

							</div>
						</div>
						<br />
						<br />
						<div className="card">
							<div className="card-body">
								<h4>Payment</h4>
								<br />
								<dl className="dlist-align">
									<dt>Total price:</dt>
									<dd className="text-right">USD {Price}</dd>
								</dl>
								<dl className="dlist-align">
									<dt>Discount:</dt>
									<dd className="text-right">USD 0</dd>
								</dl>
								<dl className="dlist-align">
									<dt>Total:</dt>
									<dd className="text-right  h5"><strong>$ {Price}</strong></dd>
								</dl>
								<hr />
								<br />
								<motion.div variants={paymentAnimation} initial='initial' animate='visible'>
									{/* <div className="address_form_agile">
										<h4>Add Your Details</h4><br />
										<form action="payment.html" method="post" className="creditly-card-form agileinfo_form">
											<section className="creditly-wrapper wthree, w3_agileits_wrapper">
												<div className="information-wrapper">

													<input className="billing-address-name form-control" type="text" name="name" placeholder="Full name" />	<br />
													<input className="form-control" type="text" name="phoneNum" placeholder="Mobile number" /><br />
													<input className="form-control" type="text" name="address" placeholder="Address" /><br />
													<input className="form-control" type="text" name="landmark" placeholder="Landmark" /><br />
													<input className="form-control" type="text" name="city" placeholder="Town/City" /><br />
													<select placeholder="Address Type" name="addressType" className="form-control option-w3ls"><br />
														<option value="office">Office</option>
														<option value="home">Home</option>
														<option value="commercial">Commercial</option>
													</select>
													<div className="pt-4"><button className="submit btn btn check_out">Delivery to this Address</button></div><br />
												</div>
											</section>
										</form>
									</div> */}
									<h4>Make Payment</h4>
									<br />
									<br />
									<br />
									{Price > 0 ? <PaypalPage price={Price} data={Product} /> : null}
								</motion.div>


							</div>
						</div>
					</aside>
				</div>
			</div>
		</div>
		<Alert confirm={confirm} setconfirm={setconfirm} />

	</motion.div> : null
}

export default cart
