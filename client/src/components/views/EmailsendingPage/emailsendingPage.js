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

    // let ergstr = "Name: " + name + "<br>Telefonnummer: " + telefonnumber + "<br>E-Mail: " + email + "<br>"

    let str = orderString
    str.replaceAll(/\n/g, "<br>")
    setOrderString(str)
    //console.log(str)
    // ergstr += str
    // //console.log(ergstr)

    // var timeToWait = 3000; // 1000 = 1 second
    // setTimeout(() => {
    //   console.log("Text printed after 3 seconds");
    // }, timeToWait);

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
                      setEmail(response.data.user.email)
                    }else{
                        alert("Failed to load Product")
                    }
                })
                let orderstr = ""
                for(let i = 0; i < response.data.order.products.length; i++){
                  //orderstr += response.data.order.products[i].name + "/n"
                  orderstr += response.data.order.products[i].name + ": "
                  orderstr += response.data.order.menge[i] + "\n"
                }
                setOrderString(orderstr)
                //orderstr += response.data.order.products[1].name
                //console.log(response.data.order.products[1].name)
                //console.log(orderstr)
                //console.log(response.data.order.products[0])
                //console.log(response.data.order.products.length)
                //producte erhalten
                // for(let i = 0; i < response.data.order.products.length; i++){
                //   Axios.post('/api/product/getProductByID/' + response.data.order.products[i])
                //   .then(response => {
                //       if(response.data.success){
                //         console.log(response.data.product.name)
                //         //setOrderString([...orderString, response.data.product.name])
                //       }else{
                //           alert("Failed to load Product")
                //       }
                //   })
                // }
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
          <div id="name">
            <Input type="text" placeholder="Telefonnummer" name="from_tel" value={telefonnumber}/>
          </div>
          <div id="name">
            <Input type="text" placeholder="E-Mail" name="from_email" value={email}/>
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