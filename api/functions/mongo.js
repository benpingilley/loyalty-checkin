// Internal Modules
const config = require('./config')
const mail = require('./mail')

/**
 * Check if phone number exists in database
 * @param {str} phone - Phone Number
 * @return {boolean} - True/False
 */
const checkPhoneNumber = async (phone) => {
  const db = config.dbConnection()
  const body = { "phone": phone } // Create variable with mongo query for customer's phone number
  const exists = await db.customers.find(body) // Return customer with matching phone number
  db.close()
  return exists[0]
}

/**
 * Add points to customer, increment checkin count, update lastModified
 * @param {str} phone - Phone Number
 * @return {boolean} - True/False
 */
const customerCheckin = async (body) => {
  const db = config.dbConnection()
  body.checkins++ // Increment checkin
  body.lastModified = Date.now() // Update the lastModified timestamp
  body.points = body.points + 20 // Add 20 points to customer
  const find = { "phone": body.phone } // Create variable with mongo query for customer's phone number
  const updated = await db.customers.update( find, { $set: body }) // Return the customer's updated document
  mail.emailPoints(config.smtp.auth.user, body.email, body.points) // Send email to customer
  db.close()
  return updated
}

/**
 * Insert new customer
 * @param {object} body - Customer information
 * @return {boolean} - True/False
 */
const newCustomer = async (body) => {
  const db = config.dbConnection()
  body.points = 50 // New customers start with 50 points
  body.checkins = 0 // New customers have not yet checked in
  body.lastModified = Date.now() // Set lastModified timestamp to now
  const inserted = await db.customers.insert(body) // Return new customer's document
  db.close()
  return inserted
}

// Export functions as modules for use in other files
exports.newCustomer = newCustomer
exports.checkPhoneNumber = checkPhoneNumber
exports.customerCheckin = customerCheckin