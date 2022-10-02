import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { port } from '../../../context/collection'
import './about.css'
import {motion} from 'framer-motion'


function about() {


    // Animation
    const containerVarients={
        visible:{
          opacity:1,
          transition:{delay:0,duration:1,}
        },
        exit:{
         opacity:0,
          transition:{duration:.5},
        },
        initial:{
            opacity:0
        }
      }

    // State
    const [mbTitle, setmbTitle] = useState('No main title yet')
    const [mbDes, setmbDes] = useState('No main description yet')
    const [sb1Title, setsb1Title] = useState('No title yet')
    const [sb2Title, setsb2Title] = useState('No title yet')
    const [sb3Title, setsb3Title] = useState('No title yet')
    const [sb1Des, setsb1Des] = useState('No description yet')
    const [sb2Des, setsb2Des] = useState('No description yet')
    const [sb3Des, setsb3Des] = useState('No description yet')
    const [res, setres] = useState(null)
    const lodr = true;

    // axios 
    useEffect(() => {
        axios.get(port + 'api/about').then((response) => {
            setres(response.data[0])
            console.log(response.data);
            if (response.data.length !== 0) {
                const { mbTitle, mbDes, sb1Title, sb1Des, sb2Title, sb2Des, sb3Title, sb3Des } = response.data[0]
                if (mbTitle) { setmbTitle(mbTitle) }
                if (mbDes) { setmbDes(mbDes) }
                if (sb1Title) { setsb1Title(sb1Title) }
                if (sb2Title) { setsb2Title(sb2Title) }
                if (sb3Title) { setsb3Title(sb3Title) }
                if (sb1Des) { setsb1Des(sb1Des) }
                if (sb2Des) { setsb2Des(sb2Des) }
                if (sb3Des) { setsb3Des(sb3Des) }
            }
        })
    }, [lodr])

    return res ? (
            <motion.div className="about"variants={containerVarients}  initial='initial' animate='visible' exit='exit'>
                <div style={{ backgroundColor: 'whitesmoke' }} className="container">
                    <div className="row">
                        <div className="mainBoard col-12">
                            <h4 className='boardTitleMain'>{mbTitle}</h4>
                            <p className='boardDesMain'>{mbDes}</p>
                        </div>
                    </div>
                </div>
                <div className="subBoardRow container-flex">
                    <div className="subBoard row">

                        <div className="col-12 col-md-4">
                            <h4 className='boardTitle'>{sb1Title}</h4>
                            <p className='boardDes'>{sb1Des}</p>
                        </div>

                        <div className="col-12 col-md-4">
                            <h4 className='boardTitle'>{sb2Title}</h4>
                            <p className='boardDes '>{sb2Des}</p>
                        </div>

                        <div className="col-12 col-md-4">
                            <h4 className='boardTitle'>{sb3Title}</h4>
                            <p className='boardDes'>{sb3Des}</p>
                        </div>
                    </div>

                </div>
            </motion.div>
    ) : null
}

export default about
