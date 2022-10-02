import React, { useContext } from 'react'
import './shop.css'
import Headder from '../../Headder/headder'
import { useState } from 'react'
import { useEffect } from 'react';
import axios from "axios";
import { port } from '../../../context/collection';
import Alert from '../alert'
import { useHistory } from 'react-router';
import {LoginContext} from '../../../context/loginContext'
import { motion } from 'framer-motion'



function shop() {
    const history = useHistory()

    // Animation
	const containerVarients = {
		visible: {
			opacity: 1,
			transition: { delay: 0, duration: 1 }
		},
		exit: {
      opacity:0,
			transition: { ease: 'easeInOut', duration: 1 },
		},
		initial: {
			opacity: 0,
		}
	}
	

    const {User} = useContext(LoginContext);

    // State
    const [res, setres] = useState(null);
    const [lodr, setlodr] = useState(null);
    const [confirm, setconfirm] = useState({ isOpen: false })


    useEffect(() => {
        axios.get(port + 'api/items').then((resolve) => {
            setres(resolve.data);
            setlodr(true);
        })
    }, [lodr])

    //Handler
    const cartHandler = (prdtId) => {
        console.log('inside');
        if (User) {
            if (User.logstatus) {
                axios.get(port + 'api/add-to-cart/' +prdtId  + '/' + User._id).then((response) => {
                    setconfirm({isOpen:true,color:'green',info:'true',title:"Success",subtitle:"Your item is added sucessfully !! ",onConfirm:()=> history.push('/shop') })
                })
            }
            
        } else {
            setconfirm({ isOpen: true, title: "Please Login", color: 'red', info: true, subtitle: "You should login to add item to cart !!", onConfirm: () => history.push('/login') })
        }

    }


    return lodr ? (
        <motion.div className='background' variants={containerVarients} initial='initial' animate='visible' exit='exit'>
            <div className="container mt-6 mb-6">
                <Headder name='SHOP' colour='white' />
                <div className="d-flex justify-content-center row">
                    <div className="col-md-10">
                        {res ? res.map((obj,index) => (
                            <div key={index} className="row p-2 bg-white border rounded">
                                <div className="col-md-3 mt-1"><img className="img-fluid img-responsive rounded product-image" alt=''src={port + 'image/' + obj.image} /></div>
                                <div className="col-md-6 mt-1">
                                    <h5>{obj.name}</h5>
                                    {/* <div className="d-flex flex-row">
                                        <div className="ratings mr-2"><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i></div><span>310</span>
                                    </div> */}
                                    <div className="mt-1 mb-1 spec-1">{obj.des}</div>
                                </div>
                                <div className="align-items-center align-content-center col-md-3 border-left mt-1">
                                    <div className="d-flex flex-row align-items-center">
                                        <h4 className="mr-1">${obj.price}</h4>
                                    </div>
                                    <div className="d-flex flex-column mt-4">

                                        <button onClick={()=>cartHandler(obj._id)}className="btn btn-primary btn-sm"   type="button">Add to Cart</button>
                                    </div>
                                </div>
                                <br/>
                            </div>
                        )) : null}

                    </div>
                </div>
            </div>
            <Alert confirm={confirm} setconfirm={setconfirm} />
        </motion.div>
    ) : null
}

export default shop
