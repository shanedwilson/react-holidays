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
    notHolidayFriends: [],
    checked: false,
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

    holidayFriendsData.getFriendIdsForHoliday(firebaseId).then((friendIds) => {
      friendsData.getFriendsByArrayOfIds(uid, friendIds).then((holidayFriends) => {
        this.setState({ holidayFriends });
      });
    });

    holidayFriendsData.getFriendIdsForHoliday(firebaseId).then((friendIds) => {
      friendsData.getNotFriendsByArrayOfIds(uid, friendIds).then((notHolidayFriends) => {
        this.setState({ notHolidayFriends });
      });
    });
  }

  checkEvent = (e) => {
    this.setState({ checked: e.target.checked });
  }

  render() {
    const {
      singleHoliday,
      holidayFriends,
      notHolidayFriends,
    } = this.state;

    const friendNames = holidayFriends.map(holidayFriend => (
      <div key={holidayFriend.id} className="card col-4 mt-3 mr-1">
        <h5 className="card-header">{holidayFriend.name}</h5>
        <div className="card-body">
          <input type="checkbox" checked='true' className="form-check-input" id="attendingCheck" onChange={this.checkEvent} />
          <label className="form-check-label" htmlFor="exampleCheck1">Attending {singleHoliday.name}?</label>
        </div>
      </div>
    ));

    const notFriendNames = notHolidayFriends.map(notHolidayFriend => (
      <div key={notHolidayFriend.id} className="card col-4 mt-3 mr-1">
        <h5 className="card-header">{notHolidayFriend.name}</h5>
        <div className="card-body">
          <input type="checkbox" className="form-check-input" id="attendingCheck" onChange={this.checkEvent} />
          <label className="form-check-label" htmlFor="exampleCheck1">Attending {singleHoliday.name}?</label>
        </div>
      </div>
    ));

    return (
      <div className="holiday-friends mx-auto mt-5">
        <h3>Add Friends to {singleHoliday.name}</h3>
        <div className="row justify-content-center">{friendNames}</div>
        <div className="row justify-content-center">{notFriendNames}</div>
      </div>
    );
  }
}

export default HolidayFriends;
