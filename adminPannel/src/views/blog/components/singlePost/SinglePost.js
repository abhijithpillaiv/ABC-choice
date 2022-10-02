import React from 'react'
import axios from "axios";
import {useEffect, useState } from "react";
import "./singlePost.css";
import { port } from '../../../../context/collection';
import { useHistory, useParams } from 'react-router';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Edit from '../edit/edit'


export default function SinglePost() {
  const PF = port+"image/";
  const {id}=useParams()
  const history=useHistory()

  // state
  const [res, setres] = useState(null)
  const [edit, setedit] = useState(false)

  useEffect(() => {
    axios({
      method: "get",
      url:port+'api/singleRecipe/'+id,
    }).then((response)=>{
      console.log(response.data);
        setres(response.data)
      })
  },[id]);
  
  // Handler
 const deleteHandler=(id)=>{
   if ( window.confirm('Do you want to delete the Recipe?')) {
     axios.get(port+'api/admin/deleteRecipe/'+id).then((res)=>{
       window.alert('Recipe deleted sucessully.')
       history.push('/admin/allRecipes');
     })
   }
 }
 const editHandler=(data)=>{
  if ( window.confirm('Do you want to Edit the Recipe?')) {
    setedit(true)
  }
}
 
  return edit ?<Edit data={res}/>: res ? (
   <div className="background">
    <div className=" singlePost container">
      <div className="singlePostWrapper row">
        <div className="col-sm-12 col-md-12">
        {res.image? (
          <img style={{height:'100%',width:'auto'}} src={PF + res.image} alt="" className="singlePostImg imag" />
        ):null}
        </div>
        <div className="col-sm-12 col-md-12 ">
          <br/>
        <DeleteIcon style={{cursor:'pointer'}} onClick={()=>deleteHandler(res._id)} />              <EditIcon style={{cursor:'pointer'}}  onClick={()=>{editHandler(res)}}/>
        </div>
        <div className="col-sm-12 col-md-12 ">
        <div className='singlePostHeading'>Serves : <span className=" singlePostDesc">{res.serves}</span></div>
        <p className='singlePostDesc'></p>
        </div>
        <div className="col-sm-12 col-md-12">
        <div className='singlePostHeading'>Ingredients</div><br/>
        {res.ingredients.split('\n').map(str => <p className=" singlePostDesc">{str}</p>)}
        </div>
        <div className="col-sm-12 col-md-12">
        <div className='singlePostHeading'>Preparation</div><br/>
        {res.preparation.split('\n').map(str => <p className="singlePostDesc">{str}</p>)}
        </div>
      </div>
    </div>
    </div>
  ):<h1>Waiting</h1>;
}
