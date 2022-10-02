import React, { useState } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import Landing from './component/Landing/landing'
import Contact from './component/Main/contact Us/contactUs'
import Fotter from './component/Main/fotter/fotter'
import Cart from './component/Main/Cart/Main'
import Shop from './component/Main/shop/shop'
import Locator from "./component/Main/store Locator/locator";
import Blog from './component/Main/blog/blog'
import About from "./component/Main/about/about";
import Login from './component/login&Signup/login/login.jsx'
import Signup from './component/login&Signup/signup/signup'
import SinglePost from "./component/Main/blog/components/singlePost/SinglePost";
import ForgotPassword from './component/Main/forgotPassword/forgotPass/forgotPassword'
import SignupSucess from './component/Main/forgotPassword/signupSucess/signupSucess'
import { AnimatePresence } from 'framer-motion'
import {LoginContext} from './context/loginContext'
import { useCookies } from 'react-cookie';
import { useEffect } from "react";
import axios from 'axios'
import { port } from "./context/collection";
import {cookie} from './context/collection'


function App() {
  const [Cookie, setCookie] = useCookies([cookie]);
  const lodr=true
  const [User, setUser] = useState(null)
  const location = useLocation()

    //creating function to load ip address from the API
    const getData =() => {
      console.log('inside');
        var tempId= Math.floor((Math.random() * 10000000000000) + 1);
        if (tempId) {
          axios.get(port+'api/signup/'+tempId).then((res)=>{
            setCookie(cookie, res.data[0]._id, { path: '/' });
            setUser(res.data[0])
             })
        }
        else{
          
        }
    }

  useEffect(async() => {
    var c = Cookie.data1
    console.log(c);
    if (c !== undefined) {
      if(c!==null){
     var res =   await  axios.get(port+'api/admin/getOneUser/'+c)
     console.log('inside res is '+res);
      if (res.data) {
        console.log(res.data);
        setUser(res.data)
      }else{
        getData()
      }     
    }else{
      getData() 
      }
    }else{
    getData() 
    }
  }, [lodr])

  return User ?  (
    <span>
      <div>
        <LoginContext.Provider value={{ User: User, setUser: setUser }}>
          <AnimatePresence>
            <Switch location={location} key={location.key}>
              <Route exact component={Landing} path="/" />
              <Route exact component={Login} path="/login" />
              <Route exact component={Signup} path="/signup" />
              <Route exact component={Contact} path="/contactUs" />
              <Route exact component={Cart} path="/cart" />
              <Route exact component={Shop} path="/shop" />
              <Route exact component={Locator} path="/storeLocator" />
              <Route exact component={Blog} path="/blog" />
              <Route exact component={SinglePost} path="/singlePost/:id" />
              <Route exact component={About} path="/about" />
              <Route exact component={ForgotPassword} path="/forgotPassword/:token" />
              <Route exact component={SignupSucess} path="/signupSucess/:token" />
            </Switch>
          </AnimatePresence>
        </LoginContext.Provider>
      </div>
      <Fotter/>
    </span>
  ):null;
}

export default App;