import React from 'react';
import friendsData from '../../../helpers/data/friendsData';
import authRequests from '../../../helpers/data/authRequests';

import './EditFriend.scss';

const defaultFriend = {
  name: '',
  address: '',
  phoneNumber: 'false',
  email: '',
  relationship: '',
  isAvoiding: false,
  uid: '',
};

class EditFriend extends React.Component {
  state = {
    editedFriend: defaultFriend,
    checkValue: false,
    editId: '-1',
  }

  formFieldStringState = (name, e) => {
    e.preventDefault();
    const tempFriend = { ...this.state.editedFriend };
    tempFriend[name] = e.target.value;
    this.setState({ editedFriend: tempFriend });
  }

  nameChange = e => this.formFieldStringState('name', e);

  addressChange = e => this.formFieldStringState('address', e);

  phoneNumberChange = e => this.formFieldStringState('phoneNumber', e);

  emailChange = e => this.formFieldStringState('email', e);

  relationshipChange = e => this.formFieldStringState('relationship', e);

  checkEvent = (e) => {
    const isAvoiding = e.target.checked;
    this.setState({ checkValue: isAvoiding });
  }

  addEditedFriend = (editedFriend) => {
    const { editId } = this.state;
    friendsData.updateFriend(editedFriend, editId)
      .then(() => {
        this.props.history.push('/friends');
      });
  }

  formSubmit = (e) => {
    const { checkValue } = this.state;
    if (this.canBeSubmitted()) {
      e.preventDefault();
      const myFriend = { ...this.state.editedFriend };
      myFriend.uid = authRequests.getCurrentUid();
      myFriend.isAvoiding = checkValue;
      this.addEditedFriend(myFriend);
      this.setState({ editedFriend: defaultFriend });
    } else {
      alert('Please fill in all fields, jackass!');
    }
  }

  canBeSubmitted() {
    const { editedFriend } = this.state;
    return (
      editedFriend.name.length > 2
      && editedFriend.address.length > 2
      && editedFriend.phoneNumber.length > 2
      && editedFriend.email.length > 2
      && editedFriend.relationship.length > 2
    );
  }

  componentDidMount() {
    const firebaseId = this.props.match.params.id;
    friendsData.getSingleFriend(firebaseId)
      .then((friendToEdit) => {
        this.setState({ editedFriend: friendToEdit });
        this.setState({ checkValue: friendToEdit.isAvoiding });
        this.setState({ editId: friendToEdit.id });
      });
  }

  render() {
    const {
      editedFriend,
      checkValue,
    } = this.state;

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
                value={editedFriend.name}
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
                value={editedFriend.address}
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
                value={editedFriend.phoneNumber}
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
                value={editedFriend.email}
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
                value={editedFriend.relationship}
                onChange={this.relationshipChange}
              />
            </div>
            <div className="custom-control custom-checkbox">
              <input type="checkbox" className="custom-control-input" id="customCheck1" onChange={ this.checkEvent } checked={checkValue}/>
              <label className="custom-control-label" htmlFor="customCheck1">Am I avoiding this person?</label>
            </div>
            <button type="submit" className="btn btn-success mt-3" onClick={this.formSubmit}>
              <i className="fas fa-plus"></i>
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default EditFriend;
