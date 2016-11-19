const React = require('react');
const InputError = require('./InputError');

var Department = React.createClass({
  getInitialState: function() {
    return {
      displayClass: 'invisible'
    };
  },
  handleClick: function(e) {
    //We're doing another one of these "any value" fields, only shown when
    //a specific "other" option is chosen
    var displayClass = 'invisible';
    if (e.target.value == 'other') {
      displayClass = 'visible';
    }
    this.setState({displayClass: displayClass});
  },
  render: function() {
    //This is a select field with options and sub-options, plus an "any value" field
    return (
      <div className="department">
        <select onChange={this.handleClick} multiple={false} ref="department">
          <option value="none"></option>
          <optgroup label="College">
            <option value="muir">Muir</option>
            <option value="revelle">Revelle</option>
            <option value="sixth">Sixth</option>
          </optgroup>
          <optgroup label="School">
            <option value="jacobs">Jacobs School of Engineering</option>
            <option value="global">School of Global Policy and Strategy</option>
            <option value="medicine">School of Medicine</option>
          </optgroup>
          <option value="scholarships">Scholarships</option>
          <option value="other">Other</option>
        </select>
        <div className={this.state.displayClass}>
          <input className="anyValue" type="text" placeholder="Department" ref="any-department" />
        </div>

        <InputError
          visible={this.state.errorVisible}
          errorMessage={this.state.errorMessage} />
      </div>
    );
  }
});

module.exports = Department;
