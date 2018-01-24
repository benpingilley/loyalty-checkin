// External Modules
const nodemailer = require('nodemailer')
// Internal Modules
const config = require('./config')

const transporter = nodemailer.createTransport(config.smtp)

const emailPoints = (fromEmail, toEmail, points, callback) => {
  const text = 'You currently have ' + points + ' loyalty points!'
  transporter.sendMail({
    from: fromEmail,
    to: toEmail,
    subject: 'Customer Loyalty Program',
    text: text,
  }, function(error, info) {
    if (error) {
      callback(500, error)
    } else {
      callback(200, 'Message Sent')
    }
    transporter.close()
  })
}

// Export functions as modules for use in other files
exports.emailPoints = emailPoints