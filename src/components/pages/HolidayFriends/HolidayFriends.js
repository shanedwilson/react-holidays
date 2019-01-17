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
    holidayFriends: [],
    isAttending: false,
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

    holidayFriendsData.getAllHolidayFriends(uid)
      .then((holidayFriends) => {
        this.setState({ holidayFriends });
      })
      .catch((error) => {
        console.error('error in getting friends', error);
      });
  }

  render() {
    const {
      singleHoliday,
      friends,
    } = this.state;

    const friendNames = friends.map(friend => (
      <div key={friend.id} className="card col-3 mt-3 mr-1">
        <h5 className="card-header">{friend.name}</h5>
        <div className="card-body">
          <input type="checkbox" className="form-check-input" id="attendingCheck" />
          <label className="form-check-label" htmlFor="exampleCheck1">Attending {singleHoliday.name}?</label>
        </div>
      </div>
    ));

    return (
      <div className="holiday-friends mx-auto mt-5">
        <h3>Add Friends to {singleHoliday.name}</h3>
        <div className="row justify-content-center">{friendNames}</div>
      </div>
    );
  }
}

export default HolidayFriends;
