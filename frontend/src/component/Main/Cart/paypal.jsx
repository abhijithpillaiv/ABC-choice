import axios from "axios";
import React, { useRef, useEffect, useContext } from "react";
import { useHistory } from "react-router";
import { port } from "../../../context/collection";
import {switchContext}from './switchContext'


export default function Paypal(props) {
  const history = useHistory()
  const {setconfirm} = useContext(switchContext)

  const paypal = useRef();

  useEffect(() => {
    console.log(props.price);
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "ABC Choice",
                amount: {
                  currency_code: "USD",
                  
                  value: props.price,
                },
              }, 
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          console.log(order);
          axios.post(port+'api/admin/itemHistory',{'data':props.data,'order':order}).then(()=>{
            setconfirm({isOpen:true,color:'green',info:'true',title:"Success",subtitle:"Your Order is placed sucessfully !! ",onConfirm:()=> history.push('/shop') })
          })
        },
        onError: (err) => {
          console.log(err);
          setconfirm({isOpen:true,color:'red',info:'true',title:"Error",subtitle:"Please retry placing your order !! " ,onConfirm:()=> history.push('/cart') })
        },
      })
      .render(paypal.current);
  }, []);




  return (
     <div ref={paypal}>
     </div>
  );
}