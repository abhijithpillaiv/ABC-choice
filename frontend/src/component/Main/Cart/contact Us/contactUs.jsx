import React, {  useState } from 'react'
import './contactUs.css'
import Iframe from 'react-iframe'
import Headder from '../../Headder/headder'
import axios from 'axios';
import { port } from '../../../context/collection';
import { motion } from 'framer-motion'


function contactUs() {
  // State
  const [name, setname] = useState(null);
  const [email, setemail] = useState(null);
  const [sub, setsub] = useState(null);
  const [message, setmessage] = useState(null);

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

// Submit Handler

const submitHandler = (event) => {
  event.preventDefault();
  
      // Axios 
    axios({
      method: 'post',
      url:port+'api/message',
      data: {'name':name,'email':email,'sub':sub,'message':message},
    }).then((response)=>{
         alert(response.data);
      })
}

  return  (
    <motion.div className="background " variants={containerVarients} initial='initial' animate='visible' exit='exit'>
      <div className='container'>
        <Headder colour='none' />
        <div className="w3l-contact-5 ">
          <div className="contact-top section-gap">
            <div className="wrapper">
              <div className="d-grid cont-main-top">
                <div className="contacts12-main">
                  <h3 className="title-main-cont">Contact Us</h3>
                  <p className="sub-title-cont">For more info or inquiry We'd love to hear from you! </p>
                  <form  onSubmit={submitHandler} className="main-input">
                    <div className="top-inputs d-grid">
                      <input type="text" placeholder="Name" name="w3lName" onChange={(e)=>setname(e.target.value)} id="w3lName" required=""></input>
                      <input type="email" name="email" placeholder="Email" onChange={(e)=>setemail(e.target.value)} id="w3lSender" required=""></input>
                    </div>
                    <input type="text" placeholder="Subject" onChange={(e)=>setsub(e.target.value)} name="w3lSubject" id="w3Subject" required=""></input>
                    <textarea placeholder="Message" onChange={(e)=>setmessage(e.target.value)} name="w3lMessage" id="w3lMessage" required=""></textarea>
                    <div className="text-right">
                      <button type="submit" className="btn btn-contact">Submit Now</button>
                    </div>
                  </form>
                </div>
                <div className="contact">
                  <div className="cont-subs">
                    <div className="cont-add">
                      <h4>Address:</h4>
                      <p className="contact-text-sub">4542 Coldwater Canyon AVe, MailBox #14 Studio City, CA 91604 </p>
                    </div>
                    <div className="cont-add">
                      <h4>Email:</h4>
                      <a href="mailto:info@abcchoice.cafe">info@abcchoice.cafe
                      </a>
                    </div>
                    <div className="cont-add">
                      <h4>Phone:</h4>
                      <a href="tel: 818.401.5303"> 818.401.5303
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="map">
              <Iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3301.7215868185403!2d-118.41553928493244!3d34.15346438057852!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c296192aa56b4f%3A0x527f02a04bdbf65b!2s4542%20Coldwater%20Canyon%20Ave%20APT%2014%2C%20Studio%20City%2C%20CA%2091604%2C%20USA!5e0!3m2!1sen!2sin!4v1628744674753!5m2!1sen!2sin" width="800" height="600" style={{ "border": "0" }} allowfullscreen="" loading="lazy"></Iframe>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default contactUs
