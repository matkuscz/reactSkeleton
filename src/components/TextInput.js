import React from 'react';

var TextInput = React.createClass({
  getInitialState: function () {
    // most of these variables have to do with errors
    return({
      isEmpty: true,
      value: null,
      valid: false,
      errorMessage: 'Input is invalid',
      errorVisible: false
    });
  },
  handleChange: function (event) {
    // validate this field locally
    this.validation(event.target.value);

    // Call onChange() method on parent component for updating it's state
    // If saving this field for final form submissions, it gets passed
    // up to the top component for sending to the server -- WTF?
    if(this.props.onChange) {
      this.props.onChange(event);
    }
  },
  validation: function (value, valid) {
    // The valid variable is optional, and true if not passed in:
    if(typeof valid === 'undefined') {
      valid = true;
    }

    var message = '';
    var errorVisible = false;

    // we know how to validate text fields based on information passed thru props
    if(!valid) {
      // This happens when the user leaves the field, but it is not valid
      // We do final validation in the parent component, then pass the result here
      // to display
      message = this.props.errorMessage;
      valid = false;
      errorVisible = true;
    }
    else if(this.props.required && jQuery.isEmptyObject(value)) {
      // This happens when we have a required fild with no text entered
      // in this case, we want the "emptyMessage" error displayed
      message = this.props.emptyMessage;
      valid = false;
      errorVisible = true;
    }
    else if(value.length < this.props.minCharacters) {
      // This happens when the text entered is not the required length,
      // in which case we show the regular error message
      message = this.props.errorMessage;
      valid = false;
      errorVisible = true;
    }

    // Setting the state will update the display,
    // causing the error message to display if there is one.
    this.setState({
      value: value,
      isEmpty: jQuery.isEmptyObject(value),
      valid: valid,
      errorMessage: message,
      errorVisible: errorVisible
    });
  },
  handleBlur: function (event) {
    // Complete final validation from parent element when complete
    var valid = this.props.validate(event.target.value);
    // Pass the result to the local validation element for displaying the error
    this.validation(event.target.value, valid);
  },
  render: function () {
    return(
      <div className={this.props.uniqueName}>
        <input
          placeholder={this.props.text}
          className={'input input-' + this.props.uniqueName}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          value={this.state.value}
        />

        <InputError
          visible={this.state.errorVisible}
          errorMessage={this.state.errorMessage}
        />
      </div>
    );
  }

});
