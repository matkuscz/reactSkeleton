//https://html5hive.org/reactjs-form-validation-tutorial/
const React = require('react');
const TextInput = require('./TextInput');
const Radios = require('./Radios');
const Payment = require('./Payment');
const Department = require('./Department');
const InputError = require('./InputError');

var DonationForm = React.createClass({
  getInitialState: function() {
    //we are only saving the contributor as an example
    //of how to save data changes for final submission
    return {
      contributor: ""
    };
  },
  handleSubmit: function(e) {
    //we don't want the form to submit, so we prevent the defaul behavior
    e.preventDefault();
    var contributor = this.state.contributor.trim();
    if (!contributor) {
      return;
    }

    //Here we do the final submit to the parent component
    this.props.onDonationSubmit({contributor: contributor});
  },
  validateEmail: function (value) {
    // regex from http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(value);
  },
  validateDollars: function (value) {
    //will accept dollar amounts with two digits after the decimal or no decimal
    //will also accept a number with or without a dollar sign
    var regex  = /^\$?[0-9]+(\.[0-9][0-9])?$/;
    return regex.test(value);
  },
  commonValidate: function () {
    //you could do something here that does general validation for any form field
    return true;
  },
  setContributor: function (event) {
    //If the contributor input field were directly within this
    //this component, we could use this.refs.contributor.value
    //Instead, we want to save the data for when the form is submitted
    this.setState({
      contributor: event.target.value
    });
  },
  render: function() {
    //Each form field is actually another component.
    //Two of the form fields use the same component, but with different variables
    return (
      <form className="donationForm" onSubmit={this.handleSubmit}>
        <h2>University Donation</h2>

        <TextInput
          uniqueName="email"
          text="Email Address"
          required={true}
          minCharacters={6}
          validate={this.validateEmail}
          onChange={this.handleEmailInput}
          errorMessage="Email is invalid"
          emptyMessage="Email is required" />
        <br /><br />

        <TextInput
          ref="contributor"
          text="Your Name"
          uniqueName="contributor"
          required={true}
          minCharacters={3}
          validate={this.commonValidate}
          onChange={this.setContributor}
          errorMessage="Name is invalid"
          emptyMessage="Name is required" />
        <br /><br />

        {/* This Department component is specialized to include two fields in one */}
        <h4>Where would you like your donation to go?</h4>
        <Department />
        <br /><br />

        {/* This Radios component is specialized to include two fields in one */}
        <h4>How much would you like to give?</h4>
        <Radios
          values={[10, 25, 50]}
          name="amount"
          addAny={true}
          anyLabel=" Donate a custom amount"
          anyPlaceholder="Amount (0.00)"
          anyValidation={this.validateDollars}
          anyErrorMessage="Amount is not a valid dollar amount"
          itemLabel={' Donate $[VALUE]'} />
        <br /><br />

        <h4>Payment Information</h4>
        <Payment />
        <br />

        <input type="submit" value="Submit" />
      </form>
    );
  }
});

module.exports = DonationForm;
