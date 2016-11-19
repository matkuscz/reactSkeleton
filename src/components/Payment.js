const React = require('react');
const InputError = require('./InputError');

var Payment = React.createClass({
  //we have no error checking for this one, so there are no error states
  getInitialState: function() {
    return {
      displayClass: 'invisible'
    };
  },
  handleClick: function(displayClass, e) {
    //we simply set the state in order to update the display when
    //we want to show the extra options
    this.setState({displayClass: displayClass});
  },
  render: function() {
    //we take full control over the checkbox that allows us to show additional options
    //this will ensure that we truly toggle the options, and don't wind up with a case
    //where the checkbox is not checked but the extra options show and vice versa
    var optionsClass = "invisible";
    var isChecked = false;
    if (this.state.displayClass == 'invisible') {
      optionsClass = "visible";
    }
    else {
      isChecked = true;
    }

    //We could have extra checkboxes, but this is just to show how to properly show other options
    //when a checkbox is checked. We won't do error checking on the payment info here.
    return (
      <div className="payment">
        <a href="#">PayPal button goes here</a>
        <br />
        <input type="checkbox" checked={isChecked} onChange={this.handleClick.bind(this, optionsClass)} name="card" />Pay with card<br />
  	    <div id="Choices" className={this.state.displayClass}>Credit Card Information<br />
  		    <input type="text" placeholder="Card number" ref="card" />Card number<br />
  		    <input type="text" placeholder="CVV" ref="cvv" />CVV<br />
  		    <input type="text" placeholder="etc" ref="whatever" />Etc<br />
  	    </div>
        <InputError
          visible={this.state.errorVisible}
          errorMessage={this.state.errorMessage} />
      </div>
    );
  }
});

module.exports = Payment;
