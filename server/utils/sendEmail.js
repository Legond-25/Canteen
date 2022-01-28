const sgMail = require("@sendgrid/mail");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });
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
        console.log("Email Sent successfully");
      },
      (error) => {
        console.error(error);

        if (error.response) {
          console.error(error.response.body);
        }
      }
    );
};

module.exports = sendEmail;
