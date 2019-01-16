import axios from 'axios';
import apiKeys from '../apiKeys';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getFriendIdsForHoliday = holidayId => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/holidayFriends.json?orderBy="holidayId"&equalTo="${holidayId}"`)
    .then((result) => {
      const holidayFriendsObject = result.data;
      const friendIds = [];
      if (holidayFriendsObject !== null) {
        Object.keys(holidayFriendsObject).forEach((hfId) => {
          friendIds.push(holidayFriendsObject[hfId].friendId);
        });
      }
      resolve(friendIds);
    })
    .catch((err) => {
      reject(err);
    });
});

export default { getFriendIdsForHoliday };
