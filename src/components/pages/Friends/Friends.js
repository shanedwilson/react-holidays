import React from 'react';
import PropTypes from 'prop-types';
import friendShape from '../../../helpers/propz/friendShape';
import FriendCard from '../../FriendCard/FriendCard';
import './Friends.scss';

class Friends extends React.Component {
  static propTypes = {
    friends: PropTypes.arrayOf(friendShape.friendShape),
    deleteSingFriend: PropTypes.func,
    passFriendToEdit: PropTypes.func,
    onFriendSelection: PropTypes.func,
  }

  changeView = (e) => {
    const friendId = e.target.id;
    this.props.history.push(`/friends/${friendId}/edit`);
  }

  render() {
    const {
      friends,
      deleteSingleFriend,
      passFriendToEdit,
      onFriendSelection,
    } = this.props;

    const friendsCards = friends.map(friend => (
    <FriendCard
    key={friend.id}
    friend={friend}
    deleteSingleFriend={deleteSingleFriend}
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
