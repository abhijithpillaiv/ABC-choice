import React, {useState } from 'react'
import {useHistory} from 'react-router-dom'
import axios from 'axios'
import './write.css'
import lodrImg from '../../static/lodr.gif'
import addImage from '../../static/addImage.png'
import {port} from '../../context/collection'

function Additem() {
    const history=useHistory()

    // State
    const [title, settitle] = useState(null);
    const [ingredients, setingredients] = useState(null);
    const [preparation, setpreparation] = useState(null);
    const [lodr, setlodr] = useState(false);
    const [Preview, setPreview] = useState(null);
    const [serves, setserves] = useState(null);
    const [imag, setimag] = useState('');

    // Handler
    const submitHandler=(event) =>{ 
        event.preventDefault();

        // Formdata
         let formdata = new FormData();
         formdata.append('ingredients',ingredients);
         formdata.append('preparation',preparation);
         formdata.append('title',title);
         formdata.append('serves',serves);
         formdata.append('image',imag);
      
         setlodr(true)
         
        // Axios 
         axios({
                method: 'post',
                url:port+'api/admin/addRecipes',
                data: formdata,
                headers: { "Content-Type": "multipart/form-data" }
              }).then((response)=>{
                   setPreview(null)
                   setlodr(false)
                   alert('New Recipee added sucessfully');
                   setimag('')
                   history.push('/admin/write')
                })
    }
    return lodr ? <img style={{display:'block',marginLeft:'auto',marginRight:'auto',height:'400px',widht:'400px'}} src={lodrImg} alt='loader'/> : <div>

            <div className="cardz height-auto">
                <div className="card-bodyz">
                    <div className="heading-layout1">
                        <div className="item-title">
                            <h3>Recipes & Healthy Tips</h3>
                        </div>
                    </div>

                    <form onSubmit={submitHandler} className="new-added-form">
                        <div className="row">
                            <div className="col-xl-12 col-lg-12 col-12 form-group">
                                <label>Title *</label>
                                <input  style={{fontWeight:'bold',fontSize:'20px'}} required name="title"type="text" onChange={(e)=>settitle(e.target.value)} className="form-control"/>
                            </div>
                           
                            <div className="col-xl-6 col-lg-6 col-12 form-group">
                                <label>Ingredients</label>
                                <textarea style={{fontSize:'15px',height:'250px'}}  onChange={(e)=>setingredients(e.target.value)} name="ingredients"  placeholder="" className="form-control"/>
                            </div>
                           
                            <div className="col-xl-6 col-lg-6 col-12 form-group">
                                <label>Preparation</label>
                                <textarea style={{fontSize:'15px',height:'250px'}}  onChange={(e)=>setpreparation(e.target.value)} name="preparation"  placeholder="" className="form-control"/>
                            </div> 

                            <div className="col-xl-6 col-lg-6 col-12 form-group">
                                <label>Serves</label>
                                <input  type="text"  onChange={(e)=>setserves(e.target.value)} name="serves"  placeholder="" className="form-control"/>
                            </div> 
                           
                            <div className="col-lg-6 col-12 form-group mg-t-30">
                             {Preview ? <img width="70px" height="70px" src={Preview}  alt=''/> :<img width="70px" height="70px" src={addImage}  alt=''/>}
                                <label className="text-dark-medium">Upload Photo (150px X 150px)</label>
                                <input onChange={(e)=>{setimag(e.target.files[0]);setPreview( URL.createObjectURL(e.target.files[0]))}} type="file" className="form-control-file"/></div>


                            <div className="col-12 form-group mg-t-8">
                                <button type="submit"  className="btn-fill-lg btn-gradient-yellow btn-hover-bluedark">Save</button>
                                <button onClick={()=>{setPreview(null); history.push('/admin/write')}} type="reset" className="btn-fill-lg bg-blue-dark btn-hover-yellow">Reset</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        </div>
}

export default Additem