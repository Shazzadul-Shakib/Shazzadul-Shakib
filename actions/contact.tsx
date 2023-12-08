'use server'

import { transporter, mailOptions } from "@/config/nodemailer";

function Reset() { 
  const name = '' ;
  const email = '' ;
  const message = '';
  return {
    name,email,message
  }
}

 function ContactInfo(formData: FormData) {
   const name = formData.get("name");
   const email = formData.get("email");
   const message = formData.get("message");
   return {
     name: name ? String(name) : null,
     email: email ? String(email) : null,
     message: message ? String(message) : null,
   };
 }
export async function Submit(formData: FormData) {
  
  const {name,email,message} = ContactInfo(formData);

  try {
    transporter.sendMail({
      ...mailOptions,
      subject: "Message from portfolio.",
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    });
  } catch (error) {
    console.log(error);
  } finally {
    console.log('OK')
    Reset();
  }
}
