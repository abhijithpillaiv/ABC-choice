import React, { useState, useEffect } from 'react'
import {  useHistory } from 'react-router-dom'
import './forgotPassword.css'
import axios from 'axios'
import {  validPassword } from '../regex';
import { useParams } from 'react-router';
import {motion} from 'framer-motion'
import Alert from '../../alert';
import { useCookies } from 'react-cookie';
import {cookie} from '../../../../context/collection'

function forgotPassword() {
    const {token}=useParams()
    const [, setCookie] = useCookies([cookie]);

        // Animation
        const containerVarients={
            visible:{
             
              opacity:1,
              transition:{delay:0,duration:.5}
            },
            initial:{
                opacity:0,
            }
          }


    const history = useHistory()
    const [confirm, setconfirm] = useState({isOpen:false})


    const [Password, setPassword] = useState('')
    const [rePassword, setrePassword] = useState('re')
    const [errorConsole, seterrorConsole] = useState(false)

    const [pwdError, setPwdError] = useState(true);
    const [valid, setvalid] = useState(false)

    const validation = () => {
        seterrorConsole(true)
    }

    useEffect(() => {
        var repass = document.getElementById('re_pass')
        var pass = document.getElementById('pass')


       
        if (!validPassword.test(Password)) {
            setPwdError(true);
            pass.classList.add('invalid')
            pass.classList.remove('valid')
        }
        else {
            setPwdError(false);
            pass.classList.add('valid')
            pass.classList.remove('invalid')
        }

        if (Password !== rePassword) {
            setPwdError(true);
            repass.classList.add('invalid')
            repass.classList.remove('valid')
        }
        else {
            setPwdError(false);
            repass.classList.add('valid')
            repass.classList.remove('invalid')
        }

        if (Password === rePassword && validPassword.test(Password)) {
            console.log('valid true');
            setvalid(true)
        }
        else {
            console.log('valid false');
            setvalid(false)
        }
    }, [Password, rePassword])



    const submitHandler = (event) => {
        event.preventDefault();
        axios.post('/api/updatePass', { id: token,password: Password }).then((response) => {
            if(response){
                setconfirm({isOpen:true,title:"password Updated",color:'green',info:true,subtitle:"Your password is updated sucessfully.",onConfirm:()=> {setCookie(cookie, response.data, { path: '/' });history.push('/');window.location.reload();setconfirm({...confirm, isOpen:false})}})
            }
            else{
                setconfirm({isOpen:true,title:"Error",color:'red',info:true,subtitle:"Error occured please try again.",onConfirm:()=> {setconfirm({...confirm, isOpen:false});history.push('/login')}})
            }

        })
    }
    return (
            <motion.div className="mainSignup" variants={containerVarients}  initial='initial' animate='visible' >
                <section className="signup">
                    <div className="container">
                        <div className="signup-content">
                            <div className="signup-form">
                                <h2 className="form-title">Reset Password</h2>
                                {errorConsole ? pwdError ? <p style={{ color: "red", paddingBottom: "3px" }}>            Password incorrect</p> : null : null}
                                <form onSubmit={submitHandler} className="register-form" id="register-form">
                           
                                    <div className="form-group">
                                        <label for="pass"><i className="zmdi zmdi-lock"></i></label>
                                        <input type="password" onChange={(e) => {setPassword(e.target.value)}} name="password" id="pass" placeholder="Password" />
                                    </div>
                                    <div className="form-group">
                                        <label for="re-pass"><i className="zmdi zmdi-lock-outline"></i></label>
                                        <input type="text" onChange={(e) => {setrePassword(e.target.value)} } name="re_password" id="re_pass" placeholder="Repeat your password" />
                                    </div>
                              
                                    <div className="form-group form-button">
                                        {valid ? <input  type="submit" name="signup" id="signup" className="form-submit" value="Reset" /> : <input onClick={validation} type='button' name="signup" id="signup" className="form-submit" value="Reset" />}

                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
                <Alert confirm={confirm} setconfirm={setconfirm}/>
            </motion.div>
    )
}

export default forgotPassword
