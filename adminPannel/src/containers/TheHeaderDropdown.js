import React, { useContext } from 'react'
import { useHistory} from 'react-router-dom'
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg
} from '@coreui/react'
import logo from '../static/logo.jpeg'
import { useCookies } from 'react-cookie';
import {LoginContext} from '../context/loginContext'

import OpacityIcon from '@material-ui/icons/Opacity';
import CreateIcon from '@material-ui/icons/Create';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import MessageIcon from '@material-ui/icons/Message';
import ShoppingBagIcon from '@material-ui/icons/LocalMall';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import LogoutIcon from '@material-ui/icons/Lock';

const TheHeaderDropdown = () => {
  const [,removeCookie] = useCookies(['admin']);
  const {setstatus} = useContext(LoginContext)
const history = useHistory()
  return (
    <CDropdown
      inNav
      className="c-header-nav-items mx-2"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CImg
            src={logo}
            className="c-avatar-img"
            alt="admin"
          />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">

        <CDropdownItem
          header
          tag="div"
          color="light"
          className="text-center"
        >
          <strong>Account</strong>
        </CDropdownItem>
        <CDropdownItem>
          <PeopleAltIcon className="mfe-2" />
          <div onClick={()=>{history.push('/admin/users')}} >Users</div>
        </CDropdownItem>


        <CDropdownItem>
          <MessageIcon className="mfe-2" />
          <div  onClick={()=>{history.push('/admin/message')}}>Messages</div>
        </CDropdownItem>
        <CDropdownItem>
          <ShoppingBagIcon className="mfe-2" />
          <div onClick={()=>{history.push('/admin/item')}}>Item</div>
        </CDropdownItem>
        <CDropdownItem>
          <OpacityIcon className="mfe-2" />
          <div onClick={()=>{history.push('/admin/write')}}>Recipes</div>
        </CDropdownItem>
        <CDropdownItem>
          <CreateIcon className="mfe-2" />
          <div onClick={()=>{history.push('/admin/about')}}>About</div>
        </CDropdownItem>
        <CDropdownItem
          header
          tag="div"
          color="light"
          className="text-center"
        >
          <strong>Purchase</strong>
        </CDropdownItem>
        <CDropdownItem>
        <ShoppingBasketIcon className="mfe-2" />
        <div onClick={()=>{history.push('/admin/purchase')}}>Purchase</div>
        </CDropdownItem>
        <CDropdownItem>
        </CDropdownItem>


        <CDropdownItem>
        <LogoutIcon className="mfe-2" />
        <span onClick={()=>{removeCookie("admin",{ path: '/' });setstatus(false)}}>LOGOUT</span>
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default TheHeaderDropdown
