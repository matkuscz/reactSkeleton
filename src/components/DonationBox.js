import React, { Component } from 'react';

var DonationBox = React.createClass({
  handleDonationSubmit: function (donation) {
    // Just example
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: donation,
      success: function (data) {
        data: data
      },
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }
    });
  },
  getInitialState: function () {
    // not currently used
    return({ data: [] });
  },
  render: function () {
    return(
      <div className="donationBox">
        {/* JSX COMMENT */}
        {/* Perhaps list of new donations */}
        <DonationForm onDonationSubmit={this.handleDonationSubmit} />
      </div>
    );
  }
});

export default DonationBox;
