import React, { Component } from 'react'
import { FormErrors } from './FormErrors'
import './Form.css'
import Cleave from 'cleave.js/react';
// eslint-disable-next-line
import CleavePhone from 'cleave.js/dist/addons/cleave-phone.us';

class Form extends Component {
  constructor (props) {
    super(props)
    this.state = {
      phone: '',
      firstName: '',
      lastName: '',
      email: '',
      points: false,
      phoneValid: false,
      formValid: true,
      formErrors: {phone: '', firstName: '', lastName: '', email: ''},
      showCustomerDetails: false
    }
    this.checkIn = this.checkIn.bind(this)
    this.newCustomer = this.newCustomer.bind(this)
    this.clear = this.clear.bind(this)
  }

  cleave = new Cleave('.input-phone', {
    phone: true,
    phoneRegionCode: 'us'
  });

  checkIn = async() =>  {
    const { phone } = this.state
    try {
      const url = 'http://localhost:8080/api/checkin/' + phone
      const response = await fetch(url)
      if(response.status === 200) {
        console.log(response.status)
        const responseJson = await response.json()
        console.log(responseJson)
        this.setState({ points: responseJson.points })
        return responseJson
      } else if (response.status === 202) {
        console.log(response.status)
        console.log("Must wait 5 minute between check-ins")
        return
      } else {
        console.log(response.status)
        console.log("Customer does not exist")
        this.setState({ showCustomerDetails: true })
        return
      }
    } catch (error) {
      console.error(error)
    }
  }

  newCustomer = async() => {
    const { phone, firstName, lastName, email } = this.state
    this.setState({ showCustomerDetails: false })
    try {
      const url = 'http://localhost:8080/api/newcustomer'
      const jsonbody = {
        "phone": phone,
        "firstName": firstName,
        "lastName": lastName,
        "email": email
      }
      const header = {'Content-Type': 'application/json', 'Accept': 'application/json'}
      let response = await fetch(url, {
        method: 'POST',
        headers: header,
        body: JSON.stringify(jsonbody)
      })
      let responseJson = await response.json()
      return responseJson
    } catch (error) {
      console.error(error)
    }
  }

  clear() {
      this.setState({ phone: '', firstName: '', lastName: '', email: '', points: false })
  }

  handleUserInput = (e) => {
    const name = e.target.name
    const value = e.target.value
    this.setState({[name]: value},
      () => { this.validateField(name, value) })
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors
    let phoneValid = this.state.phoneValid

    switch(fieldName) {
      case 'phone':
        phoneValid = value.match(/^\d{3}-\d{3}-\d{4}$/i)
        fieldValidationErrors.phone = phoneValid ? '' : ' is invalid'
        break
      default:
        break
    }
    this.setState({ formErrors: fieldValidationErrors,
                    phoneValid: phoneValid
                  }, this.validateForm)
  }

  validateForm() {
    this.setState({ formValid: this.state.phoneValid })
  }
 
  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error')
  }

  onSubmit = (e) => {
    e.preventDefault()
  }

  render () {
    return (
      <form className="theForm" onSubmit={this.onSubmit}>
        <h2>Customer Loyalty Program</h2>
        <div className="panel panel-error">
          <FormErrors formErrors={this.state.formErrors} />
        </div>
        <div>
          <label htmlFor="phone">Phone Number</label>
          <Cleave type="text" required className="form-control" name="phone"
            options={{ phone: true, phoneRegionCode: 'US', delimiter: '-' }}
            placeholder="555-555-5555"
            value={this.state.phone}
            onChange={this.handleUserInput}  />
        </div>
        { this.state.showCustomerDetails 
            ? <div>
              <label htmlFor="firstName">First Name</label>
              <input type="firstName" required className="form-control" name="firstName"
                placeholder="John"
                value={this.state.firstName}
                onChange={this.handleUserInput}  />
            </div>
            : null
        }
        { this.state.showCustomerDetails 
            ? <div>
                <label htmlFor="lastName">Last Name</label>
                <input type="lastName" required className="form-control" name="lastName"
                  placeholder="Doe"
                  value={this.state.lastName}
                  onChange={this.handleUserInput}  />
              </div>
            : null
        }
        { this.state.showCustomerDetails 
            ? <div>
                <label htmlFor="email">Email Address</label>
                <input type="email" required className="form-control" name="email"
                  placeholder="john.doe@mail.com"
                  value={this.state.email}
                  onChange={this.handleUserInput}  />
              </div>
            : null
        }
        { this.state.showCustomerDetails 
            ? null
            : <div style={{margin:10, display: 'inline-block'}}>
                <button type="submit" className="btn btn-primary" onClick={this.checkIn}>Check In</button>
              </div>
        }
        { this.state.showCustomerDetails
            ? <div style={{margin:10, display: 'inline-block'}}>
                <button type="submit" className="btn btn-primary" onClick={this.newCustomer}>Sign Up</button>
              </div>
            : null
        }
        <div style={{margin:10, display: 'inline-block'}}>
          <button type="reset" className="btn btn-primary" onClick={this.clear}>Clear</button>
        </div>
        { this.state.points
            ? <div className="panel panel-points" style={{margin:10}}>
                {this.state.firstName + ", you have " + this.state.points + " points!"}
              </div>
            : null
        }
      </form>
    )
  }
}

export default Form