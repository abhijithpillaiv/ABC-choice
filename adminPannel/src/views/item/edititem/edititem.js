import React, {  useState } from 'react'
import { useHistory} from 'react-router-dom'
import axios from 'axios'
import './edititem.css'
import { port } from '../../../context/collection';
import lodrImg from '../../../static/lodr.gif'
import addImage from '../../../static/addImage.png'

function Edititem({data,reload}) {
  const history=useHistory()

  // State
  const [name, setname] = useState(data.name)
  const [des, setdes] = useState(data.des)
  const [price, setprice] = useState(data.price)
  const [imag, setimag] = useState(data.image)
  const [imgChange, setimgChange] = useState(false)
  const [preview, setpreview] = useState(port+'image/'+data.image)
  const id=data._id
  const [lodr, setlodr] = useState(false)


// Handler

  // Submit Handler

  const submitHandler = (event) => {
    event.preventDefault();

    let formdata = new FormData();
    formdata.append('id',id)
    formdata.append('name',name);
    formdata.append('des',des);
    formdata.append('price',price);
    formdata.append('imgChange',imgChange)
    formdata.append('image',imag);
 
    setlodr(true)
    
        // Axios 
      axios({
        method: 'post',
        url:port+'api/admin/EditItem',
        data: formdata,
        headers: { "Content-Type": "multipart/form-data" }
      }).then((response)=>{
           alert(response.data);
           history.push('/admin')
           history.push('/admin/item')
        })
  }

  // Reset Handler
  const resetHandler = (event) => {
    // event.preventDefault();
    console.log('inside handler');
    setname('');setpreview('');setprice('');setdes('');setimag('')
    // history.push('/addItem')
  }


  return lodr ? <img style={{display:'block',marginLeft:'auto',marginRight:'auto',height:'400px',widht:'400px'}} src={lodrImg} alt=''/> :<div>

    <div className="cardz height-auto">
      <div className="card-bodyz">
        <div className="heading-layout1">
          <div className="item-title">
            <h3>Edit Item</h3>
          </div>
        </div>
        <form onSubmit={submitHandler} className="new-added-form">
          <div className="row">
            <div className="col-xl-6 col-lg-6 col-12 form-group">
              <label>Name *</label>
              <input required type="text" value={name} onChange={(e) => setname(e.target.value)} className="form-control" />
            </div>

            <div className="col-xl-3 col-lg-6 col-12 form-group">
              <label>Price</label>
              <input required onChange={(e) => setprice(e.target.value)} value={price} type="number" className="form-control" />
            </div>


            <div className="col-xl-12 col-lg-12 col-12 form-group">
              <label>Description</label>
              <textarea style={{ height: '200px' }} value={des}  onChange={(e) => setdes(e.target.value)} className="form-control" />
            </div>

            <div className="col-lg-6 col-12 form-group mg-t-30">
              {preview ? <img width="70px" height="70px" src={preview} alt='' /> : <img width="70px" height="70px" src={addImage} alt='' />}
              <label className="text-dark-medium">Upload Photo (150px X 150px)</label>
              <input onChange={(e) => { setimag(e.target.files[0]); setimgChange(true) ;setpreview(URL.createObjectURL(e.target.files[0])) }} type="file" className="form-control-file" /></div>


            <div className="col-12 form-group mg-t-8">
              <button type="submit" className="btn-fill-lg btn-gradient-yellow btn-hover-bluedark">Save</button>
              <button onClick={resetHandler} type="reset" className="btn-fill-lg bg-blue-dark btn-hover-yellow">Reset</button>
            </div>
          </div>
        </form>
      </div>
    </div>

  </div>
}

export default Edititem