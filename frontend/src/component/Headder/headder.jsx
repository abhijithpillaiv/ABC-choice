import React from 'react'
import './headder.css'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useHistory } from "react-router-dom";

function headder(props) {

    let history = useHistory();
    const handleClick=()=> {
        history.push("/");
      }
    return (
        <div className='container-fluid ' style={{background:props.colour}}>
        <div className="row">
    <div className='homeLink col-sm-2' onClick={handleClick}><ArrowBackIcon/> Home</div>
    <span className='col-sm-10 headding'> 
    <h1 >{props.name}</h1>
    </span>
    </div></div>
    )
}

export default headder
