const React = require('react');
const InputError = require('./InputError');

var Radios = React.createClass({
  getInitialState: function() {
    //displayClass is the class we use for displaying or hiding
    //the optional "any value" text field
    return {
      displayClass: 'invisible',
      valid: false,
      errorMessage: "Input is invalid",
      errorVisible: false
    };
  },
  handleClick: function(displayClass, e) {
    //if we click any option other than the "any value" option,
    //we hide the "any value" text field. Otherwise, show it
    if (displayClass == 'invisible') {
      this.setState(
        {
          displayClass: displayClass,
          errorVisible: false
        }
      );
    }
    else {
      this.setState({displayClass: displayClass});
    }
  },
  handleAnyChange: function(e) {
    //this validation is specifically for the optional "any value" text field
    //Since we have no idea what the requirements are locally, we call the parent
    //validation function, then set the error states accordingly
    if (this.props.anyValidation(e.target.value)) {
      this.setState(
        {
          valid: true,
          errorMessage: "Input is invalid",
          errorVisible: false
        }
      );
    }
    else {
      this.setState(
        {
          valid: false,
          errorMessage: this.props.anyErrorMessage,
          errorVisible: true
        }
      );
    }
  },
  render: function() {
    var rows = [];
    var label = "";

    //we have passed in all the options for the radios, so we traverse the array
    for (var i = 0; i < this.props.values.length; i++) {
      //We do this little replace for when we want to display the value as part of
      //additional text. Otherwise, we would just put '[VALUE]' when passing
      //the itemLabel prop from the parent component, or leave out '[VALUE]' entirely
      label = this.props.itemLabel.replace('[VALUE]', this.props.values[i]);

      //You'll see that even the <br /> field has a key. React will give you errors
      //if you don't do this. This is just an axample of what's possible, but
      //you would normally add extra spacing with css
      rows.push(<input
        key={this.props.name + '-' + i}
        type="radio"
        ref={this.props.name + '-' + this.props.values[i]}
        name={this.props.name}
        value={this.props.values[i]}
        onClick={this.handleClick.bind(this, 'invisible')} />,

        <label key={this.props.name + '-label-' + i} htmlFor={this.props.values[i]}>{label}</label>,

        <br key={this.props.name + '-br-' + i} />);
    }

    //The "any value" field complicates things a bit
    if (this.props.addAny) {
      //we passed in a separate label just for the option that
      //activates the "any value" text field
      label = this.props.anyLabel;
      rows.push(<input
        key={this.props.name + '-' + i}
        type="radio"
        ref={this.props.name + '-any'}
        name={this.props.name} value="any"
        onClick={this.handleClick.bind(this, 'visible')} />,

        <label key={this.props.name + '-label-' + i} htmlFor={this.props.values[i]}>{label}</label>);

      //and now we add the "any value text field, with all its special variables"
      rows.push(<div key={this.props.name + '-div-' + (i+2)} className={this.state.displayClass}>
        <input
          className="anyValue"
          key={this.props.name + '-' + (i+1)}
          type="text"
          placeholder={this.props.anyPlaceholder}
          onChange={this.handleAnyChange}
          ref={this.props.name} />
      </div>);
    }

    //Now we just return all those rows, along with the error component
    return (
      <div className="radios">
        {rows}

        <InputError
          visible={this.state.errorVisible}
          errorMessage={this.state.errorMessage} />
      </div>
    );
  }
});

module.exports = Radios;
