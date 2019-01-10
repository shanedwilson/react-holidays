import React from 'react';
import { Button } from 'reactstrap';
import './Holidays.scss';

class Holidays extends React.Component {
  holidayDetailsView = (e) => {
    const holidayId = e.target.id;
    this.props.history.push(`/holidays/${holidayId}`);
  }

  render() {
    return (
      <div className="holidays mx-auto">
        <Button className="btn btn-danger mt-5" id="6789" onClick={this.holidayDetailsView}>Holiday Details</Button>
      </div>
    );
  }
}

export default Holidays;
