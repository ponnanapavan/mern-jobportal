import { MailtrapClient } from "mailtrap"
import { welcomeMailHtmlTemplate } from "./mailTemplate.js";

export const sendWelcomeMail=async(email,personType)=>{



    const token=process.env.MAILTRAP_TOKEN;

    try{
        const client = new MailtrapClient({
              token: token,
            });

            const sender = {
                  email: process.env.MAIL_TRAP_EMAIL,
                  name: process.env.MAIL_TRAP_NAME,
                };
                const recipients = [
                  {
                    email: email,
                  }
                ];

                
                    client
                    .send({
                        from: sender,
                        to: recipients,
                        subject: "You are awesome!",
                        html: welcomeMailHtmlTemplate(personType),
                        category: "Integration Test",
                    })
                    .then(console.log, console.error);



    }catch(err){

          console.error("wronf");
          
    }


    
      

     
      
}



// const { MailtrapClient } = require("mailtrap");

// const TOKEN = "b5d02332b639225a820706867534852c";

// const client = new MailtrapClient({
//   token: TOKEN,
// });

// const sender = {
//   email: "hello@demomailtrap.com",
//   name: "Mailtrap Test",
// };
// const recipients = [
//   {
//     email: "pavanponnana1@gmail.com",
//   }
// ];

// client
//   .send({
//     from: sender,
//     to: recipients,
//     subject: "You are awesome!",
//     text: "Congrats for sending test email with Mailtrap!",
//     category: "Integration Test",
//   })
//   .then(console.log, console.error);

