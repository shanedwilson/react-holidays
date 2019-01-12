import React from 'react';
import PropTypes from 'prop-types';
import holidayShape from '../../../helpers/propz/holidayShape';
import HolidayCard from '../../HolidayCard/HolidayCard';
import './Holidays.scss';

class Holidays extends React.Component {
    static propTypes = {
      holidays: PropTypes.arrayOf(holidayShape.holidayShape),
      deleteSingleHoliday: PropTypes.func,
      passHolidayToEdit: PropTypes.func,
      onHolidaySelection: PropTypes.func,
    }

  holidayDetailsView = (e) => {
    const holidayId = e.target.id;
    this.props.history.push(`/holidays/${holidayId}`);
  }

  render() {
    const {
      holidays,
      deleteSingleHoliday,
      passHolidayToEdit,
      onHolidaySelection,
    } = this.props;

    const holidaysCards = holidays.map(holiday => (
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
