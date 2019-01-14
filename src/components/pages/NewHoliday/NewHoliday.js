import React from 'react';
import holidaysData from '../../../helpers/data/holidaysData';
import authRequests from '../../../helpers/data/authRequests';

import './NewHoliday.scss';

const defaultHoliday = {
  name: '',
  Date: '',
  imageUrl: '',
  location: '',
  startTime: '',
  uid: '',
};

class NewHoliday extends React.Component {
  state = {
    newHoliday: defaultHoliday,
  }

  formFieldStringState = (name, e) => {
    e.preventDefault();
    const tempHoliday = { ...this.state.newHoliday };
    tempHoliday[name] = e.target.value;
    this.setState({ newHoliday: tempHoliday });
  }

  nameChange = e => this.formFieldStringState('name', e);

  dateChange = e => this.formFieldStringState('Date', e);

  imageChange = e => this.formFieldStringState('imageUrl', e);

  locationChange = e => this.formFieldStringState('location', e);

  startTimeChange = e => this.formFieldStringState('startTime', e);


  addHoliday = (newHoliday) => {
    holidaysData.createHoliday(newHoliday)
      .then(() => {
        this.props.history.push('/holidays');
      });
  }

  formSubmit = (e) => {
    e.preventDefault();
    const myHoliday = { ...this.state.newHoliday };
    myHoliday.uid = authRequests.getCurrentUid();
    this.addHoliday(myHoliday);
    this.setState({ newHoliday: defaultHoliday });
  }

  render() {
    const { newHoliday } = this.state;

    return (
      <div className="new-holiday mx-auto">
        <div className="holiday-form mt-5">
          <form onSubmit={this.formSubmit}>
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
                value={newHoliday.name}
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
                value={newHoliday.Date}
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
                value={newHoliday.imageUrl}
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
                value={newHoliday.location}
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
                value={newHoliday.startTime}
                onChange={this.startTimeChange}
              />
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

export default NewHoliday;
