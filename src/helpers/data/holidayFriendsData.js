import axios from 'axios';
import apiKeys from '../apiKeys';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

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

const getAllHolidayFriends = holidayFriendId => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/holidayFriends.json`)
    .then((results) => {
      const holidayFriendsObject = results.data;
      const holidayFriendsArray = [];
      if (holidayFriendsObject !== null) {
        Object.keys(holidayFriendsObject).forEach((friendId) => {
          holidayFriendsObject[friendId].id = friendId;
          if (holidayFriendsObject[friendId].friendId === holidayFriendId) {
            holidayFriendsArray.push(holidayFriendsObject[friendId]);
          }
        });
      }
      resolve(holidayFriendsArray);
    })
    .catch((error) => {
      reject(error);
    });
});

const createHolidayFriend = friendObject => axios.post(`${baseUrl}/holidayFriends.json`, JSON.stringify(friendObject));

const deleteHolidayFriend = holidayFriendId => axios.delete(`${baseUrl}/holidayFriends/${holidayFriendId}.json`);

export default {
  getFriendIdsForHoliday,
  getAllHolidayFriends,
  createHolidayFriend,
  deleteHolidayFriend,
};
