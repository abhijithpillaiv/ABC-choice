import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios';
import {
  CBadge
} from '@coreui/react'

import { useState } from 'react';
import { useEffect } from 'react';
import { port } from '../../context/collection';

const getBadge = status => {
  switch (status) {
    case 'delivered': return 'success'
    case 'Pending': return 'secondary'
    case 'late': return 'warning'
    case 'error': return 'danger'
    default: return 'primary'
  }
}
const columns = [
  { id: 'date', label: 'Date', minWidth: 50 },
  { id: 'name', label: 'name', minWidth: 150 },
  { id: 'product', label: 'Product', minWidth: 300 },
  { id: 'Qantity', label: 'Qantity', minWidth: 20 },
  {
    id: 'payment',
    label: 'Payment Method / id',
    minWidth: 100,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'price',
    label: 'Amount',
    minWidth: 100,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'Shipping Address',
    label: 'Address',
    minWidth: 170,
    align: 'center',
  },

  {
    id: 'status',
    label: 'Status',
    minWidth: 100,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 700,
  },
});

export default function StickyHeadTable() {

  // state
  const [rows, setrows] = useState(null)
  const lodr = true

  // UseEffect
  useEffect(() => {
    axios.get(port + 'api/admin/getpurchase').then((res) => {
      console.log(res.data);
      if (res.data.length !== 0) {
        setrows(res.data)
      }
    })
  }, [lodr])


  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return rows ? (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
              {/* <TableCell
                align='right'
                style={{ minWidth: 50 }}
              >
                View
              </TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  <TableCell key={index} align="left">
                    {row.date}
                  </TableCell>
                  <TableCell key={index} align="left">
                    {row.name?row.name:'Null'}
                  </TableCell>
                  <TableCell key={index} align="left">
                    {row.data.data.map((obj, index2) => {
                      return (
                        <div key={index2}>
                          {obj.products[0].name}
                          <br/>
                        </div>
                        
                      )
                    })}
                  </TableCell>
                  <TableCell key={index} align="left">
                    {row.data.data.map((obj, index2) => {
                      return (
                        <div key={index2}>
                          {obj.quantity}
                        </div>
                      )
                    })}
                  </TableCell>

                  <TableCell key={index} align="center">
                  Paypal / {row.data.order.id}
                  </TableCell>

                  <TableCell key={index} align="center">
                      $ {row.data.order.purchase_units[0].amount.value}
                    </TableCell>
                    <TableCell key={index} align="center">
                      {row.data.order.purchase_units[0].shipping.name.full_name}
                      <br/>
                      {row.data.order.purchase_units[0].shipping.address.address_line_1 && row.data.order.purchase_units[0].shipping.address.address_line_1}
                      <br/>
                      {row.data.order.purchase_units[0].shipping.address.admin_area_2 && row.data.order.purchase_units[0].shipping.address.admin_area_2}
                      <br/>
                      {row.data.order.purchase_units[0].shipping.address.postal_code && row.data.order.purchase_units[0].shipping.address.postal_code}
                      
                    </TableCell>
               
                 
                  {/* <TableCell align='right'>
                    <IconButton aria-label="expand row" size="small" >
                      <Link to='/invoice'><VisibilityIcon /></Link>
                    </IconButton>
                  </TableCell> */}
                    <TableCell key={index} align="right">
                      <CBadge style={{ width: '100px' }} color={getBadge('Pending')}>'Pending'</CBadge>
                    </TableCell>
                </TableRow>

              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  ) : <h1>Nothing to display</h1>;
}