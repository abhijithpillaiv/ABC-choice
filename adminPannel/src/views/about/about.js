import React,{useEffect, useState } from "react";
import "./about.css";
import axios from "axios";
import { port } from "../../context/collection";
import { useHistory } from "react-router-dom";

export default function Write() {
  const history = useHistory()

// State
const [mbTitle, setmbTitle] = useState('');
const [mbDes, setmbDes] = useState('')
const [sb1Title, setsb1Title] = useState('');
const [sb2Title, setsb2Title] = useState('');
const [sb3Title, setsb3Title] = useState('');
const [sb1Des, setsb1Des] = useState('');
const [sb2Des, setsb2Des] = useState('');
const [sb3Des, setsb3Des] = useState('');
const [id, setid] = useState('');

const [toggle, settoggle] = useState(false)

const [res, setres] = useState(null)
var lodr = true

// Getting previous about if any

  useEffect(() => {
  // Axios  
    axios.get(port + 'api/about').then((response) => {
      if (response.data.length!==0) {
        const {mbTitle,mbDes,sb1Title,sb2Title,sb3Title,sb1Des,sb2Des,sb3Des,_id}=response.data[0]
        if (mbTitle) {setmbTitle(mbTitle)}
        if (mbDes) {setmbDes(mbDes)}
        if (sb1Title) {setsb1Title(sb1Title)}
        if (sb2Title) {setsb2Title(sb2Title)}
        if (sb3Title) {setsb3Title(sb3Title)}
        if (sb1Des) {setsb1Des(sb1Des)}
        if (sb2Des) {setsb2Des(sb2Des)}
        if (sb3Des) {setsb3Des(sb3Des)}
        if (_id) {setid(_id)}
        settoggle(true)
      }
      console.log(response.data);
      setres(true)

    })
  }, [lodr])



// SubmitHandler

const submitHandler = (event) => {
  event.preventDefault();

  // Axios 
  axios.post(port + 'api/admin/addAbout', { 'mbTitle': mbTitle, 'mbDes':mbDes, 'sb1Title': sb1Title, 'sb1Des': sb1Des, 'sb2Title': sb2Title, 'sb2Des': sb2Des, 'sb3Title': sb3Title, 'sb3Des': sb3Des, 'id': id }).then((response) => {
    alert(response.data);
    setres(null)
    lodr = 1
    history.push('/admin/about')
    setres(true)
  })
}
  return res? (
      <div>
           <div className="cardz height-auto">
      <div className="card-bodyz">
        <div className="heading-layout1">
          <div className="item-title">
            <h3>About Us</h3>
          </div>
        </div>
        <form onSubmit={submitHandler} className="new-added-form">
          <div className="row">


            <div className="col-xl-12 col-lg-12 col-12 form-group">
              <label >Main Board</label>
              <input className="form-control" value={mbTitle} onChange={(e) => setmbTitle(e.target.value)} placeholder="Title" />
              <br />
              <textarea style={{ fontWeight: 'bold', fontSize: '15px', height: '150px' }} value={mbDes} onChange={(e) => setmbDes(e.target.value)} placeholder="Decription" className="form-control" />
            </div>


            <div className="col-xl-4 col-lg-4 col-12 form-group">
              <label>Sub Board 1</label>
              <input className="form-control" value={sb1Title} onChange={(e) => setsb1Title(e.target.value)} placeholder="Title" />
              <br />
              <textarea style={{ fontWeight: 'bold', fontSize: '15px', height: '150px' }} value={sb1Des} onChange={(e) => setsb1Des(e.target.value)} placeholder="Decription" className="form-control" />
            </div>


            <div className="col-xl-4 col-lg-4 col-12 form-group">
              <label>Sub Board 2</label>
              <input className="form-control" value={sb2Title} onChange={(e) => setsb2Title(e.target.value)} placeholder="Title" />
              <br />
              <textarea style={{ fontWeight: 'bold', fontSize: '15px', height: '150px' }} value={sb2Des} onChange={(e) => setsb2Des(e.target.value)} placeholder="Decription" className="form-control" />
            </div>


            <div className="col-xl-4 col-lg-4 col-12 form-group">
              <label>Sub Board 3</label>
              <input className="form-control" value={sb3Title} onChange={(e) => setsb3Title(e.target.value)} placeholder="Title" />
              <br />
              <textarea style={{ fontWeight: 'bold', fontSize: '15px', height: '150px' }} value={sb3Des} onChange={(e) => setsb3Des(e.target.value)} placeholder="Decription" className="form-control" />
            </div>


            <div className="col-12 form-group mg-t-8">

              {toggle ? <button type="submit" className="btn-fill-lg btn-gradient-yellow btn-hover-bluedark">Update</button> :
                <button type="submit" className="btn-fill-lg btn-gradient-yellow btn-hover-bluedark">Save</button>}
              <button type="reset" className="btn-fill-lg bg-blue-dark btn-hover-yellow">Reset</button>
            </div>
          </div>
        </form>
      </div>
    </div>

      </div>
  ):null
}
