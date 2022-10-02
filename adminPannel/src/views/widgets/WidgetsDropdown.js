import React, { useEffect, useState } from 'react'
import {
  CWidgetDropdown,
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle
} from '@coreui/react'
import SettingsIcon from '@material-ui/icons/Settings';
import ChartLineSimple from '../charts/ChartLineSimple'
import axios from 'axios'
import { port } from '../../context/collection'
import { useHistory } from 'react-router';

const WidgetsDropdown = () => {

  const [dash, setdash] = useState(null)
  const lodr = true;

  const history = useHistory()
  useEffect(() => {
    axios.get(port + 'api/admin/dashboard').then((res) => {
      setdash(res.data);
    })
  }, [lodr])

  // render
  return dash ? (
    <CRow>
      <CCol sm="12" lg="4">
        <CWidgetDropdown
          color="gradient-primary"
          header={String(dash.product)}
          text="Products"
          footerSlot={
            <ChartLineSimple
              pointed
              className="c-chart-wrapper mt-3 mx-3"
              style={{ height: '70px' }}
              dataPoints={[65, 59, 84, 84, 51, 55, 90]}
              pointHoverBackgroundColor="primary"
            />
          }
        >
          <CDropdown>
            <CDropdownToggle color="transparent">
              <SettingsIcon />
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
              <CDropdownItem onClick={()=>{history.push('/admin/addItem')}}>Add product</CDropdownItem>
              <CDropdownItem onClick={()=>{history.push('/admin/item')}}>Show Products</CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </CWidgetDropdown>
      </CCol>

      <CCol sm="12" lg="4">
        <CWidgetDropdown
          color="gradient-info"
          header={String(dash.users)}
          text="Users"
          footerSlot={
            <ChartLineSimple
              pointed
              className="c-chart-wrapper mt-3 mx-3"
              style={{ height: '70px' }}
              dataPoints={[1, 18, 9, 17, 34, 22, 11]}
              pointHoverBackgroundColor="info"
              options={{ elements: { line: { tension: 0.00001 } } }}
            />
          }
        >
          <CDropdown>
            <CDropdownToggle  color="transparent">
              <SettingsIcon />
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
              <CDropdownItem onClick={()=>{history.push('/admin/users')}}>All Users</CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </CWidgetDropdown>
      </CCol>

      <CCol sm="12" lg="4">
        <CWidgetDropdown
          color="gradient-warning"
          header={String(dash.recipes)}
          text="Recipes"
          footerSlot={
            <ChartLineSimple
              pointed
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              dataPoints={[1, 18, 9, 17, 34, 22, 11]}
              pointHoverBackgroundColor="warning"
              options={{ elements: { line: { tension: 0.00001 } } }}
              label="Users / Month"
              labels="months"
            />
          }
        >
          <CDropdown>
            <CDropdownToggle color="transparent">
              <SettingsIcon />
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
              <CDropdownItem onClick={()=>{history.push('/admin/allRecipes')}}>All Recipes</CDropdownItem>

            </CDropdownMenu>
          </CDropdown>
        </CWidgetDropdown>
      </CCol>
    </CRow>
  ) : null
}

export default WidgetsDropdown
