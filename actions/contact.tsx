'use server'


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
  const contactInfo = ContactInfo(formData);
  console.log(contactInfo);
}