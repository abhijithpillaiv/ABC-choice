import React, { useContext } from 'react'
import './landing.css'
import {Link} from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown'
import {LoginContext} from '../../context/loginContext'
import { cookie } from '../../context/collection'
import { useCookies } from 'react-cookie';


let image =[]
for(var i = 1; i <= 144; i++){
    image.push(i)
}

function background() {
    // Cokkee
    const [,, removeCookie] = useCookies([cookie]);
  const {User,setUser} = useContext(LoginContext)

    return (
        <div className={'container-fluid'} >
        <div className={'row'}>
          {image.map((obj,index)=>{
             return(
               obj === 133?<Link key={index} to="/contactUs"  className={'col-3 col-sm-3 col-md-3 col-lg-1 col-xl-1 p-0'} id={'id'+obj}><img className={'img'}  alt='' src={require('./image/'+obj+'.png')}></img></Link>
               :obj === 134?<Link key={index} to="/contactUs"  className={'col-3 col-sm-3 col-md-3 col-lg-1 col-xl-1 p-0'} id={'id'+obj}><img className={'img'}  alt='' src={require('./image/'+obj+'.png')}></img></Link>
               :obj === 135?<Link key={index} to="/contactUs"  className={'col-3 col-sm-3 col-md-3 col-lg-1 col-xl-1 p-0'} id={'id'+obj}><img className={'img'}  alt='' src={require('./image/'+obj+'.png')}></img></Link>
               :obj === 10?<Link key={index} to="/cart"  className={'col-3 col-sm-3 col-md-3 col-lg-1 col-xl-1 p-0'} id={'id'+obj}><img className={'img'}  alt='' src={require('./image/'+obj+'.png')}></img></Link>
               :obj === 9?<Link key={index} to="/cart"  className={'col-3 col-sm-3 col-md-3 col-lg-1 col-xl-1 p-0'} id={'id'+obj}><img className={'img'}  alt='' src={require('./image/'+obj+'.png')}></img></Link>             
               :obj === 15?<Link key={index} to="/shop"  className={'col-3 col-sm-3 col-md-3 col-lg-1 col-xl-1 p-0'} id={'id'+obj}><img className={'img'}  alt='' src={require('./image/'+obj+'.png')}></img></Link>
               
               : obj === 12?<Dropdown className={'col-3 col-sm-3 col-md-3 col-lg-1 col-xl-1 p-0'} id={'id'+obj}>
                 
               <Dropdown.Toggle variant={null} id='dropdown-toggle'>
               <img  className={'img'}  alt='' src={require('./image/'+obj+'.png')}></img>
               </Dropdown.Toggle>
             
               <Dropdown.Menu  className="shopping-cart" >
             
                 {/* <Dropdown.Header>
                    <div className="shopping-cart-header">
                  <div className="shopping-cart-total">
                   {User&&User.logStatus ?<span className="lighter-text">{User.name}</span>:<span className="lighter-text">Guest</span>} 
                  </div>
                </div>
                </Dropdown.Header> */}
                <Dropdown.Header
                            header
                            tag="div"
                            color="light"
                            className="text-center"
                            style={{textDecoration:'underline'}}

                          >
                            <strong>{User && User.name}</strong>
                          </Dropdown.Header>

                          <Dropdown.Item/>
                          <Dropdown.Header
                            header
                            tag="div"
                            color="light"
                            className="text-center"
                          >
                            <strong>Account</strong>
                          </Dropdown.Header>
                          <Dropdown.Item>
                            <Link to="/cart">Cart</Link>
                          </Dropdown.Item>
                          <Dropdown.Item>
                            <Link to="/shop">Shop</Link>
                          </Dropdown.Item>
                          <Dropdown.Item>
                            <Link to="/blog">Recipes</Link>
                          </Dropdown.Item>
                          <Dropdown.Item>
                            <Link to="/about">About</Link>
                          </Dropdown.Item>
                          <Dropdown.Header
                            header
                            tag="div"
                            color="light"
                            className="text-center"
                          >
                            <strong>Connect</strong>
                          </Dropdown.Header>
                          <Dropdown.Item>
                            {User && User.guest ? <Link to="/login" >LOGIN</Link>
                              : <span onClick={() => { removeCookie('data1', { path: '/' }); setUser(null);window.location.reload(); }} >LOGOUT</span>}
                          </Dropdown.Item>
               </Dropdown.Menu>
             </Dropdown>

             //////


             : obj === 11?<Dropdown className={'col-3 col-sm-3 col-md-3 col-lg-1 col-xl-1 p-0'} id={'id'+obj}>
                 
             <Dropdown.Toggle variant={null} id='dropdown-toggle'>
             <img  className={'img'}  alt='' src={require('./image/'+obj+'.png')}></img>
             </Dropdown.Toggle>
           
             <Dropdown.Menu  className="shopping-cart" >
           
               {/* <Dropdown.Header>
                  <div className="shopping-cart-header">
                <div className="shopping-cart-total">
                 {User&&User.logStatus ?<span className="lighter-text">{User.name}</span>:<span className="lighter-text">Guest</span>} 
                </div>
              </div>
              </Dropdown.Header> */}
              <Dropdown.Header
                          header
                          tag="div"
                          color="light"
                          className="text-center"
                          style={{textDecoration:'underline'}}

                        >
                          <strong>{User && User.name}</strong>
                        </Dropdown.Header>

                        <Dropdown.Item/>
                        <Dropdown.Header
                          header
                          tag="div"
                          color="light"
                          className="text-center"
                        >
                          <strong>Account</strong>
                        </Dropdown.Header>
                        <Dropdown.Item>
                          <Link to="/cart">Cart</Link>
                        </Dropdown.Item>
                        <Dropdown.Item>
                          <Link to="/shop">Shop</Link>
                        </Dropdown.Item>
                        <Dropdown.Item>
                          <Link to="/blog">Recipes</Link>
                        </Dropdown.Item>
                        <Dropdown.Item>
                          <Link to="/about">About</Link>
                        </Dropdown.Item>
                        <Dropdown.Header
                          header
                          tag="div"
                          color="light"
                          className="text-center"
                        >
                          <strong>Connect</strong>
                        </Dropdown.Header>
                        <Dropdown.Item>
                          {User && User.guest ? <Link to="/login" >LOGIN</Link>
                            : <span onClick={() => { removeCookie('data1', { path: '/' }); setUser(null);window.location.reload(); }} >LOGOUT</span>}
                        </Dropdown.Item>
             </Dropdown.Menu>
           </Dropdown>

             //////
               : obj === 74?<Link key={index} to="/blog"  className={'col-3 col-sm-3 col-md-3 col-lg-1 col-xl-1 p-0'} id={'id'+obj}><img className={'img'}  alt='' src={require('./image/'+obj+'.png')}></img></Link>
               : obj === 75?<Link key={index} to="/blog"  className={'col-3 col-sm-3 col-md-3 col-lg-1 col-xl-1 p-0'} id={'id'+obj}><img className={'img'}  alt='' src={require('./image/'+obj+'.png')}></img></Link>
               : obj === 76?<Link key={index} to="/blog"  className={'col-3 col-sm-3 col-md-3 col-lg-1 col-xl-1 p-0'} id={'id'+obj}><img className={'img'}  alt='' src={require('./image/'+obj+'.png')}></img></Link>
               : obj === 63?<Link key={index} to="/blog"  className={'col-3 col-sm-3 col-md-3 col-lg-1 col-xl-1 p-0'} id={'id'+obj}><img className={'img'}  alt='' src={require('./image/'+obj+'.png')}></img></Link>
               : obj === 70?<Link key={index} to="/storeLocator"  className={'col-3 col-sm-3 col-md-3 col-lg-1 col-xl-1 p-0'} id={'id'+obj}><img className={'img'}  alt='' src={require('./image/'+obj+'.png')}></img></Link>
               : obj === 71?<Link key={index} to="/storeLocator"  className={'col-3 col-sm-3 col-md-3 col-lg-1 col-xl-1 p-0'} id={'id'+obj}><img className={'img'}  alt='' src={require('./image/'+obj+'.png')}></img></Link>
               : obj === 7?<a href="https://instagram.com/theabcchoice?utm_medium=copy_link"  className={'col-3 col-sm-3 col-md-3 col-lg-1 col-xl-1 p-0'} id={'id'+obj}><img className={'img'}  alt='' src={require('./image/'+obj+'.png')}></img></a>
               : obj === 8?<a href="https://www.facebook.com/ABC-Choice-106847085090500"  className={'col-3 col-sm-3 col-md-3 col-lg-1 col-xl-1 p-0'} id={'id'+obj}><img className={'img'}  alt='' src={require('./image/'+obj+'.png')}></img></a>
               : obj === 67?<Link key={index} to="/about"  className={'col-3 col-sm-3 col-md-3 col-lg-1 col-xl-1 p-0'} id={'id'+obj}><img className={'img'}  alt='' src={require('./image/'+obj+'.png')}></img></Link>
               : <span href='' className={'col-3 col-sm-3 col-md-3 col-lg-1 col-xl-1 p-0'} id={'id'+obj}><img className={'img'} alt='' src={require('./image/'+obj+'.png')}></img></span>
               )})}
      </div>
      </div>
    )
}

export default background