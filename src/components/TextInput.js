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
  }

});
