import React, { useState } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { LoginContext } from './context/loginContext';
import App from './App'
import { useCookies } from 'react-cookie';
import ForgotPassword from './views/forgotPassword/forgotPass/forgotPassword';
import Login from '../src/views/login/loginPage/login'

function LogStatus() {
  const [Cookie] = useCookies(['admin']);
  const [status, setstatus] = useState(Cookie.admin)

  return (
    <BrowserRouter>
      <LoginContext.Provider value={{ status: status, setstatus: setstatus }}>
        <Switch>
          <Route exact component={ForgotPassword} path="/admin/forgotPassword/:token" />
          {status === true ? <Route component={App} path="/admin" /> : <Route component={Login} path="/admin" />}
          {/* <Route component={App} path="/admin" /> */}
        </Switch>
      </LoginContext.Provider>
    </BrowserRouter>

  )
}


export default LogStatus