import React from 'react';
import authRequests from '../../../helpers/data/authRequests';
import friendsData from '../../../helpers/data/friendsData';
import holidaysData from '../../../helpers/data/holidaysData';
import holidayFriendsData from '../../../helpers/data/holidayFriendsData';
import './HolidayFriends.scss';

const defaultHolidayFriend = {
  holidayId: '',
  friendId: '',
};

class HolidayFriends extends React.Component {
  state = {
    singleHoliday: [],
    friends: [],
    holidayFriends: [],
    notHolidayFriends: [],
    newHolidayFriend: defaultHolidayFriend,
    singleHolidayFriend: [],
  }

  holidayFriendsGetter = () => {
    const firebaseId = this.props.match.params.id;
    const uid = authRequests.getCurrentUid();
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

  componentDidMount() {
    this.holidayFriendsGetter();
  }

  createHolidayFriend = (myHolidayFriend) => {
    holidayFriendsData.createHolidayFriend(myHolidayFriend);
  }

  deleteHolidayFriend = () => {
    const friendIdToRemove = this.state.singleHolidayFriend[0].id;
    holidayFriendsData.deleteHolidayFriend(friendIdToRemove)
      .then(() => {
        this.holidayFriendsGetter();
        this.setState({ singleHolidayFriend: [] });
      });
  }

  getFriendToRemove = (holidayFriendId) => {
    holidayFriendsData.getAllHolidayFriends(holidayFriendId)
      .then((singleHolidayFriend) => {
        this.setState({ singleHolidayFriend });
      })
      .then(() => {
        this.deleteHolidayFriend();
      })
      .catch((error) => {
        console.error('error in getting friend to remove', error);
      });
  }

  checkEvent = (e) => {
    const { singleHoliday } = this.state;
    e.preventDefault();
    const myHolidayFriend = { ...this.state.newHolidayFriend };
    myHolidayFriend.holidayId = singleHoliday.id;
    myHolidayFriend.friendId = e.target.id;
    if (e.target.checked) {
      this.createHolidayFriend(myHolidayFriend);
      this.holidayFriendsGetter();
    } else {
      this.getFriendToRemove(e.target.id);
    }
    this.setState({ newHolidayFriend: defaultHolidayFriend });
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
          <input type="checkbox" checked className="form-check-input" id={holidayFriend.id} onChange={this.checkEvent} />
          <label className="form-check-label" htmlFor="exampleCheck1">Attending {singleHoliday.name}?</label>
        </div>
      </div>
    ));

    const notFriendNames = notHolidayFriends.map(notHolidayFriend => (
      <div key={notHolidayFriend.id} className="card col-4 mt-3 mr-1">
        <h5 className="card-header">{notHolidayFriend.name}</h5>
        <div className="card-body">
          <input type="checkbox" className="form-check-input" id={notHolidayFriend.id} onChange={this.checkEvent} />
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
