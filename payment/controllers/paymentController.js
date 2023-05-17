require("dotenv").config();

const { sendEmail } = require("../services/userServices");

//send mail





const paymentConfirmationMail = async (req, res) => {
    
    var email = req.params.email;

    await sendEmail(email, 'message')
  
    
  };

  module.exports ={
    paymentConfirmationMail
  }