import React from 'react';
import authRequests from '../../../helpers/data/authRequests';
import friendsData from '../../../helpers/data/friendsData';
import holidaysData from '../../../helpers/data/holidaysData';
import holidayFriendsData from '../../../helpers/data/holidayFriendsData';
import './HolidayFriends.scss';

class HolidayFriends extends React.Component {
  state = {
    singleHoliday: [],
    friends: [],
  }

  componentDidMount() {
    const firebaseId = this.props.match.params.id;
    const uid = authRequests.getCurrentUid();
    holidaysData.getSingleHoliday(firebaseId)
      .then((singleHoliday) => {
        this.setState({ singleHoliday });
      })
      .catch((error) => {
        console.error('error in getting one holiday', error);
      });

    friendsData.getAllFriends(uid)
      .then((friends) => {
        this.setState({ friends });
      })
      .catch((error) => {
        console.error('error in getting friends', error);
      });
  }

  render() {
    const {
      singleHoliday,
    } = this.state;

    return (
      <div className="holiday-friends mx-auto mt-5">
        <h3>Add Friends to {singleHoliday.name}</h3>
      </div>
    );
  }
}

export default HolidayFriends;
