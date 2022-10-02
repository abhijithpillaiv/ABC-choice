import React, { lazy, useEffect, useState } from 'react'
import axios from 'axios'
import { port } from '../../context/collection'
import Users from '../users/Users'


const WidgetsDropdown = lazy(() => import('../widgets/WidgetsDropdown'))

const Dashboard = () => {

    //State
  const [Data, setData] = useState(null);
  const [User, setUser] = useState('')
  const [Order, setOrder] = useState('')
  const lodr = null;

  useEffect(() => {
    axios.get(port+'api/admin/dashboard').then((response)=>{
      console.log(response.data);
      setUser(response.data.user);
      setOrder(response.data.order);
    })
  }, [lodr])
  useEffect(() => {
    if (User!==''&&Order!=='') {
      console.log(User);
      console.log(Order);
      setData(true)
    }
  }, [User,Order])


  return Data ? (
    <div>
      <WidgetsDropdown/>
      <Users/>
    </div>
  ):null
}

export default Dashboard
