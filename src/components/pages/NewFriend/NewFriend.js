import React from 'react';
import PropTypes from 'prop-types';
import authRequests from '../../../helpers/data/authRequests';
import './NewFriend.scss';

const defaultFriend = {
  name: '',
  address: '',
  phoneNumber: '',
  email: '',
  relationship: '',
  isAvoiding: false,
  uid: '',
};

class NewFriend extends React.Component {
  static propTypes = {
    addFriend: PropTypes.func,
  }

  state = {
    newFriend: defaultFriend,
    checkValue: false,
  }

  formFieldStringState = (name, e) => {
    e.preventDefault();
    const tempFriend = { ...this.state.newFriend };
    tempFriend[name] = e.target.value;
    this.setState({ newFriend: tempFriend });
  }

  nameChange = e => this.formFieldStringState('name', e);

  addressChange = e => this.formFieldStringState('address', e);

  phoneNumberChange = e => this.formFieldStringState('phoneNumber', e);

  emailChange = e => this.formFieldStringState('email', e);

  relationshipChange = e => this.formFieldStringState('relationship', e);

  checkEvent = (e) => {
    const isDone = e.target.checked;
    this.setState({ checkValue: isDone });
  }

  formSubmit = (e) => {
    e.preventDefault();
    const myFriend = { ...this.state.newFriend };
    myFriend.uid = authRequests.getCurrentUid();
    myFriend.isAvoiding = this.state.checkValue;
    this.props.addFriend(myFriend);
    this.setState({ newFriend: defaultFriend });
  }

  render() {
    const { newFriend } = this.state;

    return (
      <div className="new-friend mx-auto">
        <div className="friend-form mt-5">
          <form onSubmit={this.formSubmit}>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="name-pre">Name</span>
              </div>
              <input
                type="text"
                id="name"
                className="form-control"
                placeholder="Joe Blow"
                aria-describedby="nameHelp"
                value={newFriend.name}
                onChange={this.nameChange}
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="address-pre">Address</span>
              </div>
              <input
                type="text"
                id="address"
                className="form-control"
                placeholder="123 Main St"
                aria-describedby="addressHelp"
                value={newFriend.address}
                onChange={this.addressChange}
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="phone-pre">Phone</span>
              </div>
              <input
                type="text"
                id="phoneNumber"
                className="form-control"
                placeholder="123-456-789"
                aria-describedby="phoneHelp"
                value={newFriend.phoneNumber}
                onChange={this.phoneNumberChange}
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="email-pre">Email</span>
              </div>
              <input
                type="text"
                id="email"
                className="form-control"
                placeholder="joe@blow.com"
                aria-describedby="emailHelp"
                value={newFriend.email}
                onChange={this.emailChange}
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="relationship-pre">Relationship</span>
              </div>
              <input
                type="text"
                id="relationship"
                className="form-control"
                placeholder="Yo Momma"
                aria-describedby="relationshipHelp"
                value={newFriend.relationship}
                onChange={this.relationshipChange}
              />
            </div>
            <div className="custom-control custom-checkbox" onChange={ this.checkEvent }>
              <input type="checkbox" className="custom-control-input" id="customCheck1" />
              <label className="custom-control-label" htmlFor="customCheck1">Am I avoiding this person?</label>
            </div>
            <button type="button" className="btn btn-success mt-3" onClick={this.formSubmit}>
              <i className="fas fa-plus"></i>
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default NewFriend;
