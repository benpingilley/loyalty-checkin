// External Modules
const mongoist = require('mongoist')

const smtp = {
  host: 'smtp.domain.com', // GMAIL: smtp.gmail.com
  port: 465,
  secure: true,
  auth: {
    user: 'first.last@domain.com', // Used my gmail account for testing
    pass: 'xxXxxXXxXxxX' // Used real password
  }
}

const dbConnection = () => {
  return mongoist('mongodb://mongodb:27017/customers')
}

// Export functions as modules for use in other files
exports.dbConnection = dbConnection
exports.smtp = smtp