import '../assets/stylesheets/base-forms.css';
import React, { Component } from 'react';
import DonationBox from './DonationBox';

const Appka = React.createClass({
  render() {
    return(
      <div>
        Hello {this.props.name} WORLD !!!
        <DonationBox url="data.json" pollInterval={2000} />
      </div>
    )
  }
});

export default Appka;
