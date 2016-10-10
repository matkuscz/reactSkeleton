import React from 'react';

var DonationForm = React.createClass({
  getInitialState: function () {
    // only for example
    return({
      contributor: ""
    });
  },
  handleSubmit: function(e) {
    // we dont want to submit this form here
    e.preventDefault();

    var contributor = this.state.contributor.trim();

    if( !contributor ) {
      return ();
    }

    // we submit thru parent element
    this.props.onDonationSubmit( {contributor: contributor} );
  },
  validateEmail: function(value) {
    // will accept dollar amounts with two digits after the decimal or no decimal
    // will also accept a number with or without dollar sign
    var regex = /^\$?[0-9]+(\.[0-9])?$/;
    return regex.test(value);
  },
  commonValidate: function() {
    // something usual ...
    return(true);
  },
  setContributor: function(event) {
    // If the contributor input field were directly within this
    // component, we could use this.refs.contributor.value
    // Instead, we want to save the data when the form is submitted
    this.setState({
      contributor: event.target.value
    });
  },
  render: function() {
    // Each form field is actualy another component
    // Two of the form fields use the same component, but with different variables
    return(
      <form className="donationForm" onSubmit={this.handleSubmit}>
        <h2>University donation</h2>

        <TextInput
          uniqueName="email"
          text="Email Address"
          required={true}
          minCharacters={6}
          validate={this.validateEmail}
          onChange={this.handleEmailSubmit}
          errorMessage="Email is invalid"
          emptyMessage="Email is required"
        />
        <br /> <br />

        { /* This Department is specialized to include two fields in one */}
        <h4>Where would you like your donation to go?</h4>
        <Department />
        <br /> <br />

        { /* This Radios component is specialized to include two fields in one */ }
        <Radios
          values={[10, 20, 30]}
          name="Amount"
          addAny={true}
          anyLabel="Donate a custom amount"
          anyPlaceholder="Amount (0.00)"
          anyValidation={this.validateDollars}
          anyErrorMessage="Amount is not a valid dollar amount"
          itemLabel={'Donate $[VALUE]'}
        />
        <br /> <br />

        <h4>Payment Information</h4>
        <Payment />
        <br />

        <input type="submit" value="Submit" />
      </form>
    )
  }
})
