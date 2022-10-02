import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import "./singlePost.css";
import { port } from '../../../../../context/collection';
import { useParams } from 'react-router';
import { motion } from 'framer-motion'
import Headder from '../../../../Headder/headder'

export default function SinglePost() {
  const PF = port + "image/";
  const { id } = useParams()

  // state
  const [res, setres] = useState(null)

  useEffect(() => {
    axios({
      method: "get",
      url: port + 'api/singleRecipe/' + id,
    }).then((response) => {
      setres(response.data)
    })
  }, [id]);

  // Animation
  const containerVarients = {
    visible: {
      opacity: 1,
      transition: { delay: .2, duration: 1, ease: 'easeInOut' }
    },
    exit: {
      opacity: 0,
      transition: { duration: .5 },
    },
    initial: {
      opacity: 0,
    }
  }


  return res ? (
    <motion.div className=" singlePost container" variants={containerVarients} initial='initial' animate='visible' exit='exit'>
      <Headder name='Recipes and Healthy Tips' colour='none'/>
      <div className="singlePostWrapper row">
        <div className="col-sm-12 col-md-12">
          {res.image ? (
            <img style={{ height: '100%', width: 'auto' }} src={PF + res.image} alt="" className="singlePostImg imag" />
          ) : null}
        </div>
        <div className="col-sm-12 col-md-12 ">
          {/* <div style={{textAlign:'center'}} className='singlePostHeading'>{res.title}</div> */}
        </div>
        <div className="col-sm-12 col-md-12 ">
          <div className='singlePostServes'>Serves : {res.serves}</div>
          <p className='singlePostDesc'></p>
        </div>
        <div className="col-sm-12 col-md-12">
          <div className='singlePostHeading'>Ingredients</div><br />
          {res.ingredients.split('\n').map(str => <p className=" singlePostDesc_inc">{str}</p>)}
        </div>
        <div className="col-sm-12 col-md-12">
          <div className='singlePostHeading'>Preparation</div><br />
          {res.preparation.split('\n').map(str => <p className="singlePostDesc">{str}</p>)}
        </div>
      </div>
    </motion.div>
  ) : <h1>Waiting</h1>;
}
