import axios from 'axios';
import apiKeys from '../apiKeys';

const firebaseUrl = apiKeys.firebaseConfig.databaseURL;

const getAllFriends = uid => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/friends.json?orderBy="uid"&equalTo="${uid}"`)
    .then((results) => {
      const friendsObject = results.data;
      const friendsArray = [];
      if (friendsObject !== null) {
        Object.keys(friendsObject).forEach((friendId) => {
          friendsObject[friendId].id = friendId;
          friendsArray.push(friendsObject[friendId]);
        });
      }
      resolve(friendsArray);
    })
    .catch((error) => {
      reject(error);
    });
});

const getSingleFriend = friendId => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/friends/${friendId}.json`)
    .then((result) => {
      const singleFriend = result.data;
      singleFriend.id = friendId;
      resolve(singleFriend);
    })
    .catch((error) => {
      reject(error);
    });
});

const getFriendsByArrayOfIds = (uid, friendIdsArray) => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/friends.json?orderBy="uid"&equalTo="${uid}"`)
    .then((result) => {
      const friendsObject = result.data;
      const friendsArray = [];
      if (friendsObject !== null) {
        Object.keys(friendsObject).forEach((friendId) => {
          friendsObject[friendId].id = friendId;
          friendsArray.push(friendsObject[friendId]);
        });
      }
      const selectedfriends = friendsArray.filter(x => friendIdsArray.includes(x.id));
      resolve(selectedfriends);
    })
    .catch((err) => {
      reject(err);
    });
});

const deleteFriend = friendId => axios.delete(`${firebaseUrl}/friends/${friendId}.json`);

const createFriend = friendObject => axios.post(`${firebaseUrl}/friends.json`, JSON.stringify(friendObject));

const updateFriend = (friendObject, friendId) => axios.put(`${firebaseUrl}/friends/${friendId}.json`, JSON.stringify(friendObject));

const updatedIsAvoiding = (friendId, isAvoiding) => axios.patch(`${firebaseUrl}/friends/${friendId}.json`, { isAvoiding });

export default {
  getAllFriends,
  getSingleFriend,
  deleteFriend,
  createFriend,
  updateFriend,
  updatedIsAvoiding,
  getFriendsByArrayOfIds,
};
