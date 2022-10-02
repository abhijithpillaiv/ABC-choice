import React, { useContext, useState } from 'react'
import './login.css'
import '../fonts/material-icon/css/material-design-iconic-font.min.css'
import axios from 'axios'
import { LoginContext } from '../../../context/loginContext'
import logo from '../img/logo.jpeg'
import { useCookies } from 'react-cookie';
import { useEffect } from 'react'
import Alert from '../../alert'

function Login() {
    const [, setCookie] = useCookies(['admin']);

    const { setstatus } = useContext(LoginContext)
    const [forgotPass, setforgotPass] = useState(false)
    const [Email, setEmail] = useState(null)
    const [Password, setPassword] = useState(null)
    const [incorrect, setincorrect] = useState(false)
    const [confirm, setconfirm] = useState({isOpen:false})

    const handleLogin = (e) => {
        e.preventDefault()
        try {
            axios.post('/api/admin', { email: Email, password: Password }).then((resolve) => {
                if (resolve.data === true) {
                    setCookie('admin', true, { path: '/' });
                    setstatus(true);
                }
                else {
                    setincorrect(true)
                }

            })
        } catch (error) {
        }
    }
    const forgotPassHandler = (e) => {
        e.preventDefault()
        try {
            axios.post('/api/admin/forgetPass', { email: Email }).then((resolve) => {
                console.log(resolve.data);
                if (resolve.data===true) {
                    console.log('inside');
                    setconfirm({isOpen:true,title:"Action Needed",color:'green',info:true,subtitle:"Please check your email "+Email+" for Confirmation.",onConfirm:()=> { window.location.href = 'https://mail.google.com/mail/u/0/#inbox';setconfirm({...confirm, isOpen:false})}})

                }
                else {
                    setincorrect(true)
                }

            })
        } catch (error) {
        }
    }

    useEffect(() => {
        setEmail('null')
    }, [forgotPass])

    return forgotPass ?
        <div className="log_main log_background">
            <section className="log_sign-in">
                <div className="log_container">
                    <div className="log_signin-content">
                        <div className="log_signin-image">
                            <figure><img src={logo} alt="logo" /></figure>
                        </div>

                        <div className="log_signin-form">
                            <h2 className="log_form-title">Enter your Email</h2>

                            {incorrect ? <p style={{ color: "red", 'paddingBottom': '3px' }}>            Email not found in database</p> : null}

                            <form onSubmit={forgotPassHandler} className="log_register-form" id="login-form">
                                <div className="log_form-group">
                                    <label ><i className="label zmdi zmdi-account material-icons-name"></i></label>
                                    <input type="text" onChange={(e) => setEmail(e.target.value)} name="email" id="your_name" placeholder="Email" />
                                </div>
                                <div className="log_form-group log_form-button">
                                    <input type="submit" name="signin" id="signin" className="log_form-submit" value="Log in" />
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </section>
            <Alert confirm={confirm} setconfirm={setconfirm}/>

        </div> :
        <div className="log_main log_background">

            <section className="log_sign-in">
                <div className="log_container">
                    <div className="log_signin-content">
                        <div className="log_signin-image">
                            <figure><img src={logo} alt="logo" /></figure>
                            <div style={{ cursor: 'pointer', color: 'blue' }} onClick={() => setforgotPass(true)} className="label-agree-term">Forgot Password</div>
                        </div>

                        <div className="log_signin-form">
                            <h2 className="log_form-title">Admin Login</h2>

                            {incorrect ? <p style={{ color: "red", 'paddingBottom': '3px' }}>            Incorrect Email or Password</p> : null}

                            <form onSubmit={handleLogin} className="log_register-form" id="login-form">
                                <div className="log_form-group">
                                    <label ><i className="label zmdi zmdi-account material-icons-name"></i></label>
                                    <input type="text" onChange={(e) => setEmail(e.target.value)} name="email" id="your_name" placeholder="Email" />
                                </div>
                                <div className="log_form-group">
                                    <label ><i className="label zmdi zmdi-lock"></i></label>
                                    <input type="password" onChange={(e) => setPassword(e.target.value)} name="password" id="your_pass" placeholder="Password" />
                                </div>
                               
                                <div className="log_form-group log_form-button">
                                    <input type="submit" name="signin" id="signin" className="log_form-submit" value="Log in" />
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </section>
        </div>
}

export default Login
