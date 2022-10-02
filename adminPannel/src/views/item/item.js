import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import axios from 'axios';
import { port } from '../../context/collection';
import { useHistory } from 'react-router';
import EditItem from './edititem/edititem'

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});


export default function CollapsibleTable() {


  // State
  const [lodr, setlodr] = useState(1)
  const [res, setres] = useState(null)
  const [edit, setedit] = useState(false)


  useEffect(() => {
    axios.get(port+'api/items').then((response)=>{
      setres(response.data)
    })
  }, [lodr])
  return edit ? <EditItem data={edit} reload={setlodr}/>: res ?  (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Item</TableCell>
            <TableCell>Name</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Edit/Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {res.map((row) => (
            <Row key={row.name} setedit={setedit} setlodr={setlodr} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ):null;
}

function Row(props) {
  const history = useHistory()
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

      // Handler
      const deleteHandler=(id)=>{
        if(window.confirm('Do you want to delete the item ?')){
         axios.get(port+'api/admin/deleteItem/'+id).then((res)=>{
           window.alert(res.data);
           history.push('/admin')
           history.push('/admin/item')
         })
        }
       }
       const editHandler=(datas)=>{
       props.setedit(datas)
       }

  return  (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          <img style={{width:'90px'}} src={port+'image/'+row.image} alt=''></img>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.price}</TableCell>
        <TableCell align="right">{row.des}</TableCell>
        <TableCell align="right">
        <IconButton aria-label="expand row" size="small">
          <EditIcon onClick={()=>editHandler(row)}/>
        </IconButton>
        <IconButton aria-label="expand row" size="small">
          <DeleteIcon onClick={()=>deleteHandler(row._id)}/>
        </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
               Purchase History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history && row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}