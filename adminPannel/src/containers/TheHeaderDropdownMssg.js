import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import MessageIcon from '@material-ui/icons/MailOutline';
import { port } from '../context/collection'
import { useHistory } from 'react-router';

const TheHeaderDropdownMssg = () => {

  const history = useHistory()

  // State
  const [res, setres] = useState(null);
  const [lodr, setlodr] = useState(null);

  // 
  useEffect(() => {
    axios.get(port + 'api/admin/getMessage').then((resolve) => {
      setres(resolve.data);
      setlodr(true);
    })
  }, [lodr])

  const messageHandler = e =>{
    history.push('/admin/message')
  }
  return lodr ? (
    <CDropdown
      inNav
      className="c-header-nav-item mx-2"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <MessageIcon /><CBadge shape="pill" color="info">{res ? res.length : 0}</CBadge>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem
          header
          tag="div"
          color="light"
        >
          <strong>You have {res ? res.length : 0} messages</strong>
        </CDropdownItem>
        {res ? res.map((obj,index) => (
          <CDropdownItem key={index}>
            <div onClick={messageHandler} className="message">
              <div className="pt-3 mr-3 float-left">
                <div className="c-avatar">
                  <span className="c-avatar-status bg-warning"></span>
                </div>
              </div>
              <div>
                <small className="text-muted">{obj.name}</small>
                <small className="text-muted float-right mt-1">a few hours ago</small>
              </div>
              <div className="text-truncate font-weight-bold">{obj.sub}</div>
              <div className="small text-muted text-truncate">{obj.message}
              </div>
            </div>
          </CDropdownItem>
        )) : null}
        <CDropdownItem onClick={messageHandler} className="text-center border-top"><strong>View all messages</strong></CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  ) : null
}

export default TheHeaderDropdownMssg