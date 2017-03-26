import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import Delivery from './delivery';
import * as actions from "../actions";

class CustomerInput extends Component {
  constructor(props) {
    super(props);

    this.updateName = this.updateName.bind(this);
    this.updatePhone = this.updatePhone.bind(this);
    this.updateAddress = this.updateAddress.bind(this);
    this.handleDeliveryChange = this.handleDeliveryChange.bind(this);
  }
  updateName(e) {
    this.props.updateName(e.target.value);
  }
  updatePhone(e) {
    this.props.updatePhone(e.target.value);
  }
  updateAddress(e) {
    this.props.updateAddress(e.target.value);
  }
  handleDeliveryChange(e) {
    this.props.setDelivery(e.target.value);
  }
  render() {
    return (
      <div>
        <input
          name="name"
          type="text"
          placeholder="Name"
          value={this.props.name}
          onChange={this.updateName}
        />
        <input
          name="number"
          type="tel"
          placeholder="Phone"
          value={this.props.phone}
          onChange={this.updatePhone}
        />
        <textarea
          name="address"
          placeholder="Address"
          value={this.props.address}
          onChange={this.updateAddress}
        />
        <Delivery
          delivery={this.props.delivery}
          handleDeliveryChange={this.handleDeliveryChange}
        />
      </div>
    );
  }
}

CustomerInput.propTypes = {
  updateName: PropTypes.func,
  updatePhone: PropTypes.func,
  updateAddress: PropTypes.func,
  setDelivery: PropTypes.func,
  name: PropTypes.string,
  phone: PropTypes.string,
  address: PropTypes.string,
  delivery: PropTypes.string
};

const mapStateToProps = ({ order }) => ({
  name: order.name,
  phone: order.phone,
  address: order.address,
  delivery: order.delivery
});

export default connect(mapStateToProps, actions)(CustomerInput);
