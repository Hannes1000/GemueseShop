import React from 'react';
import emailjs from 'emailjs-com';

import './emailsendingPage.css';

export default function ContactUs() {

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

  return (
    <div className="page">
      <p id="bestellungtext">Meine Bestellung</p>
      <div id="linie1"></div>
      <div>
        <form className="contact-form" onSubmit={sendEmail}>
          <input type="hidden" name="contact_number" />
          <div id="name">
            <input type="text" placeholder="Name" name="from_name" />
          </div>
          <div id="bestellung">
            <textarea placeholder="Bestellung" name="message" />
          </div>
          <div id="submit">
            <input type="submit" value="Send" />
          </div>
        </form>
      </div>
      <div id="linie2"></div>
    </div>
    
  );
}