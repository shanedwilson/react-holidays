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
  }

  checkEvent = (e) => {
    console.log('HEY!!!');
    this.setState({ checked: e.target.checked });
  }

  render() {
    const {
      singleHoliday,
      friends,
      holidayFriends,
    } = this.state;

    // {
    //   this.props.items
    //     .forEach(item => items.push(
    //                    <li>
    //                       <TodoItem id={item.id} key={item.id} text={item.text} />
    //                    </li>
    //     ))

    //   return(
    //  <ul>{items}</ul>
    //   );
    // }

    const friendsAttending = [];
    const friendsNotAttending = [];

    // const makeArrays = friends.forEach((friend) => {
    //   holidayFriends.forEach((holidayFriend) => {
    //     if (holidayFriend.id === friend.id) {
    //       friendsAttending.push(
    //       <div key={friend.id} className="card col-3 mt-3 mr-1">
    //         <h5 className="card-header">{friend.name}</h5>
    //         <div className="card-body">
    //           <input type="checkbox" checked='true' className="form-check-input" id="attendingCheck" onChange={this.checkEvent} />
    //           <label className="form-check-label" htmlFor="exampleCheck1">Attending {singleHoliday.name}?</label>
    //         </div>
    //       </div>,
    //       );
    //       console.log(friendsAttending);
    //     } else {
    //       friendsNotAttending.push(
    //       <div key={friend.id} className="card col-3 mt-3 mr-1">
    //         <h5 className="card-header">{friend.name}</h5>
    //         <div className="card-body">
    //           <input type="checkbox" checked='false' className="form-check-input" id="attendingCheck" onChange={this.checkEvent} />
    //           <label className="form-check-label" htmlFor="exampleCheck1">Attending {singleHoliday.name}?</label>
    //         </div>
    //       </div>,
    //       );
    //       console.log(friendsNotAttending);
    //     }
    //   });
    // });

    // const friendNames = friends.forEach((friend) => {
    //   holidayFriends.forEach((holidayFriend) => {
    //     if (holidayFriend.id === friend.id) {
    //       console.log('match');
    //       return (
    //       <div key={friend.id} className="card col-3 mt-3 mr-1">
    //         <h5 className="card-header">{friend.name}</h5>
    //         <div className="card-body">
    //           <input type="checkbox" checked='true' className="form-check-input" id="attendingCheck" onChange={this.checkEvent} />
    //           <label className="form-check-label" htmlFor="exampleCheck1">Attending {singleHoliday.name}?</label>
    //         </div>
    //       </div>
    //       );
    //     }
    //   });
    // });

    const friendNames = friends.map((friend, i) => (
      holidayFriends.map((holidayFriend) => {
        console.log(friend, holidayFriend);
        if (friend.id === holidayFriend.id) {
          return (
          <div key={i} className="card col-3 mt-3 mr-1">
            <h5 className="card-header">{friend.name}</h5>
            <div className="card-body">
              <input type="checkbox" checked='true' className="form-check-input" id="attendingCheck" onChange={this.checkEvent} />
              <label className="form-check-label" htmlFor="exampleCheck1">Attending {singleHoliday.name}?</label>
            </div>
          </div>
          );
        }
        return (
          <div key={friend.id} className="card col-3 mt-3 mr-1">
            <h5 className="card-header">{friend.name}</h5>
            <div className="card-body">
              <input type="checkbox" checked='false' className="form-check-input" id="attendingCheck" onChange={this.checkEvent} />
              <label className="form-check-label" htmlFor="exampleCheck1">Attending {singleHoliday.name}?</label>
            </div>
          </div>
        );
      })
    ));

    // const friendNames = friends.map(friend => (
    //   <div key={friend.id} className="card col-3 mt-3 mr-1">
    //     <h5 className="card-header">{friend.name}</h5>
    //     <div className="card-body">
    //     </div>
    //   </div>
    // ));

    return (
      <div className="holiday-friends mx-auto mt-5">
        <h3>Add Friends to {singleHoliday.name}</h3>
        <div className="row justify-content-center">{friendNames}</div>
      </div>
    );
  }
}

export default HolidayFriends;
