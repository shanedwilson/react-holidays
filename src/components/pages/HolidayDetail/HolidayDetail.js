import React from 'react';
import { Button } from 'reactstrap';
import friendsData from '../../../helpers/data/friendsData';
import holidaysData from '../../../helpers/data/holidaysData';
import holidayFriendsData from '../../../helpers/data/holidayFriendsData';
import authRequests from '../../../helpers/data/authRequests';
import FriendCard from '../../FriendCard/FriendCard';
import './HolidayDetail.scss';

class HolidayDetail extends React.Component {
  state = {
    singleHoliday: [],
    friends: [],
  }

  holidayFriendsView = () => {
    const holidayId = this.props.match.params.id;
    this.props.history.push(`/holidays/${holidayId}/friends`);
  }

  componentDidMount() {
    const firebaseId = this.props.match.params.id;
    const uid = authRequests.getCurrentUid();
    holidaysData.getSingleHoliday(firebaseId)
      .then((singleHoliday) => {
        holidayFriendsData.getFriendIdsForHoliday(firebaseId).then((friendIds) => {
          friendsData.getFriendsByArrayOfIds(uid, friendIds).then((friends) => {
            this.setState({ singleHoliday });
            this.setState({ friends });
            this.setState({ view: 'detail' });
          });
        });
      })
      .catch((error) => {
        console.error('error in getting one holiday', error);
      });
  }

  render() {
    const {
      singleHoliday,
      friends,
      view,
    } = this.state;

    const friendNames = friends.map(friend => (
    <FriendCard
    key={friend.id}
    friend={friend}
    view={view}
    />
    ));

    return (
      <div className="holiday-detail mx-auto">
        <Button className="btn btn-warning mt-5" onClick={this.holidayFriendsView}>Add Friends To Holiday</Button>
        <div className="card col-6 mt-3 mx-auto">
          <h5 className="card-header">{singleHoliday.name}</h5>
          <div className="card-body" onClick={this.holidayClick}>
            <img className="card-img-top" src={singleHoliday.imageUrl} alt={singleHoliday.name} />
            <p className="card-text">{singleHoliday.Date}</p>
            <p className="card-text">{singleHoliday.location}</p>
            <p className="card-text">{singleHoliday.startTime}</p>
          </div>
        </div>
        <div className="row justify-content-center">{friendNames}</div>
      </div>
    );
  }
}

export default HolidayDetail;
