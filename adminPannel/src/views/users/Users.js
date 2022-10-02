import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import axios from 'axios'
import { port } from '../../context/collection'
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination
} from '@coreui/react'
import DeleteIcon from '@material-ui/icons/Delete';

// import usersData from './UsersData'

const getBadge = status => {
  switch (status) {
    case 'Active': return 'success'
    case 'Inactive': return 'secondary'
    case 'Pending': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
  }
}

const Users = () => {

  const [usersData, setusersData] = useState(null)
  const lodr = true;

  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)

  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/admin/users?page=${newPage}`)
  }

  useEffect(() => {
    currentPage !== page && setPage(currentPage)
  }, [currentPage, page])

  useEffect(() => {
    axios.get(port + 'api/admin/getUser').then((res) => {
      setusersData(res.data)
    })
  }, [lodr])

  // handler
  const removeHandler =(id)=>{
    if (window.confirm('Do you want to delete the User ?')) {
      axios.get(port+'api/admin/deleteUser/'+id).then(()=>{history.push('/admin');history.push('/admin/users')})
    }
  }

  return usersData ? (
    <CRow>
      <CCol xl={12}>
        <CCard>
          <CCardHeader>
            Users
          </CCardHeader>
          <CCardBody>
            <CDataTable
              items={usersData}
              fields={[
                { key: 'name', _classes: 'font-weight-bold' },
                '_id', 'email', 'status', 'address','remove'
              ]}
              hover
              striped
              itemsPerPage={12}
              activePage={page}
              clickableRows
              onRowClick={(item) => history.push(`/admin/users/${item._id}`)}
              scopedSlots={{
                'status':
                  (item) => (
                    <td>
                      {/* <CBadge color={getBadge(item.status)}>
                      {item.status}
                    </CBadge> */}
                    {item.guest ? <CBadge color={getBadge('Banned')}>
                      Guest
                      </CBadge> :<CBadge color={getBadge('Active')}>
                      Active
                      </CBadge> }

                    </td>
                  ),
                  'remove':
                  (item) => (
                    <td>
                      <DeleteIcon onClick={()=>removeHandler(item._id)}/>
                    </td>
                  )
              }}
              
              
            />
            <CPagination
              activePage={page}
              onActivePageChange={pageChange}
              pages={5}
              doubleArrows={false}
              align="center"
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  ) : <h1>No data found !!</h1>
}

export default Users
