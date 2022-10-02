import React, { useState } from 'react'
import axios from 'axios'
import './additem.css'
import { port } from '../../../context/collection';
import lodrImg from '../../../static/lodr.gif'
import addImage from '../../../static/addImage.png'

function Additem() {

  // State
  const [name, setname] = useState('')
  const [des, setdes] = useState('')
  const [price, setprice] = useState('')
  const [imag, setimag] = useState('')
  const [preview, setpreview] = useState('')
  const [lodr, setlodr] = useState(false)



// Handler

  // Submit Handler

  const submitHandler = (event) => {
    event.preventDefault();

    let formdata = new FormData();
    formdata.append('name',name);
    formdata.append('des',des);
    formdata.append('price',price);
    formdata.append('image',imag[0]);
 
    setlodr(true)
    
        // Axios 
      axios({
        method: 'post',
        url:port+'api/admin/addItem',
        data: formdata,
        headers: { "Content-Type": "multipart/form-data" }
      }).then((response)=>{
           alert(response.data);
           resetHandler()
           setlodr(false)
        })
  }

  // Reset Handler
  const resetHandler = (event) => {
    // event.preventDefault();
    console.log('inside handler');
    setname('');setpreview('');setprice('');setdes('');setimag('')
    // history.push('/addItem')
  }

  // Key Feature Handlers
  // const [inputFields, setInputFields] = useState([
  //   { feature: '' },
  // ]);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("InputFields", inputFields);
  // };

  // const handleChangeInput = (id, event) => {
  //   const newInputFields = inputFields.map(i => {
  //     if (id === i.id) {
  //       i[event.target.name] = event.target.value
  //     }
  //     return i;
  //   })

  //   setInputFields(newInputFields);
  // }

  // const handleAddFields = () => {
  //   setInputFields([...inputFields, { feature: '' }])
  // }

  // const handleRemoveFields = id => {
  //   const values = [...inputFields];
  //   values.splice(values.findIndex(value => value.id === id), 1);
  //   setInputFields(values);
  // }


  return lodr ? <img style={{display:'block',marginLeft:'auto',marginRight:'auto',height:'400px',widht:'400px'}} src={lodrImg} alt=''/> :<div>

    <div className="cardz height-auto">
      <div className="card-bodyz">
        <div className="heading-layout1">
          <div className="item-title">
            <h3>Add Item</h3>
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

            {/* <div className="col-xl-6 col-lg-6 col-12 form-group">
                                <label>Category *</label>
                               <select required name="category" onChange={(e)=>setCat(e.target.value)} className="select2 form-control">
                                    <option value="">Please Select category *</option>
                                    <option value="cat00">cat-00</option>
                                    <option value="cat0">cat-0</option>
                                    <option value="cat1">cat-1</option>
                                    <option value="cat2">cat-2</option>
                                    <option value="cat3">cat-3</option>
                                    <option value="cat4">cat-4</option>
                                </select>
                            </div> */}

            <div className="col-xl-12 col-lg-12 col-12 form-group">
              <label>Description</label>
              <textarea style={{ height: '200px' }} value={des}  onChange={(e) => setdes(e.target.value)} className="form-control" />
            </div>

          

            {/* <div className="col-xl-3 col-lg-6 col-12 form-group">
              <label>Key Features</label>
              {inputFields.map(inputField => (
                <div style={{ paddingBottom: '5px' }} class="input-container">
                  <input
                    className="form-control"
                    label="feature"
                    variant="filled"
                    onChange={event => handleChangeInput(inputField.id, event)}
                  />
                  <button className='input-button addItembutton' disabled={inputFields.length === 1} onClick={() => handleRemoveFields(inputField.id)}>
                    <RemoveIcon />
                  </button>
                </div>
              ))}
              <button className='addItembutton' onClick={handleAddFields}><AddIcon /> Add More</button>
            </div> */}

            <div className="col-lg-6 col-12 form-group mg-t-30">
              {preview ? <img width="70px" height="70px" src={preview} alt='' /> : <img width="70px" height="70px" src={addImage} alt='' />}
              <label className="text-dark-medium">Upload Photo (150px X 150px)</label>
              <input onChange={(e) => { setimag(e.target.files); setpreview(URL.createObjectURL(e.target.files[0])) }} type="file" className="form-control-file" /></div>


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

export default Additem