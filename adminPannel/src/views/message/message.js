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
import { port } from '../../context/collection';
import axios from 'axios';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});


function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  // Delete Handler

  const deleteHandler=(id)=>{
    axios.get(port+'api/admin/dltMsg/'+id).then((resol)=>{
      alert(resol.data);
      props.setlodr(!props.lodr)
    })
  }
  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.email}
        </TableCell>
        <TableCell align="center">{row.name}</TableCell>
        <TableCell align="center">{row.sub}</TableCell>
        <TableCell align="center">
        <IconButton aria-label="expand row" size="small">
        </IconButton>
        <IconButton onClick={()=>deleteHandler(row._id)} aria-label="expand row" size="small">
          <DeleteIcon />
        </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0,background:'#eeeeee',color:'black' }} colSpan={10}>
          <Collapse  in={open} timeout="auto" unmountOnExit>
            <Box margin={5}>
              <Typography variant="h5" gutterBottom component="div">
               Content
              </Typography>
              <Table  aria-label="purchases">
              <h6>{row.message}</h6> 
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}


export default function CollapsibleTable() {
  
  // State
  const [res, setres] = useState(null);
  const [lodr, setlodr] = useState(null);

  // 
  useEffect(() => {
    axios.get(port+'api/admin/getMessage').then((resolve)=>{
      setres(resolve.data);
      setlodr(true);
    })
  }, [lodr])
  return lodr ? (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell style={{fontWeight:'bold'}} >Email</TableCell>
            <TableCell style={{fontWeight:'bold'}} align="center">Name</TableCell>
            <TableCell style={{fontWeight:'bold'}} align="center">Subject</TableCell>
            <TableCell style={{fontWeight:'bold'}} align="center">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {res.map((row,index) => (
            <Row key={index} setlodr={setlodr} lodr={lodr} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ):null;
}