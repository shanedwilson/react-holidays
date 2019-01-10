import React from 'react';
import { Button } from 'reactstrap';
// import { Route } from 'react-router-dom';
// import EditFriend from '../EditFriend/EditFriend';
import './Friends.scss';

class Friends extends React.Component {
  changeView = (e) => {
    const friendId = e.target.id;
    this.props.history.push(`/friends/${friendId}/edit`);
  }

  render() {
    return (
      <div className="friends mx-auto">
        <Button className="btn btn-success mt-5" id="12345" onClick={this.changeView}>Edit Friend</Button>
        {/* <Route path='/friends/:id/edit' component={EditFriend} /> */}
      </div>
    );
  }
}

export default Friends;
