import React from 'react';
import friendsData from '../../../helpers/data/friendsData';
import authRequests from '../../../helpers/data/authRequests';
import FriendCard from '../../FriendCard/FriendCard';
import './Friends.scss';

class Friends extends React.Component {
  state = {
    friends: [],
  }

  getFriends = () => {
    const uid = authRequests.getCurrentUid();
    friendsData.getAllFriends(uid)
      .then((friends) => {
        this.setState({ friends });
      })
      .catch((err) => {
        console.error('error with friends GET', err);
      });
  };

  componentDidMount() {
    this.getFriends();
  }

  deleteSingleFriend = (friendId) => {
    friendsData.deleteFriend(friendId);
    this.getFriends();
  }

  changeView = (e) => {
    const friendId = e.target.id;
    this.props.history.push(`/friends/${friendId}/edit`);
  }

  render() {
    const {
      passFriendToEdit,
      onFriendSelection,
    } = this.props;

    const friendsCards = this.state.friends.map(friend => (
    <FriendCard
    key={friend.id}
    friend={friend}
    deleteSingleFriend={this.deleteSingleFriend}
    onSelect={onFriendSelection}
    passFriendToEdit={passFriendToEdit}
    />
    ));
    return (
      <div className="friends mx-auto">
        <h2>Friends</h2>
        <div className="row justify-content-center">{friendsCards}</div>
      </div>
    );
  }
}

export default Friends;
