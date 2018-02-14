// External Modules
const mongoist = require('mongoist')

const smtp = {
  host: 'smtp.domain.com', // GMAIL: smtp.gmail.com
  port: 465,
  secure: true,
  auth: {
    user: 'first.last@domain.com', // From email address
    pass: 'xxXxxXXxXxxX' // Password
  }
}

const dbConnection = () => {
  return mongoist('mongodb://mongodb:27017/customers')
}

// Export functions as modules for use in other files
exports.dbConnection = dbConnection
exports.smtp = smtp