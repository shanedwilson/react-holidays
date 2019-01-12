import React from 'react';
import PropTypes from 'prop-types';
import holidayShape from '../../helpers/propz/holidayShape';
import authRequests from '../../helpers/data/authRequests';

import './HolidayCard.scss';

class FriendCard extends React.Component {
    static propTypes = {
      holiday: holidayShape.holidayShape,
      deleteSingleHoliday: PropTypes.func,
      passHolidayToEdit: PropTypes.func,
    }

  deleteEvent = (e) => {
    e.preventDefault();
    const { deleteSingleHoliday, holiday } = this.props;
    deleteSingleHoliday(holiday.id);
  }

  editEvent = (e) => {
    e.preventDefault();
    const { passHolidayToEdit, holiday } = this.props;
    passHolidayToEdit(holiday.id);
  }

  holidayClick = (e) => {
    e.stopPropagation();
    const { holiday, onSelect } = this.props;
    onSelect(holiday.id);
  }

  render() {
    const { holiday } = this.props;
    const uid = authRequests.getCurrentUid();

    const makeButtons = () => {
      if (holiday.uid === uid) {
        return (
        <div>
          <span className="col">
            <button className="btn btn-default" onClick={this.editEvent}>
              <i className="fas fa-pencil-alt"></i>
            </button>
          </span>
          <span className="col">
            <button className="btn btn-default" onClick={this.deleteEvent}>
              <i className="fas fa-trash-alt"></i>
            </button>
          </span>
        </div>
        );
      }
      return <span className="col-2"></span>;
    };
    return (
      <div className="card col-3 mt-3 mr-1">
        <h5 className="card-header">{holiday.name}</h5>
        <div className="card-body">
          <img class="card-img-top" src={holiday.imageUrl} alt={holiday.name} />
          <p className="card-text">{holiday.Date}</p>
          <p className="card-text">{holiday.location}</p>
          <p className="card-text">{holiday.startTime}</p>
          {makeButtons()}
        </div>
      </div>
    );
  }
}

export default FriendCard;
