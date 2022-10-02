import React from 'react'
import { useEffect, useState } from "react";
import Posts from "./components/posts/Posts";
import axios from "axios";
import { port } from '../../../context/collection';
import Headder from '../../Headder/headder'
import {motion} from 'framer-motion'


export default function blog() {

   // Animation
   const containerVarients={
    visible:{
      x:'0vw',
      y:'0vw',
      scale:'1',
      opacity:1,
      transition:{delay:.2,duration:1,ease:'easeInOut'}
    },
    exit:{
      opacity:0,
      transition:{duration:.5},
    },
    initial:{
       scale:'.2',
       opacity:0,
        x:'-30vw',
        y:'5vw'
    }
  }


  const [posts, setPosts] = useState(null);
  const lodr=true

  useEffect(() => {
    axios.get(port+'api/recipes').then((response)=>{
      setPosts(response.data)
    })
  },[lodr]);
  // return posts ? (
  //   <motion.div className="container" variants={containerVarients}  initial='initial' animate='visible' exit='exit'>
  //     <div className="row">
  //     <Headder name='Recipes and Healthy Tips' colour='none'/>
  //     <div className=" home">
  //       <Posts posts={posts} />
  //     </div>
  //     </div>
  //   </motion.div>
  // ):null;
  return posts ? (
      <motion.div className="container home" variants={containerVarients}  initial='initial' animate='visible' exit='exit'>
      <Headder name='Recipes and Healthy Tips' colour='none'/>
        <Posts posts={posts} />
      </motion.div>
        ):null;
}