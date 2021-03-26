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
    <form className="contact-form" onSubmit={sendEmail}>
      <input type="hidden" name="contact_number" />
      <label>Name</label>
      <input type="text" name="from_name" />
      <label>Email</label>
      <textarea name="message" />
      <input type="submit" value="Send" />
    </form>
  );
}