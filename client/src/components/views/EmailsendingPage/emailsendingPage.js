import emailjs from 'emailjs-com';
import React, {useEffect, useState} from 'react'
import Axios from "axios";
import {Typography, Button, Form, Message, Input, Icon} from "antd";

import './emailsendingPage.css';

export default function ContactUs(props) {

  const [orderString, setOrderString] = useState()
  const [name, setName] = useState()
  const [telefonnumber, setTelefonnumber] = useState()
  const [email, setEmail] = useState()

  function sendEmail(e) {
    e.preventDefault();

    emailjs.sendForm('service_557c2xm', 'template_xbg7wrw', e.target, 'user_sHvuknvtV0sHVEGaQecVc')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
      e.target.reset();
  }

  
  const onOrderChange = (event) =>{
      setOrderString(event.currentTarget.value)
  }

  useEffect(() =>{
    Axios.post('/api/order/getOrderById/' + props.match.params.id)
        .then(response => {
            if(response.data.success){
                //console.log(response.data.order)
                //setOrder(response.data.order)
                //user erhalten
                Axios.post('/api/users/getUserByID/' + response.data.order.user)
                .then(response => {
                    if(response.data.success){
                      //console.log(response.data.user)
                      setName(response.data.user.name)
                      setTelefonnumber(response.data.user.telephone)
                      setTelefonnumber(response.data.user.email)
                    }else{
                        alert("Failed to load Product")
                    }
                })
                //console.log(response.data.order.products.length)
                //producte erhalten
                for(let i = 0; i < response.data.order.products.length; i++){
                  Axios.post('/api/product/getProductByID/' + response.data.order.products[i])
                  .then(response => {
                      if(response.data.success){
                        console.log(response.data.product.name)
                        //setOrderString([...orderString, response.data.product.name])
                      }else{
                          alert("Failed to load Product")
                      }
                  })
                }
            }else{
                alert("Failed to load Product")
            }
        })
  }, [])

  return (
    <div className="page">
      <p id="bestellungtext">Meine Bestellung</p>
      <div id="linie1"></div>
      <div>
        <form className="contact-form" onSubmit={sendEmail}>
          <div id="name">
            <Input type="text" placeholder="Name" name="from_name" value={name}/>
          </div>
          <div id="bestellung">
            <textarea placeholder="Bestellung" name="message" value={orderString} onChange={onOrderChange}/>
          </div>
          <div id="submit">
            <Input type="submit" value="Send" />
          </div>
        </form>
      </div>
      <div id="linie2"></div>
    </div>
  );
}