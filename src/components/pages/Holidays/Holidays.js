import React from 'react';
import holidaysData from '../../../helpers/data/holidaysData';
import authRequests from '../../../helpers/data/authRequests';
import HolidayCard from '../../HolidayCard/HolidayCard';
import './Holidays.scss';

class Holidays extends React.Component {
  state = {
    holidays: [],
  }

  getHolidays = () => {
    const uid = authRequests.getCurrentUid();
    holidaysData.getAllHolidays(uid)
      .then((holidays) => {
        this.setState({ holidays });
      })
      .catch((err) => {
        console.error('error with friends GET', err);
      });
  };

  componentDidMount() {
    this.getHolidays();
  }


  holidayDetailsView = (e) => {
    const holidayId = e.target.id;
    this.props.history.push(`/holidays/${holidayId}`);
  }

  render() {
    const {
      deleteSingleHoliday,
      passHolidayToEdit,
      onHolidaySelection,
    } = this.props;

    const holidaysCards = this.state.holidays.map(holiday => (
    <HolidayCard
    key={holiday.id}
    holiday={holiday}
    deleteSingleHoliday={deleteSingleHoliday}
    onSelect={onHolidaySelection}
    passHolidayToEdit={passHolidayToEdit}
    />
    ));
    return (
      <div className="holidays mx-auto">
        <h2>Holidays</h2>
        <div className="row justify-content-center">{holidaysCards}</div>
      </div>
    );
  }
}

export default Holidays;
