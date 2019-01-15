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
    friendsData.deleteFriend(friendId)
      .then(() => {
        this.getFriends();
      });
  }

  passFriendToEdit = (friendId) => {
    this.setState({ editId: friendId });
    this.props.history.push(`/friends/${friendId}/edit`);
  }

  newFriendView = () => {
    this.props.history.push('/friends/new');
  }

  render() {
    const {
      onFriendSelection,
    } = this.props;

    const { friends } = this.state;

    const friendsCards = friends.map(friend => (
    <FriendCard
    key={friend.id}
    friend={friend}
    deleteSingleFriend={this.deleteSingleFriend}
    onSelect={onFriendSelection}
    passFriendToEdit={this.passFriendToEdit}
    />
    ));

    return (
      <div className="friends mx-auto">
        <h2>Friends</h2>
        <button className="btn btn-success" onClick={this.newFriendView}>
          <i className="fas fa-plus">  Add A Friend</i>
        </button>
        <div className="row justify-content-center">{friendsCards}</div>
      </div>
    );
  }
}

export default Friends;
