import React from 'react';
import holidaysData from '../../../helpers/data/holidaysData';
import authRequests from '../../../helpers/data/authRequests';

import './EditHoliday.scss';

const defaultHoliday = {
  name: '',
  Date: '',
  imageUrl: '',
  location: '',
  startTime: '',
  uid: '',
};

class EditHoliday extends React.Component {
  state = {
    editedHoliday: defaultHoliday,
    editId: '-1',
  }

  formFieldStringState = (name, e) => {
    e.preventDefault();
    const tempHoliday = { ...this.state.editedHoliday };
    tempHoliday[name] = e.target.value;
    this.setState({ editedHoliday: tempHoliday });
  }

  nameChange = e => this.formFieldStringState('name', e);

  dateChange = e => this.formFieldStringState('Date', e);

  imageChange = e => this.formFieldStringState('imageUrl', e);

  locationChange = e => this.formFieldStringState('location', e);

  startTimeChange = e => this.formFieldStringState('startTime', e);

  addEditedHoliday = (editedHoliday) => {
    const { editId } = this.state;
    holidaysData.updateHoliday(editedHoliday, editId)
      .then(() => {
        this.props.history.push('/holidays');
      });
  }

  formSubmit = (e) => {
    const { checkValue } = this.state;
    if (this.canBeSubmitted()) {
      e.preventDefault();
      const myHoliday = { ...this.state.editedHoliday };
      myHoliday.uid = authRequests.getCurrentUid();
      myHoliday.isAvoiding = checkValue;
      this.addEditedHoliday(myHoliday);
      this.setState({ editedHoliday: defaultHoliday });
    } else {
      alert('Please fill in all fields, jackass!');
    }
  }

  canBeSubmitted() {
    const { editedHoliday } = this.state;
    return (
      editedHoliday.Date.length > 2
      && editedHoliday.imageUrl.length > 2
      && editedHoliday.location.length > 2
      && editedHoliday.startTime.length > 2
    );
  }

  componentDidMount() {
    const firebaseId = this.props.match.params.id;
    holidaysData.getSingleHoliday(firebaseId)
      .then((holidayToEdit) => {
        this.setState({ editedHoliday: holidayToEdit });
        this.setState({ editId: holidayToEdit.id });
      });
  }

  render() {
    const { editedHoliday } = this.state;

    return (
      <div className="edit-holiday mx-auto">
        <div className="holiday-form mt-5">
          <form className="holiday-form" onSubmit={ this.formSubmit }>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="name-pre">Name</span>
              </div>
              <input
                type="text"
                id="name"
                className="form-control"
                placeholder="Birthday"
                aria-describedby="nameHelp"
                value={editedHoliday.name}
                onChange={this.nameChange}
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="address-pre">Date</span>
              </div>
              <input
                type="text"
                id="date"
                className="form-control"
                placeholder="5/2/70"
                aria-describedby="dateHelp"
                value={editedHoliday.Date}
                onChange={this.dateChange}
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="phone-pre">Image Url</span>
              </div>
              <input
                type="text"
                id="imageUrl"
                className="form-control"
                placeholder="www.yup.com/img"
                aria-describedby="imageUrlHelp"
                value={editedHoliday.imageUrl}
                onChange={this.imageChange}
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="email-pre">Location</span>
              </div>
              <input
                type="text"
                id="location"
                className="form-control"
                placeholder="My House"
                aria-describedby="locationHelp"
                value={editedHoliday.location}
                onChange={this.locationChange}
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="relationship-pre">Start Time</span>
              </div>
              <input
                type="text"
                id="start-time"
                className="form-control"
                placeholder="High Noon"
                aria-describedby="relationshipHelp"
                value={editedHoliday.startTime}
                onChange={this.startTimeChange}
              />
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

export default EditHoliday;
