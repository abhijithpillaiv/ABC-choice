import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import axios from 'axios';
import { port } from '../../context/collection';


const User = ({match}) => {  
  // State
  const [user, setuser] = useState(null)

  useEffect(() => {
    axios.get(port+'api/admin/getOneUser/'+match.params.id).then((res)=>{
      console.log(res.data);
      setuser(res.data)
    })
  }, [match])

  return user ? (
    <CRow>
      <CCol lg={12}>
        <CCard>
          <CCardHeader>
            User id: {match.params.id}
          </CCardHeader>
          <CCardBody>
              <table className="table table-striped table-hover">
                <tbody>
                        <tr>
                          <td>id</td>
                          <td><strong>{user._id}</strong></td>
                        </tr>         
                        <tr>
                          <td>name</td>
                          <td><strong>{user.name}</strong></td>
                        </tr>
                        <tr>
                          <td>Email</td>
                          <td><strong>{user.email}</strong></td>
                        </tr>
                        <tr>
                          <td>Encrypted Password</td>
                          <td><strong>{user.password}</strong></td>
                        </tr>     
                        <tr>
                          <td>Address</td>
                          <td><strong>{user.address}</strong></td>
                        </tr>        
                </tbody>
              </table>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  ):<span><CIcon className="text-muted" name="cui-icon-ban" /> Not found</span>
}

export default User
