import React from 'react';
import { Button } from 'reactstrap';
import friendsData from '../../../helpers/data/friendsData';
import holidaysData from '../../../helpers/data/holidaysData';
import holidayFriendsData from '../../../helpers/data/holidayFriendsData';
import authRequests from '../../../helpers/data/authRequests';
import './HolidayDetail.scss';

class HolidayDetail extends React.Component {
  state = {
    singleHoliday: [],
    friends: [],
    holidayId: '-1',
  }

  holidayFriendsView = (e) => {
    const holidayFriendId = e.target.id;
    this.props.history.push(`/holidays/${holidayFriendId}/friends`);
  }

  componentDidMount() {
    const firebaseId = this.props.match.params.id;
    const uid = authRequests.getCurrentUid();
    holidaysData.getSingleHoliday(firebaseId)
      .then((singleHoliday) => {
        holidayFriendsData.getFriendIdsForHoliday(firebaseId).then((friendIds) => {
          friendsData.getFriendsByArrayOfIds(uid, friendIds).then((friends) => {
            console.log(friends);
            this.setState({ singleHoliday });
            this.setState({ friends });
          });
        });
      })
      .catch((error) => {
        console.error('error in getting one holiday', error);
      });
  }

  render() {
    return (
      <div className="holiday-detail mx-auto">
        <Button className="btn btn-warning mt-5" id="2468" onClick={this.holidayFriendsView}>Holiday Friends</Button>
      </div>
    );
  }
}

export default HolidayDetail;
