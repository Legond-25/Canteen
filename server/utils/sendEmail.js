const dotenv = require('dotenv');
const sgMail = require('@sendgrid/mail');

dotenv.config({ path: './.env' });

const sgMailApiKey = process.env.SENDGRID_API_KEY;
sgMail.setApiKey(sgMailApiKey);

const sendEmail = async (options) => {
  sgMail
    .send({
      from: process.env.EMAIL,
      to: options.email,
      subject: options.subject,
      text: options.message,
    })
    .then(
      () => {
        console.log('Email Sent successfully');
      },
      (error) => {
        console.error(error);

        if (error.response) {
          console.error(error.response.body);
        }
      }
    );
};

// class Email {
//   constructor(user, url) {
//     this.to = user.email;
//     this.firstName = user.name.split(' ')[0];
//     this.url = url;
//     // this.from = `Canteen <${process.env.}>`
//   }
// }

module.exports = sendEmail;
