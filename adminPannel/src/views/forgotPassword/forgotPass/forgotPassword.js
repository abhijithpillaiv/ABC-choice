import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
//import './forgotPassword.css'
import axios from 'axios'
import { useParams } from 'react-router';
import Alert from '../../alert';
import { useCookies } from 'react-cookie';
import { port } from '../../../context/collection';
function ForgotPassword() {
    const { token } = useParams()
    const [, setCookie] = useCookies(['admin']);



    const history = useHistory()
    const [confirm, setconfirm] = useState({ isOpen: false })


    const [Password, setPassword] = useState('')
    const [rePassword, setrePassword] = useState('re')
    const [errorConsole, seterrorConsole] = useState(false)

    const [pwdError, setPwdError] = useState(true);
    const [valid, setvalid] = useState(false)

    const validation = () => {
        seterrorConsole(true)
    }

    useEffect(() => {

        if (Password === rePassword) {
            console.log(valid);
            setPwdError(false);
            setvalid(true)
        }
        else {
            console.log(valid);
            setPwdError(true);
            setvalid(false)
        }
    }, [Password, rePassword])


    const submitHandler = (event) => {
        event.preventDefault();
        console.log(token);
        if (token) {
            axios.post(port+'/api/admin/updatePass', { id: token, password: Password }).then((response) => {
                if (response) {
                    setconfirm({ isOpen: true, title: "password Updated", color: 'green', info: true, subtitle: "Your password is updated sucessfully.", onConfirm: () => { setCookie('admin', response.data, { path: '/' }); history.push('/admin'); setconfirm({ ...confirm, isOpen: false }) } })
                }
                else {
                    setconfirm({ isOpen: true, title: "Error", color: 'red', info: true, subtitle: "Error occured please try again.", onConfirm: () => { setconfirm({ ...confirm, isOpen: false }); history.push('/admin/login') } })
                }

            })
        } else {
            setconfirm({ isOpen: true, title: "Error", color: 'red', info: true, subtitle: "Error occured please try again.", onConfirm: () => { setconfirm({ ...confirm, isOpen: false }); history.push('/admin/login') } })
        }

    }
    return (

        <div className="log_main log_background">

            <section className="log_sign-in">
                <div className="log_container">
                    <div className="log_signin-content">

                        <div className="log_signin-form">
                            <h2 className="form-title">Reset your Password</h2>

                            {errorConsole ? pwdError ? <p style={{ color: "red", paddingBottom: "3px" }}>            Password incorrect</p> : null : null}

                            <form onSubmit={submitHandler} className="log_register-form" id="login-form">

                                <div className="log_form-group">
                                    <label for="your_pass"><i className="label zmdi zmdi-lock"></i></label>
                                    <input type="password" onChange={(e) => setPassword(e.target.value)} name="password" id="your_pass" placeholder="Password" />
                                </div>
                                <div className="log_form-group">
                                    <label for="re-pass"><i className="zmdi zmdi-lock-outline"></i></label>
                                    <input type="text" onChange={(e) => { setrePassword(e.target.value) }} name="re_password" id="re_pass" placeholder="Repeat your password" />
                                </div>
                                <div className="form-group form-button">
                                    {valid ? <input type="submit" style={{color:'blue'}} name="signup" id="signup" className="form-submit" value="Reset" /> : <input onClick={validation} type='button' name="signup" id="signup" className="form-submit" value="Reset" />}

                                </div>
                            </form>

                        </div>
                    </div>
                </div>
                <Alert confirm={confirm} setconfirm={setconfirm} />

            </section>
        </div>
    )
}

export default ForgotPassword
