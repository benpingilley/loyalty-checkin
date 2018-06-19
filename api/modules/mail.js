const appRoot = require('app-root-path');
// External Modules
const nodemailer = require('nodemailer');
// Internal Modules
const config = require(`${appRoot}/config`);

const transporter = nodemailer.createTransport(config.smtp);

const emailPoints = (fromEmail, toEmail, points) => {
  const text = 'You currently have ' + points + ' loyalty points!';
  transporter.sendMail({
    from: fromEmail,
    to: toEmail,
    subject: 'Customer Loyalty Program',
    text: text,
  }, function(error, info) {
    transporter.close();
    if (error) {
      return console.log(error);
    }
  });
};

// Export functions as modules for use in other files
exports.emailPoints = emailPoints;
