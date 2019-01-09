import React from 'react';
import authRequests from '../../../helpers/data/authRequests';
import './Auth.scss';

import googleButton from './imgages/googlebutton.png';

class Auth extends React.Component {
  authenticateUser = (e) => {
    e.preventDefault();
    authRequests.authenticate().then(() => {
      this.props.history.push('/friends');
    })
      .catch(err => console.error('there was a problem with auth', err));
  }

  render() {
    return (
      <div className="Auth">
        <button className="btn btn-danger mt-5 mb-5" onClick={this.authenticateUser}>
          <img src={googleButton} alt="google login button" />
        </button>
      </div>
    );
  }
}

export default Auth;
